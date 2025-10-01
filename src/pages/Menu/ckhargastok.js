import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { MyHeader, MyInput } from '../../components'
import { colors, fonts } from '../../utils'
import { Icon } from 'react-native-elements'


export default function CheckHargaStock({}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:'white',

    }}>
    <View>
        <MyHeader title="Cek Harga & Stok"/>
    </View>
     <ScrollView>
        <View>

        {/* SEARCH */}

        <View style={{
            padding:0,
          

        }}>
        <View style={{
           flexDirection:"row",
           justifyContent:"space-between",
           alignItems:"center",
           padding:10

        }}>
        <Text style={{
            fontFamily:fonts.primary[600],
            fontSize:12
        }}>
        Enter Part Number :
        </Text>
            <View style={{
                top:-20,
                width:215
            }}>
            <MyInput backgroundColor='#f5f5f5' colorlabel={colors.primary} placeholder='Please enter part number'/>
            </View>
        </View>

        <View style={{
           flexDirection:"row",
           justifyContent:"space-between",
           alignItems:"center",
           padding:10,
           marginTop:-30

        }}>
        <Text style={{
            fontFamily:fonts.primary[600],
            fontSize:12
        }}>
        Qty     
        </Text>
            <View style={{
                top:-20,
                width:215,
                
            }}>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
             
            }}>
            <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                left:-10,
                top:20
            }}>
                :
            </Text>
            <View style={{
             
                width:"100%"
            }}>
            <MyInput backgroundColor='#f5f5f5' colorlabel={colors.primary} placeholder='Please enter quantity'/>
            </View>
          
            </View>
            </View>
        </View>

           

        </View>
        <View style={{
                marginTop:10,
                padding:10
            }}>
                <TouchableNativeFeedback>
                    <View style={{
                        padding:10,
                        backgroundColor:colors.primary,
                        flexDirection:"row",
                        height:43,
                        borderRadius:30,
                        justifyContent:"center",
                        alignItems:'center'

                    }}>
                    <Text style={{
                        fontFamily:fonts.primary[500],
                        color:"white",
                        marginRight:10,
                        fontSize:14,
                    }}>Search</Text>
                        <Icon type='ionicon' name='search-outline' color='white' size={20}/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
     </ScrollView>
    
    </View>
  )
}