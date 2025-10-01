import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import { DimensionThisPhone, MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { WebView } from 'react-native-webview';
import { MyButton, MyHeader, MyInput } from '../../components';
import ProgressCircle from 'react-native-progress-circle'
import axios from 'axios';
export default function Maps({ navigation, route }) {
  const [item, setItem] = useState({
    lat: 0,
    long: 0,
  });

  const [tmp, setTemp] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getDataTransaksi = () => {
    axios.get(`https://api.airvisual.com/v2/nearest_city?lat=${tmp.latitude}&lon=${tmp.longitude}&key=4de3c5dd-7eaf-4a75-8d87-7b99f0a4ca29`)
      .then(res => {
        console.log(res.data.data)
        setAqi(res.data.data);
        setItem({
          lat: tmp.latitude,
          long: tmp.longitude
        });
        myRef.current.reload();

      })
  }
  const myRef = useRef();
  const IMAGE = [
    {
      label: 'Bagus',
      image: require('../../assets/1.png')
    },
    {
      label: 'Sedang',
      image: require('../../assets/2.png')
    },
    {
      label: 'Tidak sehat untuk kelompok sensitif',
      image: require('../../assets/3.png')
    },
    {
      label: 'Tidak sehat',
      image: require('../../assets/4.png')
    },
    {
      label: 'Sangat tidak sehat',
      image: require('../../assets/5.png')
    },
    {
      label: 'Berbahaya',
      image: require('../../assets/6.png')
    },
  ]

  const [aqi, setAqi] = useState({
    "city": "Bandung", "country": "Indonesia", "current": {
      "pollution": {
        "aqicn": 38, "aqius": 82, "maincn": "p2", "mainus": "p2", "ts":
          "2024-03-21T00:00:00.000Z"
      }, "weather": {
        "hu": 91, "ic": "01d", "pr":
          1012, "tp": 20, "ts": "2024-03-20T23:00:00.000Z", "wd": 184, "ws": 0.89
      }
    }, "location": { "coordinates": [107.60694, -6.92222], "type": "Point" }, "state": "West Java"
  })


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData('lokasi').then(l => {
      console.log(l);
      setItem(l)

      getData('aqi').then(res => {
        console.log(res);
        setAqi(res)
        setLoading(false)
      })
    });


  }, [])



  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>


      {!loading && <View style={{
        padding: 10,
        backgroundColor: colors.white,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
          paddingRight: 5
        }}>
          <MyInput label="Latitude" onChangeText={x => {
            setTemp({
              ...tmp,
              latitude: x
            })
          }} />
        </View>
        <View style={{
          flex: 1,
          paddingRight: 5
        }}>
          <MyInput label="Longitude" onChangeText={x => {
            setTemp({
              ...tmp,
              longitude: x
            })
          }} />
        </View>
        <View style={{
          flex: 0.5,
          paddingRight: 5,
          paddingTop: 28,
        }}>
          <MyButton onPress={getDataTransaksi} Icons="search" />
        </View></View>}

      {!loading && <WebView ref={myRef} source={{ uri: `${webURL}home/map?lat=${item.lat}&long=${item.long}` }} style={{ height: 300 }} />}

      {/* CARD */}
      {!loading && <View style={{
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        bottom: 10,
        position: 'absolute',
        width: windowWidth / 1.2,
        alignSelf: 'center'

      }}>
        {/* MASUKAN LOKASI TEMPAT DISINI */}


        <View style={{ flexDirection: 'row', }}>
          <Image source={require('../../assets/kordinat.png')} style={{
            height: 21, width: 21,
          }} />
          <Text style={{ fontFamily: fonts.primary[600], left: 10 }}>{`${aqi.city}, ${aqi.state}, ${aqi.country}`}</Text>
        </View>






        {aqi.current.pollution.aqius > 0 && aqi.current.pollution.aqius <= 50 &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2
            }}>{IMAGE[0].label}</Text>
            <Image source={IMAGE[0].image} style={{
              width: '70%',
              resizeMode: 'contain'
            }} />
          </View>
        }
        {aqi.current.pollution.aqius > 50 && aqi.current.pollution.aqius <= 100 &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2
            }}>{IMAGE[1].label}</Text>
            <Image source={IMAGE[1].image} style={{
              width: '70%',
              resizeMode: 'contain'
            }} />
          </View>
        }

        {aqi.current.pollution.aqius > 100 && aqi.current.pollution.aqius <= 150 &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2
            }}>{IMAGE[2].label}</Text>
            <Image source={IMAGE[2].image} style={{
              width: '70%',
              resizeMode: 'contain'
            }} />
          </View>
        }

        {aqi.current.pollution.aqius > 150 && aqi.current.pollution.aqius <= 200 &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2
            }}>{IMAGE[3].label}</Text>
            <Image source={IMAGE[3].image} style={{
              width: '70%',
              resizeMode: 'contain'
            }} />
          </View>
        }

        {aqi.current.pollution.aqius > 200 && aqi.current.pollution.aqius <= 300 &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2
            }}>{IMAGE[4].label}</Text>
            <Image source={IMAGE[4].image} style={{
              width: '70%',
              resizeMode: 'contain'
            }} />
          </View>
        }

        {aqi.current.pollution.aqius > 300 &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2
            }}>{IMAGE[5].label}</Text>
            <Image source={IMAGE[5].image} style={{
              width: '70%',
              resizeMode: 'contain'
            }} />
          </View>
        }
        <View style={{ flexDirection: "row", justifyContent: 'center' }}>

          {/* <Text style={{ fontFamily: fonts.primary[400], fontSize: MyDimensi / 6.9, color: "gray" }}>
                  Beberapa orang mungkin sensitif{'\n'}20 rb mengikuti
                </Text> */}

          <View style={{ left: 0, flexDirection: "row" }}>
            <ProgressCircle
              percent={100}
              radius={40}
              borderWidth={8}
              color={colors.primary}
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: fonts.secondary[800] }}>{aqi.current.pollution.aqius}</Text>
              <Text style={{ fontSize: 10, textAlign: 'center', fontFamily: fonts.secondary[400] }}>{aqi.current.pollution.aqicn}</Text>
            </ProgressCircle>
            <View style={{
              marginHorizontal: 10,
            }} />
            <ProgressCircle
              percent={100}
              radius={40}
              borderWidth={8}
              color={colors.secondary}
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: fonts.secondary[800] }}>{'30'}</Text>
              <Text style={{ fontSize: 10, textAlign: 'center', fontFamily: fonts.secondary[400] }}>{'PM2.5'}</Text>
            </ProgressCircle>
          </View>

        </View>
      </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})