import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {colors, fonts} from '../../utils';
import {
  MyButton,
  MyCalendar,
  MyHeader,
  MyInput,
  MyPicker,
} from '../../components';
import {ScrollView} from 'react-native';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {apiURL} from '../../utils/localStorage';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
export default function TransaksiAdd({navigation, route}) {
  const ITEM = route.params;
  const [kirim, setKirim] = useState({
    fid_pelanggan: ITEM.id_pelanggan,
    tanggal: moment().format('YYYY-MM-DD'),
    jatuh_tempo: moment().add(1, 'month').format('YYYY-MM-DD'),
    nominal: '',
    pembayaran: 'Transfer',
    keterangan: '',
  });
  const [loading, setLoading] = useState(false);
  const updateKirim = (x, v) => {
    setKirim({
      ...kirim,
      [x]: v,
    });
  };
  const toast = useToast();
  const [pelanggan, setPelanggan] = useState([]);
  const sendData = () => {
    console.log(kirim);
    setLoading(true);
    axios
      .post(apiURL + 'transaksi_add', kirim)
      .then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          toast.show(res.data.message, {
            type: 'success',
          });
          navigation.goBack();
        } else {
          toast.show(res.data.message, {
            type: 'danger',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    axios.post(apiURL + 'pelanggan').then(res => {
      console.log(res.data);
      setPelanggan(res.data);
      setKirim({
        ...kirim,
        fid_pengguna: res.data[0].value,
      });
    });
  }, []);

  const bayar = [
    {label: 'Transfer Bank', value: 'Transfer Bank'},
    {label: 'Dana', value: 'Dana'},
    {label: 'Gopay', value: 'Gopay'},
    {label: 'OVO', value: 'OVO'},
    {label: 'Shopeepay', value: 'Shopeepay'},
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary + '33',
      }}>
      <MyHeader title="Tambah Transaksi" />
      <View
        style={{
          backgroundColor: colors.white,
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
            {ITEM.nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,
            }}>
            Tanggal Daftar{' '}
            <Text
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                paddingHorizontal: 10,
              }}>
              {' '}
              {moment(ITEM.tanggal_daftar).format('DD MMMM YYYY')}{' '}
            </Text>
          </Text>

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,
            }}>
            {ITEM.telepon}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,
            }}>
            {ITEM.paket}{' '}
            <Text
              style={{
                backgroundColor: colors.secondary,
                color: colors.black,
                paddingHorizontal: 10,
              }}>
              {' '}
              Rp {new Intl.NumberFormat().format(ITEM.harga)}{' '}
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 12,
              color: colors.black,
            }}>
            {ITEM.alamat}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MyCalendar
            label="Tanggal"
            value={kirim.tanggal}
            onDateChange={x => updateKirim('tanggal', x)}
          />

          <MyCalendar
            label="Jatuh Tempo"
            value={kirim.jatuh_tempo}
            onDateChange={x => updateKirim('jatuh_tempo', x)}
          />
        </ScrollView>
      </View>
      <View
        style={{
          padding: 10,
        }}>
        {loading && <ActivityIndicator color={colors.primary} size="large" />}
        {!loading && <MyButton onPress={sendData} title="Simpan" />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
