import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ChoosePage() {
    const navigation = useNavigation()
    
    // Fungsi untuk memilih customer - navigasi ke halaman login dengan parameter customer
    const handleChooseKostumer = () => {
        navigation.navigate('Login', { userType: 'customer' })
    }
    
    // Fungsi untuk memilih petugas - navigasi ke halaman login dengan parameter petugas
    const handleChoosePetugas = () => {
        navigation.navigate('Login', { userType: 'petugas' })
    }

    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: colors.white
        }}>
            <View style={{
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.primary,
                height: "100%"
            }}>
                <View>
                    {/* Pilihan Customer */}
                    <TouchableWithoutFeedback onPress={handleChooseKostumer}>
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.secondary,
                            borderRadius: 10,
                            height: 190,
                            width: 190,
                            borderWidth: 1,
                            borderColor: colors.white,
                            elevation: 5, // Shadow untuk Android
                            shadowColor: '#000', // Shadow untuk iOS
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}>
                            <Image 
                                style={{ 
                                    width: 120, 
                                    height: 120, 
                                    alignSelf: "center",
                                }} 
                                source={require("../../assets/costumer.png")}
                            /> 
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 16,
                                textAlign: "center",
                                paddingTop: 10,
                            }}>
                                Customer
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Pilihan Petugas */}
                    <TouchableWithoutFeedback onPress={handleChoosePetugas}>
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.secondary,
                            borderRadius: 10,
                            height: 190,
                            width: 190,
                            marginTop: 40,
                            borderWidth: 1,
                            borderColor: colors.white,
                            elevation: 5, // Shadow untuk Android
                            shadowColor: '#000', // Shadow untuk iOS
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}>
                            <Image 
                                style={{ 
                                    width: 120, 
                                    height: 120, 
                                    alignSelf: "center",
                                }} 
                                source={require("../../assets/petugas.png")}
                            /> 
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 16,
                                textAlign: "center",
                                paddingTop: 10,
                            }}>
                                Petugas
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}