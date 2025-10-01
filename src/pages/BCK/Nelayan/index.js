import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Nelayan({ navigation, route }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        getData('user').then(u => {
            axios.post(apiURL + 'nelayan',
                {
                    fid_user: u.id
                }).then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
        })
    }


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('NelayanDetail', item)} style={{
                backgroundColor: colors.white,
                borderRadius: 5,
                marginVertical: 5,
                flexDirection: 'row',
                overflow: 'hidden'
            }}>

                <View style={{
                    flex: 1,
                    padding: 10,
                }}>
                    <Text style={{
                        width: windowWidth / 2,
                        textAlign: 'center',
                        borderRadius: 5,
                        marginBottom: 5,
                        color: colors.white,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28,
                        backgroundColor: colors.black
                    }}>{item.jenis_nelayan}</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Nama</Text>
                        <Text style={{
                            flex: 0.1,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{item.nama_nelayan}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Usia</Text>
                        <Text style={{
                            flex: 0.1,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{item.usia_nelayan} Tahun</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Alamat</Text>
                        <Text style={{
                            flex: 0.1,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{item.alamat_nelayan}</Text>
                    </View>


                </View>
                <View style={{
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                }}>
                    <Icon type='ionicon' name='chevron-forward' />
                </View>


            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} renderItem={__renderItem} />
            </View>

            <View>
                <MyButton onPress={() => navigation.navigate('NelayanAdd', route.params)} title="Tambah Nelayan" warna={colors.secondary} Icons="person-add" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})