import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'
import { Icon } from 'react-native-elements'

export default function BuktiPengeluaran({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,

    }}>
     <View>
        <MyHeader title='Bukti Pengeluaran Kegiatan'/>
     </View>

     <ScrollView>
        <View style={{
            padding:10,

        }}>

        </View>
     </ScrollView>
        <View style={{
            padding:10,
            flexDirection:"row",
            justifyContent:'flex-end',
          
        }}>

        <TouchableNativeFeedback onPress={() => navigation.navigate('TambahBuktiPengeluaran')}>
            <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:50,
            }}>
                <Icon type='ionicon' name='add-outline' color='white'/>
            </View>
        </TouchableNativeFeedback>

        </View>
    </View>
  )
}