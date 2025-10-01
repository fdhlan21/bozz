import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Color, colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import MyInput from '../MyInput';

export default function MyPicker({
  label,
  iconname,
  onChangeText, // Tetap support onChangeText untuk backward compatibility
  onValueChange, // Tambahkan support untuk onValueChange
  value = '', // Pastikan value punya default value
  data = [],
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(() => {
    // Cari item yang sesuai dengan value yang diberikan
    const foundItem = data.find(item => item.value === value);
    return foundItem || data[0] || null;
  });
  const [dataList, setDataList] = useState(data);

  console.log(dataList);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  // Update selectedItem ketika value prop berubah
  useEffect(() => {
    const foundItem = data.find(item => item.value === value);
    if (foundItem) {
      setSelectedItem(foundItem);
    }
  }, [value, data]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedItem(item); // Simpan item yang dipilih
        
        // Support kedua callback function
        if (onChangeText) {
          onChangeText(item.value); // Update value sesuai yang dipilih
        }
        if (onValueChange) {
          onValueChange(item.value); // Update value sesuai yang dipilih
        }
        
        setModalVisible(false);
      }}>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );
  
  const [ket, setKey] = useState({});

  const filterPicker = x => {
    console.log(x);
    let filterd = dataList.filter(
      i => i.label.toLowerCase().indexOf(x.toLowerCase()) > -1,
    );
    console.log(filterd);
    if (x.length == 0) {
      setDataList(data);
    } else if (filterd.length > 0) {
      setDataList(filterd);
    } else {
      setDataList(data);
    }
  };

  return (
    <>
      <Text
        style={{
          fontFamily: fonts.secondary[600],
          fontSize: 14,
          color: colors.black,
          marginBottom: 4,
          marginVertical: 10,
          marginLeft: 4,
        }}>
        {label}
      </Text>

      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => {
          setModalVisible(true);
          setDataList(data);
        }}>
        <View style={styles.iconContainer}>
          <Icon
            type="ionicon"
            name={iconname}
            color={Color.blueGray[300]}
            size={24}
          />
        </View>
        {/* Menampilkan nilai yang dipilih atau teks placeholder */}
        <Text style={styles.selectedText}>
          {selectedItem ? selectedItem.label : 'Silahkan pilih'}
        </Text>
        <View style={styles.iconContainer}>
          <Icon
            type="ionicon"
            name="caret-down-outline"
            color={Color.blueGray[300]}
            size={24}
          />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <MyInput
                    nolabel
                    placeholder="Pencarian . . ."
                    onChangeText={x => filterPicker(x)}
                  />
                </View>
                <FlatList
                  data={dataList}
                  renderItem={renderItem}
                  keyExtractor={item => item.value}
                  style={styles.flatList}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.blueGray[300],
    minHeight: 50, // Atur minimum height supaya cukup untuk teks panjang
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 1,
  },
  selectedText: {
    flex: 8,
    fontSize: 14,
    lineHeight: 26,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'left', // Teks diatur agar di kiri
    flexShrink: 1, // Agar teks bisa disesuaikan dengan ruang yang ada
    flexWrap: 'wrap', // Agar teks panjang bisa dibungkus ke baris berikutnya
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
  },
  flatList: {
    marginVertical: 10,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 14,
    fontFamily: fonts.primary[500],
    color: colors.primary,
    flexWrap: 'wrap', // Pastikan teks panjang dibungkus
  },
});