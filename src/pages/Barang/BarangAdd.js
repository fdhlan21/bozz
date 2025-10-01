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
export default function BarangAdd({navigation, route}) {
  const [kirim, setKirim] = useState({
    nama_barang: '',
    harga_beli: '',
    harga_jual: '',
    satuan: '',
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
  const sendData = () => {
    if (kirim.nama_barang.length == 0) {
      toast.show('Nama masih kosong !', {
        type: 'warning',
      });
    } else if (kirim.harga_beli.length == 0) {
      toast.show('Harga beli masih kosong !', {
        type: 'warning',
      });
    } else if (kirim.harga_jual.length == 0) {
      toast.show('Harga jual masih kosong !', {
        type: 'warning',
      });
    } else {
      console.log(kirim);
      setLoading(true);
      axios
        .post(apiURL + 'datainsert', {
          modul: 'barang',
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
            value={kirim.nama_barang}
            onChangeText={x => updateKirim('nama_barang', x)}
            label="Nama barang"
            iconname="cube-outline"
            placeholder="Masukan nama"
          />

          <MyInput
            value={kirim.harga_beli}
            onChangeText={x => updateKirim('harga_beli', x)}
            label="Harga Beli"
            iconname="archive-outline"
            keyboardType="number-pad"
            placeholder="Masukan harga beli"
          />

          <MyInput
            value={kirim.harga_jual}
            onChangeText={x => updateKirim('harga_jual', x)}
            label="Harga Jual"
            iconname="cart-outline"
            keyboardType="number-pad"
            placeholder="Masukan harga jual"
          />

          <MyInput
            value={kirim.satuan}
            onChangeText={x => updateKirim('satuan', x)}
            label="Satuan"
            iconname="list-outline"
            multiline
            placeholder="Masukan alamat"
          />

          <MyInput
            value={kirim.keterangan}
            onChangeText={x => updateKirim('keterangan', x)}
            label="Keterangan"
            iconname="create-outline"
            multiline
            placeholder="Masukan keterangan"
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
