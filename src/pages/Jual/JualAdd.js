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
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
export default function SupplierAdd({navigation, route}) {
  const [relasi, setRelasi] = useState([]);
  const [kirim, setKirim] = useState({
    kode: 'SL' + moment().format('ymdhms'),
    tanggal: moment().format('YYYY-MM-DD'),
    fid_customer: '',
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
    if (kirim.nama_supplier.length == 0) {
      toast.show('Nama masih kosong !', {
        type: 'warning',
      });
    } else if (kirim.telepon_supplier.length == 0) {
      toast.show('Telepon masih kosong !', {
        type: 'warning',
      });
    } else {
      console.log(kirim);
      setLoading(true);
      axios
        .post(apiURL + 'datainsert', {
          modul: 'supplier',
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

  useEffect(() => {
    axios
      .post(apiURL + 'getlist', {
        modul: 'customer',
      })
      .then(res => {
        console.log(res.data);
        setRelasi(res.data);
      });
  }, []);

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
            value={kirim.kode}
            label="No. Transaksi"
            iconname="receipt-outline"
            placeholder="Masukan nama"
          />
          <MyPicker
            label="Customer"
            onChangeText={x => updateKirim('fid_customer', x)}
            iconname="person-outline"
            data={relasi}
          />

          <MyCalendar
            value={kirim.tanggal}
            onChangeText={x => updateKirim('alamat_supplier', x)}
            label="Tanggal"
            iconname="location-outline"
            multiline
            placeholder="Masukan alamat"
          />
          <View
            style={{
              alignItems: 'center',
              margin: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.secondary[600],
              }}>
              Tambah Barang
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('BarangCart')}
              style={{
                width: 50,
                borderRadius: 10,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary,
              }}>
              <Icon type="ionion" name="add" color={colors.white} />
            </TouchableOpacity>
          </View>
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
