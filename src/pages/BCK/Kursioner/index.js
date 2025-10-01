import { View, Text, Image } from 'react-native'
import React from 'react'
import { MyButton } from '../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MyDimensi, fonts, windowHeight, windowWidth } from '../../utils'

export default function Kursioner({navigation}) {
  return (
    <View style={{flex:1, backgroundColor:'white',}}>

    <View>

{/* BUTTON BACK KE HALAMAN LOGIN */}
    <View style={{padding:10,}}>
    <TouchableOpacity>
        <Image style={{
            height:MyDimensi/1.9,
            width:MyDimensi/1.9
        }} source={require('../../assets/back.png')} />
    </TouchableOpacity>
    </View>


{/* MAIN CONTENT  */}
<View style={{padding:10}}>

<View style={{marginTop:20}}>
{/* HI STUDENT */}
<Text style={{
    fontFamily:fonts.primary[400],
    fontSize:MyDimensi / 4
}}>
    Hi, Student
</Text>

{/* SELAMAT DATANG */}
<Text style={{
    fontFamily:fonts.primary[600],
    fontSize:MyDimensi / 2.7,
    textAlign:'left'
}}>
Selamat Datang di aplikasi Gaya Belajar E-Learning, kamu ingin tau seperti apa konsep Gaya Belajar kamu ? langsung saja yuk klik Kuesioner di bawah ini  !
</Text>
</View>

<View style={{alignItems:"center", marginTop: -50}}>
    <Image source={require('../../assets/icontask.png')}
        style={{
            height:windowHeight / 1.9,
            width:windowWidth / 1.9,
            resizeMode:'contain'
        }}
    />


  
</View>

<MyButton title="Mulai" Icons="play" onPress={()=> navigation.navigate('KursionerVark')}/>
</View>


    </View>




    </View>
  )
}