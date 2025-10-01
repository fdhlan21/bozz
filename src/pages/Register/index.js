import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {colors, fonts, windowWidth} from '../../utils';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {MyButton, MyGap, MyInput} from '../../components';
import {useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import axios from 'axios';
import {apiURL, storeData, getData} from '../../utils/localStorage';
import MyLoading from '../../components/MyLoading';
import {TouchableOpacity} from 'react-native';

export default function Register({navigation, route}) {
  const [kirim, setKirim] = useState({
    nama_lengkap: '',
    username: '',
    password: '',
  });

  const toast = useToast();
  const updateKirim = (x, v) => {
    setKirim({
      ...kirim,
      [x]: v,
    });
  };
  
  const [loading, setLoading] = useState(false);

  // Fungsi untuk registrasi lokal
  const registerLocal = async () => {
    try {
      // Ambil data users yang sudah ada
      const existingUsers = await getData('local_users') || [];
      
      // Cek apakah username sudah ada
      const userExists = existingUsers.find(user => user.username === kirim.username);
      if (userExists) {
        toast.show('Username sudah digunakan!', {type: 'danger'});
        return false;
      }

      // Buat user baru dengan ID unik
      const newUser = {
        id: Date.now().toString(), // Simple ID generator
        nama_lengkap: kirim.nama_lengkap,
        username: kirim.username,
        password: kirim.password, // Dalam implementasi nyata, password harus di-hash
        userType: 'customer', // Default customer untuk register
        created_at: new Date().toISOString(),
      };

      // Tambahkan user baru ke array
      const updatedUsers = [...existingUsers, newUser];
      
      // Simpan ke storage lokal
      await storeData('local_users', updatedUsers);
      
      return true;
    } catch (error) {
      console.error('Error saving to local storage:', error);
      return false;
    }
  };

  const sendData = async () => {
    if (kirim.username.length == 0) {
      toast.show('Username masih kosong !');
    } else if (kirim.nama_lengkap.length == 0) {
      toast.show('Nama Lengkap masih kosong !');
    } else if (kirim.password.length == 0) {
      toast.show('Kata sandi masih kosong !');
    } else {
      console.log(kirim);
      setLoading(true);
      
      try {
        // Coba registrasi ke server dulu
        const response = await axios.post(apiURL + 'register', kirim);
        
        setTimeout(() => {
          setLoading(false);
          toast.show(response.data.message, {type: 'success'});
          navigation.navigate('Login', { userType: 'customer' });
        }, 700);
        
      } catch (error) {
        console.log('Server registration failed, trying local storage:', error);
        
        // Jika gagal ke server, coba simpan lokal
        const localSuccess = await registerLocal();
        
        setTimeout(() => {
          setLoading(false);
          if (localSuccess) {
            toast.show('Registrasi berhasil (disimpan lokal)', {type: 'success'});
            navigation.navigate('Login', { userType: 'customer' });
          } else {
            toast.show('Registrasi gagal, silakan coba lagi', {type: 'danger'});
          }
        }, 700);
      }
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: colors.white, flexDirection: 'column'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 250,
              height: 250,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: colors.white,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              marginBottom: 20,
              fontFamily: fonts.secondary[800],
              fontSize: 20,
            }}>
            Daftar
          </Text>

          <MyInput
            value={kirim.nama_lengkap}
            onChangeText={x => updateKirim('nama_lengkap', x)}
            label="Nama Lengkap"
            placeholder="Masukan nama lengkap"
            iconname="person-outline"
          />

          <MyInput
            value={kirim.username}
            onChangeText={x => updateKirim('username', x)}
            label="Username"
            placeholder="Masukan username"
            iconname="at"
          />

          <MyInput
            value={kirim.password}
            onChangeText={x => updateKirim('password', x)}
            label="Kata Sandi"
            placeholder="Masukan kata sandi"
            iconname="lock-closed-outline"
            secureTextEntry
          />
          <MyGap jarak={20} />
          {!loading && <MyButton onPress={sendData} title="DAFTAR" />}
          {loading && <MyLoading />}
          <TouchableOpacity
            onPress={() => navigation.navigate('Login', { userType: 'customer' })}
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
              }}>
              Sudah punya akun ?{' '}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.secondary[800],
                }}>
                Masuk disini
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}