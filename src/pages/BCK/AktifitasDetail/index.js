import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, Alert, ScrollView } from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import Pdf from 'react-native-pdf';
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';
import { greaterOrEq } from 'react-native-reanimated';



export default function AktifitasDetail({ navigation, route }) {
    const item = route.params;
    console.log(item);


    const MyListData = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    flex: 1,
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    flex: 0.1,
                }}>:</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                    flex: 1,
                }}>{value}</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>

            <View style={{
                height: 80,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>Tanggal</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.tanggal}</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>Nama Pengguna</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.nama_lengkap} ( {item.level} )</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>Email</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.email}</Text>
                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: 10,
                }}>


                    <MyListData label='Lokasi' value={item.lokasi} />
                    <MyListData label='Aktifitas' value={item.aktifitas} />
                    <MyListData label='Keterangan' value={item.keterangan} />




                    <View style={{ padding: 10 }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 14
                        }}>Foto</Text>
                        <Image source={{
                            uri: item.foto
                        }} style={{
                            width: '100%',
                            height: windowWidth / 1.5,
                            resizeMode: 'contain'
                        }} />
                    </View>



                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            width: 100,
                            borderRadius: 10,
                            backgroundColor: colors.danger,
                        }} onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            {
                                style: 'cancel',
                                text: 'Batal'
                            },
                            {
                                style: 'default',
                                text: 'Hapus',
                                onPress: () => {

                                    console.log(item.id_aktifitas);
                                    axios.post(apiURL + 'delete_aktifitas', {
                                        id_aktifitas: item.id_aktifitas
                                    }).then(res => {
                                        console.log(res.data);
                                        navigation.goBack();

                                        showMessage({
                                            type: 'success',
                                            message: 'Data berhasil dihapus !'
                                        })
                                    })

                                }
                            }
                        ])}>
                            <Icon type='ionicon' name='trash' color={colors.white} />
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>




        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});