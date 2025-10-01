import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyGap, MyHeader, MyInput } from '../../components';
import { Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { fonts, colors } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function DataPetani({ navigation }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editID, setEditID] = useState('');
  const [poin, setPoin] = useState('');

  const getPetani = async () => {
    getData('petani').then(res => {
      console.log(res);
      const tmp = res ? res : [];
      setData(tmp);
    })
  };

  const simpanEdit = async () => {

    getData('petani').then(res => {
      let tmp = res ? res : []; // 
      let updated = [...tmp];
      updated[editIndex] = {
        ...updated[editIndex],
        nama: editNama,
        id: editID,
        poin: poin,
        last_update: moment().format('YYYYMMDDHHmmss'),
      };

      // Simpan kembali ke localStorage
      storeData('petani', updated);
      setModalVisible(false);
      getPetani();

    })

  };




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getPetani);
    return unsubscribe;
  }, [navigation]);


  const hapusData = (index) => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ingin menghapus data petani ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const dataBaru = [...data];
            dataBaru.splice(index, 1);
            try {
              storeData('petani', dataBaru);
              getPetani();
            } catch (e) {
              Alert.alert('Gagal', 'Tidak bisa menghapus data');
            }
          },
        },
      ]
    );
  };




  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MyHeader title="Data Petani" />


      {data.length === 0 && (
        <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 40 }}>
          Belum ada data petani
        </Text>
      )}

      <FlatList data={data} renderItem={({ item, index }) => {
        return (
          <View
            key={index}
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              backgroundColor: '#fafafa',
              borderRadius: 12,
              marginBottom: 16,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.primary,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.primary[400],
              }}>
              ID:{' '}
              <Text style={{ fontWeight: '800', color: colors.primary }}>
                {item.id}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginBottom: 8,
                fontFamily: fonts.primary[400],
              }}>
              Nama Petani:{' '}
              <Text style={{ fontWeight: '800', color: colors.primary }}>
                {item.nama}
              </Text>
            </Text>

            <Text
              style={{
                fontSize: 13,
                marginBottom: 8,
                fontFamily: fonts.primary[400],
              }}>
              Poin:{' '}
              <Text style={{ fontWeight: '800', color: colors.primary }}>
                {parseFloat(item.poin)}
              </Text>
            </Text>

            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <QRCode value={item.id} size={120} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 8,
              }}>
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => {
                  navigation.navigate('PetaniDetail', {
                    id_petani: item.id
                  })
                }}>
                <Icon type="ionicon" name="search" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => {
                  setEditIndex(index);
                  setEditNama(item.nama);
                  setEditID(item.id);
                  setPoin(item.poin)
                  setModalVisible(true);
                }}>
                <Icon type="ionicon" name="pencil" size={20} color="#F5A623" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => hapusData(index)}>
                <Icon type="ionicon" name="trash" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
      />


      {/* Tombol tambah di bawah */}
      <View
        style={{
          alignItems: 'flex-end',
          marginTop: 10,
          marginBottom: 0,
          padding: 0,
          position: 'absolute',
          bottom: 50,
          right: 30
        }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('TambahPetani')}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 50,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon type="ionicon" name="add" color={colors.white} size={25} />
          </View>
        </TouchableNativeFeedback>
      </View>
      {/* Modal edit */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000088',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '85%',
            }}>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                fontSize: 16,
                marginBottom: 10,
              }}>
              Edit Nama Petani
            </Text>
            <MyInput
              label="ID Petani"
              value={editID}
              onChangeText={setEditID}
              placeholder="Masukkan ID"

            />
            <MyGap jarak={10} />
            <MyInput
              label="Nama Petani"
              value={editNama}
              onChangeText={setEditNama}
              placeholder="Masukkan nama"

            />
            <MyGap jarak={10} />
            <MyInput
              label="Poin"
              value={poin}
              keyboardType='number-pad'
              onChangeText={setPoin}
              placeholder="Masukkan poin"

            />
            <MyGap jarak={20} />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  marginRight: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}>
                <Text style={{ color: '#666' }}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={simpanEdit}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}>
                <Text style={{ color: 'white' }}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
