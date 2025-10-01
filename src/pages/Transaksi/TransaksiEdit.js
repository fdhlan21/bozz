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
  MyRadio,
} from '../../components';
import {ScrollView} from 'react-native';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {apiURL} from '../../utils/localStorage';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
export default function TransaksiEdit({navigation, route}) {
  const [kirim, setKirim] = useState(route.params);
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
      .post(apiURL + 'transaksi_update', kirim)
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

  useEffect(() => {}, []);

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
      <MyHeader title="Edit Transaksi" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[800],
                fontSize: 14,
                color: colors.black,
              }}>
              {kirim.nama}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 12,
                color: colors.black,
              }}>
              {kirim.telepon}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 12,
                color: colors.black,
              }}>
              {kirim.alamat}
            </Text>
          </View>
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
          <MyPicker
            onChangeText={x => updateKirim('pembayaran', x)}
            iconname="list"
            value={kirim.pembayaran}
            data={bayar}
            label="Pembayaran"
          />
          <MyRadio
            onPress={() => updateKirim('status', 'Belum Bayar')}
            label="Belum Bayar"
            selected={kirim.status == 'Belum Bayar' ? true : false}
          />
          <MyRadio
            label="Lunas"
            onPress={() => updateKirim('status', 'Lunas')}
            selected={kirim.status == 'Lunas' ? true : false}
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
