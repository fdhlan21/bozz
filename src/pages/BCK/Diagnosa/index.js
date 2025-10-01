import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'


export default function Diagnosa({navigation}) {
    const backPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:colors.tertiary}}>
        {/* HEADER */}
        <MyHeader  judul="Diagnosa" onPress={backPage}/>


    {/* MAIN */}
    <View style={{padding:10,  }}>

   <View>
    <MyPicker label="Apakah gigi kamu ada lubang?" data={[
        {
            label:'Ya',
            value:'ya',
        },
        {
            label:'Tidak',
            value:'tidak',
        },
        

    ]}/>

   </View>

    <MyGap jarak={20}/>

    <View>

<MyPicker label="Apakah gigi kamu ada sakit?" data={[
        {
            label:'Ya',
            value:'ya',
        },
        {
            label:'Tidak',
            value:'tidak',
        },
        

    ]}/>

    </View>

    <MyGap jarak={20}/>

    <MyButton title="Selanjutnya" onPress={() => navigation.navigate('Diagnosa2')}/>
    </View>

    </View>

        // MAIN

 
  )
}

const styles = StyleSheet.create({})