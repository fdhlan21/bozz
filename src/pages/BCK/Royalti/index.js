import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MyButtonSecond, MyCalendar, MyGap, MyHeader, MyPicker } from '../../components';


export default function Royalti({navigation}) {
    const BackPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
       {/* HEADERS */}
       <MyHeader onPress={BackPage} judul='Royalti' />

        <ScrollView style={{padding:10,}}>

        {/* NANTI MASUKAN KONTENT ROYALTINYA */}
        </ScrollView>
    </View>
  )
}