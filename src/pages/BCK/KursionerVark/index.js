import { View, Text, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { MyDimensi, fonts } from '../../utils'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { MyRadio } from '../../components'

export default function KursionerVark() {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <ScrollView>

    {/* JUDUL KUERSIONAL VARK */}
    <View style={{flexDirection:'row', padding:10}}>

  
        <Text style={{
            flex:1,
            fontFamily:fonts.primary[600],
            fontSize:MyDimensi / 2
        }}>
        Kuesioner {'\n'}
        VARK
        </Text>

    <View>
        <TouchableNativeFeedback>
            <View style={{
                padding:10,
            }}>
            <Image source={require('../../assets/backright.png')} style={{
                width:40,
                height:40,
            }} />
            </View>
        </TouchableNativeFeedback>
    </View>
    </View>
{/* END HEADER */}

{/* CONTENT SOAL */}
<View style={{padding:10}}>

<Text style={{
    fontFamily:fonts.primary[600],
    fontSize: MyDimensi / 3,
    textAlign:'left'
}}>
Bagaimana cara belajar yang terbaik bagi saya?
</Text>


    <Text style={{
        fontFamily:fonts.primary[400],
        fontSize: MyDimensi / 4.8
    }}>
    Pilihlah jawaban yang paling sesuai dengan kondisi anda. Anda boleh memilih lebih dari satu pilihan jika memang ada lebih dari kondisi yang sesuai. Kosongkan saja pilihan yang tidak sesuai dengan anda
    </Text>


    {/* JAWABAN & SOAL */}
    <View style={{marginTop:20}}>
    {/* SOAL PERTAMA */}
    <View style={{}}>
        <Text style={{
            fontFamily:fonts.primary[400],
            fontSize: MyDimensi / 5.3
        }}>
            Saya ingin mengetahui dalam mengenai suatu tur wisata yang saya rencanakan. Saya akan:
        </Text>
        
    
   
    </View>

    </View>

</View>
    </ScrollView>
    </View>
  )
}