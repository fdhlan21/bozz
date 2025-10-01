import {View, Text} from 'react-native';
import React from 'react';
import {colors, fonts, windowWidth} from '../../utils';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {MyButton, MyGap, MyInput} from '../../components';
import {useState, useEffect} from 'react';
import SoundPlayer from 'react-native-sound-player';
import axios from 'axios';
import {apiURL, storeData} from '../../utils/localStorage';
import MyLoading from '../../components/MyLoading';
import {TouchableOpacity} from 'react-native';
import { Image } from 'react-native';

export default function Login({navigation, route}) {
  const [kirim, setKirim] = useState({
    username: '',
    password: '',
  });

  // State untuk menentukan jenis user (customer atau petugas)
  const [userType, setUserType] = useState('customer'); // default customer

  const toast = useToast();
  
  // Cek parameter dari route untuk menentukan jenis user
  useEffect(() => {
    if (route.params && route.params.userType) {
      setUserType(route.params.userType);
    }
  }, [route.params]);

  const updateKirim = (x, v) => {
    setKirim({
      ...kirim,
      [x]: v,
    });
  };

  const [loading, setLoading] = useState(false);
  
  // Fungsi untuk login lokal
  const loginLocal = async () => {
    try {
      const localUsers = await getData('local_users') || [];
      
      // Cari user berdasarkan username dan password
      const user = localUsers.find(u => 
        u.username === kirim.username && 
        u.password === kirim.password &&
        u.userType === userType
      );
      
      if (user) {
        return {
          status: 200,
          data: user,
          message: 'Login berhasil'
        };
      } else {
        return {
          status: 400,
          message: 'Username atau password salah'
        };
      }
    } catch (error) {
      console.error('Error reading local storage:', error);
      return {
        status: 500,
        message: 'Terjadi kesalahan saat login'
      };
    }
  };

  const sendData = async () => {
    if (kirim.username.length == 0) {
      toast.show('Username masih kosong !');
    } else if (kirim.password.length == 0) {
      toast.show('Kata sandi masih kosong !');
    } else {
      console.log(kirim);
      setLoading(true);
      
      // Menambahkan userType ke data yang dikirim
      const loginData = {
        ...kirim,
        userType: userType
      };
      
      try {
        // Coba login ke server dulu
        const endpoint = userType === 'petugas' ? 'login_petugas' : 'login';
        const response = await axios.post(apiURL + endpoint, loginData);
        
        setTimeout(() => {
          setLoading(false);
          if (response.data.status == 200) {
            // Simpan data user beserta role
            const userData = {
              ...response.data.data,
              userType: userType
            };
            storeData('user', userData);
            
            // Navigasi berdasarkan jenis user
            if (userType === 'petugas') {
              navigation.replace('MainAppPetugas');
            } else {
              navigation.replace('MainApp');
            }
          } else {
            toast.show(response.data.message);
          }
        }, 700);
        
      } catch (error) {
        console.log('Server login failed, trying local storage:', error);
        
        // Jika gagal ke server, coba login lokal
        const localResult = await loginLocal();
        
        setTimeout(() => {
          setLoading(false);
          if (localResult.status == 200) {
            // Simpan data user dari storage lokal
            const userData = {
              ...localResult.data,
              userType: userType
            };
            storeData('user', userData);
            
            // Navigasi berdasarkan jenis user
            if (userType === 'petugas') {
              navigation.replace('HomePetugas');
            } else {
              navigation.replace('MainApp');
            }
            toast.show('Login berhasil (mode offline)');
          } else {
            toast.show(localResult.message);
          }
        }, 700);
      }
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: colors.white, flexDirection: 'column'}}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
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
            marginBottom: 5,
            fontFamily: fonts.secondary[800],
            fontSize: 30,
          }}>
          Masuk
        </Text>
        
        {/* Menampilkan jenis user */}
        <Text
          style={{
            marginBottom: 20,
            fontFamily: fonts.secondary[600],
            fontSize: 16,
            color: colors.primary,
          }}>
          {userType === 'petugas' ? 'Login Petugas' : 'Login Customer'}
        </Text>

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
        {!loading && <MyButton onPress={sendData} title="MASUK" />}
        {loading && <MyLoading />}
        
        {/* Tombol daftar hanya untuk customer */}
        {userType === 'customer' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
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
              Belum punya akun ?{' '}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.secondary[800],
                }}>
                Daftar disini
              </Text>
            </Text>
          </TouchableOpacity>
        )}

        {/* Tombol kembali ke halaman pilihan */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
              color: colors.secondary,
            }}>
            Kembali ke halaman pilihan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}