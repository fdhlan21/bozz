import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MyButtonSecond, MyCalendar, MyGap, MyHeader, MyPicker } from '../../components';


export default function DataJamaah2({navigation}) {
    const BackPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
       {/* HEADERS */}
       <MyHeader onPress={BackPage} judul='Data Jamaah' />

        <ScrollView style={{padding:10,}}>

        {/* PILIH PAKET */}
        <MyCalendar label="Keberangkatan" />

        {/* NANTI DISINI AKAN MUNCUL TABEL DATA JAMAAH */}

        <MyGap jarak={20}/>

        <MyButtonSecond title="Update Pembayaran"/>

        </ScrollView>
    </View>
  )
}