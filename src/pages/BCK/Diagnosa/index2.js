import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import CheckBox from '@react-native-community/checkbox';

export default function Diagnosa2({navigation}) {
    const backPage = () => {
        navigation.goBack();
    }

    const [isCheckedYes, setCheckedYes] = useState(false);
    const [isCheckedNo, setCheckedNo] = useState(false);
  return (
    <View style={{flex:1, backgroundColor:colors.tertiary}}>
        {/* HEADER */}
        <MyHeader  judul="Diagnosa" onPress={backPage}/>


    {/* MAIN */}
    <View style={{padding:10,  }}>

   <View>
   <CheckBox
          value={isCheckedYes}
          onValueChange={() => {
            setCheckedYes(!isCheckedYes);
            setCheckedNo(false);
          }}
        />
        <Text>Ya</Text>

        <CheckBox
          value={isCheckedNo}
          onValueChange={() => {
            setCheckedNo(!isCheckedNo);
            setCheckedYes(false);
          }}
        />
        <Text>Tidak</Text>
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

    <MyButton title="Selanjutnya"/>
    </View>

    </View>

        // MAIN

 
  )
}

const styles = StyleSheet.create({})