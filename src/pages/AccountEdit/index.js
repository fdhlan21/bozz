import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {windowWidth, fonts} from '../../utils/fonts';
import {
  apiURL,
  getData,
  MYAPP,
  storeData,
  urlAPI,
  urlApp,
  urlAvatar,
} from '../../utils/localStorage';
import {Color, colors} from '../../utils/colors';
import {
  MyButton,
  MyCalendar,
  MyGap,
  MyHeader,
  MyInput,
  MyPicker,
} from '../../components';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';
import {useToast} from 'react-native-toast-notifications';

export default function AccountEdit({navigation, route}) {
  const [kirim, setKirim] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const sendServer = () => {
    setLoading(true);
    console.log(kirim);
    axios.post(apiURL + 'update_profile', kirim).then(res => {
      console.log(res.data);

      setLoading(false);

      if (res.data.status == 200) {
        storeData('user', res.data.data);
        navigation.replace('MainApp');
        toast.show(res.data.message, {
          type: 'success',
        });
      }
    });
  };

  useEffect(() => {
    setKirim({
      ...kirim,
      newfoto_user: null,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
        }}>
        {/* <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {


                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 200,
                            maxHeight: 200
                        }, response => {
                            // console.log('All Response = ', response);

                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                        });



                    }} style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: Color.blueGray[100],
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : kirim.foto_user,
                        }} />
                    </TouchableOpacity>
                </View> */}

        <MyInput
          label="Username"
          iconname="at-outline"
          value={kirim.username}
          onChangeText={x => setKirim({...kirim, username: x})}
        />

        <MyInput
          label="Nama Lengkap"
          iconname="person-outline"
          value={kirim.nama_lengkap}
          onChangeText={x => setKirim({...kirim, nama_lengkap: x})}
        />

        <MyInput
          label="Password"
          iconname="lock-closed-outline"
          secureTextEntry={true}
          onChangeText={x => setKirim({...kirim, newpassword: x})}
          placeholder="Kosongkan jika tidak diubah"
        />
        <MyGap jarak={20} />
        {loading && <MyLoading />}

        {!loading && (
          <MyButton
            warna={colors.secondary}
            colorText={colors.white}
            iconColor={colors.white}
            onPress={sendServer}
            title="Simpan Perubahan"
            Icons="download-outline"
          />
        )}
        <MyGap jarak={20} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
