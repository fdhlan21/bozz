import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, Alert, ScrollView } from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import Pdf from 'react-native-pdf';
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';



export default function AnggotaDetail({ navigation, route }) {
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
                    }}>NIK / SIM</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.nik}</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>Nama Lengkap</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.nama_lengkap}</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>Jenis Kelamin</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.jenis_kelamin}</Text>
                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: 10,
                }}>


                    <MyListData label='Tempat Lahir' value={item.tempat_lahir} />
                    <MyListData label='Tanggal Lahir' value={item.tanggal_lahir} />
                    <MyListData label='Jenis Kelamin' value={item.jenis_kelamin} />
                    <MyListData label='Gol. Darah' value={item.gol_darah} />
                    <MyListData label='Agama' value={item.agama} />
                    <MyListData label='Alamat' value={item.alamat} />
                    <MyListData label='RT/RW' value={item.rt_rw} />
                    <MyListData label='Kel/Desa' value={item.kel_desa} />
                    <MyListData label='Kecamatan' value={item.kecamatan} />
                    <MyListData label='Status Perkawinan' value={item.status_perkawinan} />
                    <MyListData label='Pekerjaan' value={item.pekerjaan} />
                    <MyListData label='Kewarganegaraan' value={item.kewarganegaraan} />


                    <View style={{ padding: 10 }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 14
                        }}>Foto KTP</Text>
                        <Image source={{
                            uri: item.foto_ktp
                        }} style={{
                            width: '100%',
                            height: windowWidth / 1.5,
                            resizeMode: 'contain'
                        }} />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 14
                        }}>Foto Profile</Text>
                        <Image source={{
                            uri: item.foto_profile
                        }} style={{
                            width: '100%',
                            height: windowWidth / 1.5,
                            resizeMode: 'contain'
                        }} />
                    </View>





                </View>
            </ScrollView>



            <TouchableOpacity onPress={() => {
                Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                    {
                        style: 'cancel',
                        text: 'Batal'
                    },
                    {
                        style: 'default',
                        text: 'Hapus',
                        onPress: () => {

                            console.log(item.id_anggota);
                            axios.post(apiURL + 'delete_anggota', {
                                id_anggota: item.id_anggota
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
                ])
            }} style={{
                padding: 10,
                backgroundColor: colors.danger
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    textAlign: 'center'
                }}>Hapus</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});