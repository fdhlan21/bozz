import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'moment/locale/id';
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyCalendar from '../../components/MyCalendar';

export default function OrderList({ navigation, route }) {


  const [loading, setLoading] = useState(false);

  const options = {
    includeBase64: true,
    quality: 0.5,
    maxWidth: 400
  };
  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);



  const __getProduk = async () => {


    getData('user').then(u => {
      axios.post(apiURL + 'data_order', {
        fid_user: u.id
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      });
    })


  }


  useEffect(() => {
    if (isFocus) {
      __getProduk();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetail', item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.zavalabs,
          margin: 5,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 13
            }}>{item.nomor_order} </Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 13
            }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>

            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: 11
            }}>{item.pembayaran}</Text>
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              backgroundColor: item.jenis == 'Produk Jadi' ? colors.success : colors.primary,
              borderRadius: 10,
              paddingHorizontal: 10,
              color: colors.white
            }}>{item.jenis}</Text>
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              backgroundColor: item.status == 'PROSES' ? colors.warning : colors.success,
              borderRadius: 0,
              paddingHorizontal: 10,
              color: colors.white
            }}>{item.status}</Text>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name='chevron-forward' />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>

      <MyHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={{
        flex: 1,
      }}>
        <FlatList data={data} renderItem={__renderItem} />
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})