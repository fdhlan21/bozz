import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MyCalendar, MyHeader, MyPicker } from '../../components';


export default function Saldoku({navigation}) {
    const BackPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
       {/* HEADERS */}
       <MyHeader onPress={BackPage} judul='Saldo Ku' />

        <ScrollView style={{padding:10,}}>

        {/* PILIH PAKET */}
        <MyCalendar label="Keberangkatan" />

        {/* NANTI DISINI AKAN MUNCUL TABEL SALDONYA */}

        </ScrollView>
    </View>
  )
}