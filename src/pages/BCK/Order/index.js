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

export default function Order({ navigation, route }) {


  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState({
    fid_user: route.params.id,
    jenis: 'Produk Jadi',
    kain: 'Dari Penjahit',
    model: 'Dari Penjahit',
    produk: '',
    ukuran: '',
    biaya: '',
    pembayaran: 'Transfer',
    foto_bayar: 'https://zavalabs.com/nogambar.jpg',
    alamat_kirim: '',
    tanggal_kirim: moment().format('YYYY-MM-DD'),


  })
  const options = {
    includeBase64: true,
    quality: 0.5,
    maxWidth: 400
  };
  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      // console.log('All Response = ', response);

      // console.log('Ukuran = ', response.fileSize);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('Image Picker Error: ', response.error);
      } else {
        if (response.fileSize <= 2000000) {
          let source = { uri: response.uri };
          switch (xyz) {
            case 1:
              setKirim({
                ...kirim,
                foto_bayar: `data:${response.type};base64, ${response.base64}`,
              });
              break;

          }
        } else {
          showMessage({
            message: 'Ukuran Foto Terlalu Besar Max 500 KB',
            type: 'danger',
          });
        }
      }
    });
  };

  const __getProduk = async () => {



    await axios.post(apiURL + 'get_data_order').then(res => {
      console.log(res.data.produk[0].value);
      setData(res.data);
      setKirim({
        ...kirim,
        produk: res.data.produk[0].value,
        biaya: res.data.produk[0].value.split(' / ')[1]
      })
    });
  }


  useEffect(() => {
    if (isFocus) {
      __getProduk();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.zavalabs,
          margin: 5,
        }}>
          <Image source={{
            uri: item.foto
          }} style={{
            width: '100%',
            height: 150,
          }} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 13
          }}>{item.nama_produk}</Text>
          <Text style={{
            fontFamily: fonts.primary[800],
            fontSize: 15,
            color: colors.secondary,
          }}>Rp. {new Intl.NumberFormat().format(item.harga_produk)}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 11
          }}>{item.keterangan_produk}</Text>
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
        <View style={{
          paddingHorizontal: '7%',
          paddingVertical: 10,

        }}>


          <MyPicker label="Jenis Order" value={kirim.jenis} onValueChange={x => {
            if (x == 'Produk Baru') {
              setKirim({
                ...kirim,
                pembayaran: 'COD',
                produk: 'Produk Baru',
                jenis: x
              })
            } else {
              setKirim({
                ...kirim,
                pembayaran: 'Transfer',
                kain: 'Dari Penjahit',
                model: 'Dari Penjahit',
                produk: data.produk[0].value,
                jenis: x
              })
            }
          }} data={[
            { label: 'Produk Jadi', value: 'Produk Jadi' },
            { label: 'Produk Baru', value: 'Produk Baru' },


          ]} iconname="options" />
          <MyGap jarak={10} />

          {kirim.jenis == 'Produk Baru' &&
            <>
              <MyPicker label="Kain" value={kirim.kain} onValueChange={x => {
                setKirim({
                  ...kirim,
                  kain: x
                })
              }} data={data.kain} iconname="layers-outline" />
              <MyGap jarak={10} />
              <MyPicker label="Model" value={kirim.model} onValueChange={x => {
                setKirim({
                  ...kirim,
                  model: x
                })
              }} data={data.model} iconname="cube-outline" />
              <MyGap jarak={10} />
            </>

          }

          {kirim.jenis == 'Produk Jadi' &&

            <>
              <MyPicker label="Produk" value={kirim.produk} onValueChange={x => {
                setKirim({
                  ...kirim,
                  produk: x,
                  biaya: x.split(' / ')[1]
                })
              }} data={data.produk} iconname="shirt-outline" />
              <MyGap jarak={10} />

              <MyInput label="biaya" value={kirim.biaya} onChangeText={x => {
                setKirim({
                  ...kirim,
                  biaya: x
                })
              }} iconname="pricetag-outline" />
              <MyGap jarak={10} />

            </>}

          <MyInput label="Ukuran" value={kirim.ukuran} onChangeText={x => {
            setKirim({
              ...kirim,
              ukuran: x
            })
          }} iconname="hardware-chip-outline" />

          <MyGap jarak={10} />
          <MyPicker label="Pembayaran" value={kirim.pembayaran} onValueChange={x => {

            if (x == 'COD') {
              setKirim({
                ...kirim,
                foto_bayar: 'https://zavalabs.com/nogambar.jpg',
                pembayaran: x
              })
            } else {
              setKirim({
                ...kirim,
                pembayaran: x
              })

            }
          }} data={[
            { label: 'Transfer', value: 'Transfer' },
            { label: 'COD', value: 'COD' },

          ]} iconname="options" />
          <MyGap jarak={10} />

          {kirim.pembayaran != 'COD' &&
            <>
              <TouchableOpacity onPress={() => getGallery(1)} style={{
                width: '100%',
                height: 250,
                padding: 10,
                overflow: 'hidden',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: colors.border
              }}>
                {kirim.foto_bayar !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                  uri: kirim.foto_bayar
                }} style={{
                  width: '100%',
                  height: 230,
                  resizeMode: 'contain',
                  borderRadius: 10,
                }} />}
                {kirim.foto_bayar == 'https://zavalabs.com/nogambar.jpg' &&
                  <>
                    <Image source={require('../../assets/camera.png')} style={{
                      width: 40,
                      height: 40,
                    }} /><Text style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: 15,
                    }}>Bukti Pembayaran</Text>
                  </>
                }

              </TouchableOpacity>
              <MyGap jarak={10} />
            </>
          }

          <MyInput label="Alamat Kirim" value={kirim.alamat_kirim} onChangeText={x => {
            setKirim({
              ...kirim,
              alamat_kirim: x
            })
          }} iconname="location-outline" />
          <MyGap jarak={10} />
          <MyCalendar label="Tanggal Kirim" value={kirim.tanggal_kirim} iconname="calendar-outline" onDateChange={x => {
            setKirim({
              ...kirim,
              tanggal_kirim: x
            })
          }} />
          <MyGap jarak={10} />


          {loading && <ActivityIndicator size="large" color={colors.primary} />}

          {!loading &&
            <TouchableOpacity onPress={() => {

              Alert.alert(MYAPP, 'Apakah pesanan kamu sudah betul ?', [
                { text: 'CEK ULANG' },
                {
                  text: 'SIMPAN',
                  onPress: () => {
                    setLoading(true);
                    axios.post(apiURL + 'order_add', kirim).then(res => {
                      console.log(res.data);
                      Alert.alert(MYAPP, res.data.message);
                      navigation.goBack();
                      setLoading(false)
                    })

                  }
                }
              ])

            }} style={{
              flexDirection: 'row',
              padding: 20,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon type='ionicon' name='download-outline' size={25} color={colors.white} />
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 25,
                color: colors.white,
                left: 10,
              }}>Buat Pesanan</Text>
            </TouchableOpacity>}
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})