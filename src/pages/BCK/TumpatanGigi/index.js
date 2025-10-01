import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'


export default function TumpatanGigi({navigation}) {
    const backPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:colors.tertiary}}>
        {/* HEADER */}
        <MyHeader  judul="Tumpatan Gigi" onPress={backPage}/>


    {/* MAIN */}
    <View style={{padding:10,  }}>


    {/* MASUKAN PDF */}



    </View>

    </View>

        // MAIN

 
  )
}

const styles = StyleSheet.create({})