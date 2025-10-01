import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader, MyInput } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function TambahPetani({ navigation }) {
  const [nama, setNama] = useState('');
  const [ID, setID] = useState('PT' + moment().format('YYMMDDHHmmss'))
  const [modalVisible, setModalVisible] = useState(false);
  const [poin, setPoin] = useState(0);

  const simpanData = async () => {
    if (nama.length === 0) {
      alert('Nama petani tidak boleh kosong');
      return;
    }

    try {
      console.log(nama);
      getData('petani').then(res => {
        let tmp = res ? res : [];
        const KIRIM = {
          id: ID,
          nama: nama,
          poin: poin,
          last_update: moment().format('YYYYMMDDHHmmss'),
        }

        tmp.push(KIRIM); // tambahkan data baru
        storeData('petani', tmp);

        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.goBack()
        }, 500); // modal tampil 1.5 detik


      })
      // const dataLama = JSON.parse(await AsyncStorage.getItem('DATA_PETANI')) || [];
      // const dataBaru = [
      //   ...dataLama,
      //   {
      //     nama,
      //     value: `petani_${nama.toLowerCase().replace(/\s/g, '')}`,
      //   },
      // ];
      // await AsyncStorage.setItem('DATA_PETANI', JSON.stringify(dataBaru));


    } catch (error) {
      console.log(error);
      alert('Gagal menyimpan data');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Tambah Data Petani" />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <MyInput
            label="ID Petani : "
            placeholder="Masukan ID Petani"
            value={ID}
            onChangeText={setID}
          />
          <MyInput
            label="Nama Petani : "
            placeholder="Masukan Nama Petani"
            value={nama}
            onChangeText={setNama}
          />

          <MyInput
            label="Poin : "
            placeholder="Masukan Poin"
            value={poin}
            onChangeText={setPoin}
            keyboardType="number-pad"
          />
        </View>
      </ScrollView>

      <View style={{ padding: 20 }}>
        <TouchableNativeFeedback onPress={simpanData}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                color: colors.white,
                fontSize: 15,
              }}>
              Simpan
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* Modal Sukses */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000066',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                fontSize: 16,
                color: colors.primary,
                marginBottom: 20,
              }}>
              Data Berhasil Tersimpan
            </Text>
            <Image
              source={require('../../assets/success.png')} // sesuaikan dengan lokasi file PNG kamu
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
