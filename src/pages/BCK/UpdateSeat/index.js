import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MyHeader, MyPicker } from '../../../components';

export default function UpdateSeat({navigation}) {
    const BackPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
       {/* HEADERS */}
       <MyHeader onPress={BackPage} judul='Update Seat' />

        <ScrollView style={{padding:10,}}>

        {/* PILIH PAKET */}
        <MyPicker label="Pilih Paket :" data={[
            // MASUKAN PAKETNYA
        ]}/>

        {/* NANTI DISINI AKAN MUNCUL SEAT SESUASI */}

        </ScrollView>
    </View>
  )
}