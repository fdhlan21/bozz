import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Color, colors, fonts} from '../../utils';
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

export default function Transaksi({navigation, route}) {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const toast = useToast();
  const getTransaksi = async () => {
    try {
      setLoading(true);
      let res = await axios.post(apiURL + 'transaksi');
      setData(res.data);
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary + '33',
      }}>
      <MyHeader title="Transaksi" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
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
                      fontFamily: fonts.secondary[800],
                      fontSize: 15,
                      color: colors.black,
                    }}>
                    {item.nama} - {item.telepon}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 12,
                      color: Color.blueGray[500],
                    }}>
                    {moment(item.tanggal).format('dddd, DD MMMM YYYY')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[800],
                      fontSize: 20,
                      color: colors.black,
                    }}>
                    Rp {new Intl.NumberFormat().format(item.nominal)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[800],
                      fontSize: 15,
                      color: colors.primary,
                    }}>
                    {item.pembayaran}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: 10,
                      color: colors.black,
                    }}>
                    {item.keterangan}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('TransaksiEdit', item)}>
                  <Icon
                    type="ionicon"
                    name="create-outline"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(MYAPP, 'Yakin akan hapus ini ?', [
                      {text: 'TIDAK'},
                      {
                        text: 'HAPUS',
                        onPress: () => {
                          console.log(item);
                          axios
                            .post(apiURL + 'delete', {
                              id: item.id_tagihan,
                              modul: 'tagihan',
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
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <MyButton
          onPress={() => navigation.navigate('TransaksiAdd')}
          title="Tambah Transaksi"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
