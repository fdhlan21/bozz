import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {colors} from '../../utils';
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
export default function PelangganAdd({navigation, route}) {
  const [kirim, setKirim] = useState({
    nama_customer: '',
    telepon_customer: '',
    alamat_customer: '',
  });
  const [loading, setLoading] = useState(false);
  const updateKirim = (x, v) => {
    setKirim({
      ...kirim,
      [x]: v,
    });
  };
  const toast = useToast();
  const sendData = () => {
    if (kirim.nama_customer.length == 0) {
      toast.show('Nama masih kosong !', {
        type: 'warning',
      });
    } else if (kirim.telepon_customer.length == 0) {
      toast.show('Telepon masih kosong !', {
        type: 'warning',
      });
    } else {
      console.log(kirim);
      setLoading(true);
      axios
        .post(apiURL + 'datainsert', {
          modul: 'customer',
          kolom: kirim,
        })
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
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Tambah" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MyInput
            autoFocus
            value={kirim.nama_customer}
            onChangeText={x => updateKirim('nama_customer', x)}
            label="Nama Customer"
            iconname="person-outline"
            placeholder="Masukan nama"
          />

          <MyInput
            value={kirim.telepon_customer}
            onChangeText={x => updateKirim('telepon_customer', x)}
            label="Telepon Cusomter"
            iconname="call-outline"
            keyboardType="phone-pad"
            placeholder="Masukan telepon"
          />

          <MyInput
            value={kirim.alamat_customer}
            onChangeText={x => updateKirim('alamat_customer', x)}
            label="Alamat"
            iconname="location-outline"
            multiline
            placeholder="Masukan alamat"
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
