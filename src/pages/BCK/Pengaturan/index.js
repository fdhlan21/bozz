import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import RNFS from 'react-native-fs';


export default function Pengaturan({ navigation }) {

    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader />

            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
                    flexDirection: 'row',
                    padding: 20,
                    marginVertical: 2
                }}>
                    <Icon type='ionicon' name='person-outline' size={20} />
                    <Text style={{
                        left: 5,
                        flex: 1,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Profil Saya</Text>
                    <Icon type='ionicon' name='chevron-forward' color={colors.black} />
                </TouchableOpacity>


                {/* <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah kamu yakin download data ini ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'DOWNLOAD',
                            onPress: () => {
                                var path = RNFS.ExternalStorageDirectoryPath + `/Download/belgareti_${moment().format('YYMMDD')}.txt`;

                                RNFS.writeFile(path, 'test 123123', 'utf8')
                                    .then((success) => {
                                        console.log('FILE WRITTEN!', path);
                                        Alert.alert('Berhasil di simpan di folder download !', `zavalabs_${moment().format('YYMMDD')}.txt`)

                                        // Share.open({
                                        //     title: MYAPP,
                                        //     message: "Print data",
                                        //     url: 'file:///' + path,
                                        //     subject: "Report",
                                        // })
                                        //     .then((res) => {
                                        //         console.log(res);

                                        //     })
                                        //     .catch((err) => {
                                        //         err && console.log(err);
                                        //     });
                                    })
                                    .catch((err) => {
                                        console.log(err.message);
                                    });
                            }
                        }
                    ])
                }} style={{
                    flexDirection: 'row',
                    padding: 20,
                    marginVertical: 2
                }}>
                    <Icon type='ionicon' name='download-outline' size={20} />
                    <Text style={{
                        left: 5,
                        flex: 1,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Download Data</Text>
                    <Icon type='ionicon' name='chevron-forward' color={colors.black} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah kamu yakin akan reset data ini ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'YA, SAYA YAKIN AKAN RESET DATA',
                            onPress: () => {
                                alert('tser')
                            }
                        }
                    ])
                }} style={{
                    flexDirection: 'row',
                    padding: 20,
                    marginVertical: 2
                }}>
                    <Icon type='ionicon' name='refresh-outline' size={20} />
                    <Text style={{
                        left: 5,
                        flex: 1,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Reset Data</Text>
                    <Icon type='ionicon' name='chevron-forward' color={colors.black} />
                </TouchableOpacity> */}


            </View>

            <View style={{
                padding: 20,
            }}>
                <MyButton onPress={btnKeluar} warna={colors.black} title="Keluar" Icons="log-out" iconColor={colors.white} colorText={colors.white} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})