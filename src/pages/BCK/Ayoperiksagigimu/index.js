import { ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { Image } from 'react-native'


export default function Periksagigimu({navigation}) {
    const backPage = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:colors.tertiary}}>
        {/* HEADER */}
        <MyHeader  judul="Ayo Periksa Gigimu" onPress={backPage}/>

    <ScrollView>
  {/* MAIN */}
  <View style={{padding:10,  }}>

<View>
    <TouchableNativeFeedback onPress={() => navigation.navigate('Gigilubang')}>
        <View style={{
            backgroundColor:colors.foourty, padding:10, borderRadius:10, flexDirection:"row",
                justifyContent:'space-between', borderWidth:1, borderColor:colors.primary
        }}>
            <Image source={require('../../assets/gigilubang.png')} style={{
                height:100, width:100,
                
            }}/>

                    <Text style={{
                      color:colors.primary, 
                      fontFamily:fonts.primary[600], 
                      fontSize:MyDimensi/4.1, 
                      textAlign:"left",
                      alignSelf:"center", 
                      left: -5}}>Ayo Ketahui Tanda-tanda{'\n'}Lubang Di Gigi mu</Text>
        </View>
    </TouchableNativeFeedback>
</View> 

<MyGap jarak={20}/>

<View>
    <TouchableNativeFeedback onPress={() => navigation.navigate('TumpatanGigi')}>
        <View style={{
            backgroundColor:colors.foourty, padding:10, borderRadius:10, flexDirection:"row",
                justifyContent:'space-between', borderWidth:1, borderColor:colors.primary
        }}>
            <Image source={require('../../assets/tumpatangigi.png')} style={{
                height:80, width:80,
                
            }}/>

                    <Text style={{
                      color:colors.primary, 
                      fontFamily:fonts.primary[600], 
                      fontSize:MyDimensi/4.1, 
                      textAlign:"left",
                      alignSelf:"center", 
                      left: -50}}>Ayo Ketahui Kondisi{'\n'}Tumpatan Gigi</Text>
        </View>
    </TouchableNativeFeedback>
</View> 



</View>
    </ScrollView>

<View style={{alignItems:"center"}}>
    <Image source={require('../../assets/icon.png')} style={{

        height:120, width:120
    }}/>

</View>

  

    </View>

        // MAIN

 
  )
}

const styles = StyleSheet.create({})