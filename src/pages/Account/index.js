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
} from 'react-native';
import {windowWidth, fonts, MyDimensi} from '../../utils/fonts';
import {
  getData,
  MYAPP,
  storeData,
  urlAPI,
  urlApp,
  urlAvatar,
} from '../../utils/localStorage';
import {Color, colors} from '../../utils/colors';
import {MyButton, MyGap, MyHeader} from '../../components';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {ScrollView} from 'react-native';
import {Collator} from 'intl';

export default function ({navigation, route}) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log(res);
        setOpen(true);
        setUser(res);
      });
    }
  }, [isFocused]);

  const btnKeluar = () => {
    Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Keluar',
        onPress: () => {
          storeData('user', null);

          navigation.reset({
            index: 0,
            routes: [{name: 'Splash'}],
          });
        },
      },
    ]);
  };

  const MyList = ({label, value}) => {
    return (
      <View
        style={{
          marginTop: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.primary[600],
            color: colors.primary,
            marginLeft: 10,
          }}>
          {label}
        </Text>

        <View
          style={{
            marginVertical: 2,
            padding: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.blueGray[50],
            borderRadius: 30,
            height: 40,
          }}>
          <Text
            style={{
              ...fonts.body3,
              color: Color.blueGray[900],
            }}>
            {value}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Akun Saya" onPress={() => navigation.goBack()} />
      {!open && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {open && (
          <View
            style={{
              margin: 5,
              flex: 1,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
            <View style={{padding: 10}}>
              <MyList label="Nama Lengkap" value={user.nama_lengkap} />
              <MyList label="Username" value={user.username} />
            </View>
            {/* data detail */}
          </View>
        )}
        <View
          style={{
            padding: 20,
          }}>
          <MyButton
            warna={colors.primary}
            title="Edit Profile"
            onPress={() => navigation.navigate('AccountEdit', user)}
          />
          <MyGap jarak={10} />
          <MyButton
            onPress={btnKeluar}
            warna={Color.blueGray[400]}
            title="Log Out"
            iconColor={colors.white}
            colorText={colors.white}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
