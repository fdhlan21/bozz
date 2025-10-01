import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
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

export default function Anggota({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            axios.post(apiURL + 'anggota').then(res => {
                console.log(res.data);
                setData(res.data);
            })
        }


    }, [isFocused]);


    const __renderItem = ({ item }) => {

        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                marginVertical: 5,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{

                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, }}>NIK</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, }}>{item.nik}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, }}>Nama Lengkap</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, }}>{item.nama_lengkap}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, }}>Jenis Kelamin</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, }}>{item.jenis_kelamin}</Text>
                    </View>

                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AnggotaDetail', item)} style={{
                        backgroundColor: colors.primary,
                        width: 80,
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            marginRight: 5,

                        }}>Detail</Text>
                        <Icon type='ionicon' name='search-outline' color={colors.white} size={12} />
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})