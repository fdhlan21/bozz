import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {colors, fonts, windowWidth} from '../../utils';
import {MyButton, MyHeader} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {apiURL, MYAPP} from '../../utils/localStorage';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {Alert} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
export default function Supplier({navigation, route}) {
  const [data, setData] = useState([]);
  const [tmp, setTMP] = useState([]);
  const isFocused = useIsFocused();
  const toast = useToast();
  const [dashboard, setDashboard] = useState({
    pelanggan: 0,
    lunas: 0,
    pending: 0,
  });
  const getTransaksi = () => {
    try {
      setLoading(true);
      axios
        .post(apiURL + 'listdata', {
          modul: 'supplier',
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
          setTMP(res.data);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTransaksi();
    }
  }, [isFocused]);
  const [loading, setLoading] = useState(false);

  const filterPelanggan = (data, searchTerm) => {
    if (!searchTerm) return data;

    const filtered = data.filter(pelanggan => {
      const nama = pelanggan.nama_supplier.toLowerCase();
      const telepon = pelanggan.telepon_supplier;
      const search = searchTerm.toLowerCase();
      return nama.includes(search) || telepon.includes(search);
    });

    setData(filtered);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Supplier" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <View>
          <TextInput
            onChangeText={x => {
              if (x.length == 0) {
                setData(tmp);
              } else {
                filterPelanggan(data, x);
              }
            }}
            placeholder="Pencarian . . ."
            style={{
              paddingLeft: 10,
              fontFamily: fonts.secondary[600],
              backgroundColor: colors.primary + '21',
              borderRadius: 10,
              height: 40,
              marginBottom: 10,
            }}
          />
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('SupplierDetail', item)}
                style={{
                  backgroundColor: colors.white,
                  marginVertical: 4,
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.primary[800],
                      fontSize: 15,
                      color: colors.black,
                    }}>
                    {item.nama_supplier}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 12,
                      color: colors.black,
                    }}>
                    {item.telepon_supplier}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: 12,
                      color: colors.black,
                    }}>
                    {item.alamat_supplier}
                  </Text>
                </View>

                <Icon
                  type="ionicon"
                  name="chevron-forward-circle"
                  size={30}
                  color={colors.primary}
                />

                {/* <TouchableOpacity
                  onPress={() => {
                    Alert.alert(MYAPP, 'Yakin akan hapus ini ?', [
                      {text: 'TIDAK'},
                      {
                        text: 'HAPUS',
                        onPress: () => {
                          console.log(item);
                          axios
                            .post(apiURL + 'delete', {
                              id: item.id_pelanggan,
                              modul: 'pelanggan',
                            })
                            .then(res => {
                              if (res.data.status == 200) {
                                toast.show(res.data.message, {
                                  type: 'success',
                                });
                                getTransaksi();
                              } else {
                                toast.show(res.data.message, {
                                  type: 'danger',
                                });
                              }
                            });
                        },
                      },
                    ]);
                  }}
                  style={{
                    marginLeft: 10,
                  }}>
                  <Icon
                    type="ionicon"
                    name="trash-outline"
                    size={24}
                    color={colors.danger}
                  />
                </TouchableOpacity> */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <MyButton
          onPress={() => navigation.navigate('SupplierAdd')}
          title="Tambah"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
