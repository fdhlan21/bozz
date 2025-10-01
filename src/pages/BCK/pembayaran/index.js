import { View, Text } from 'react-native'
import React from 'react'
import { MyButton, MyButtonSecond, MyCalendar, MyGap, MyHeader, MyInput, MyInputSecond, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import MyCarouser from '../../components/MyCarouser'

export default function Pembayaran({navigation}) {
    const MyBack  = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
     {/* HEADERS */}
     <MyHeader onPress={MyBack} judul='Pembayaran' />

     {/* MAIN */}
     <ScrollView style={{padding:10, }}>
    {/* TANGGAL KEBERANGKATAN */}
   <MyCalendar label="Tanggal Keberangkatan :" />

    <MyGap jarak={20}/>

    {/* NAMA LENGKAP */}
    <MyInputSecond label="Nama Lengkap :" placeholder="Nama Lengkap"/>


    <MyGap jarak={20}/>

    {/* Kurang BAYAR */}
    <MyInputSecond label=" Kurang Bayar :" placeholder="Kurang Bayar"/>




    <MyGap jarak={20}/>

    {/* Kurang BAYAR */}
    <MyInputSecond label="Bayar :" placeholder="Bayar"/>

    
    <MyGap jarak={20}/>

{/* Jamaah */}
<MyInputSecond label="Jamaah :" placeholder="Jamaah"/>


    
    <MyGap jarak={20}/>

   {/* UPLOAD BUKTI TF */}
    {/* DISINI NANTI ADA UPLOAD BUKTI TF */}
    

<MyButtonSecond title="Bayar"/>

<MyGap jarak={40}/>

     </ScrollView>
    </View>
  )
}