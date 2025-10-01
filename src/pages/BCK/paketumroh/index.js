import { View, Text } from 'react-native'
import React from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'

export default function PaketUmrah({navigation}) {
    const MyBack  = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
     {/* HEADERS */}
     <MyHeader onPress={MyBack} judul='Paket Haji & Umroh' />

     {/* MAIN */}
     <ScrollView>
        {/* MASUKAN PAKET HAJI & UMROH DISINI */}
     </ScrollView>
    </View>
  )
}