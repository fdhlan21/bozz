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
import moment from 'moment';
import 'moment/locale/id';

export default function Riwayat({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            __getTransaction
        }


    }, [isFocused]);

    const __getTransaction = () => {
        axios.post(apiURL + 'hasil').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }


    const __renderItem = ({ item }) => {

        return (
            <View style={{

                backgroundColor: colors.white,
                borderRadius: 5,
                borderColor: colors.border,
                marginVertical: 4,
                padding: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{

                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600], color: colors.primary }}>{moment(item.tanggal).locale("id").format('dddd, LL')} Pukul {item.jam} WIB</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600] }}>Barcode</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400] }}>{item.barcode}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600] }}>Tujuan</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400] }}>{item.tujuan}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600] }}>Jenis</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400] }}>{item.jenis}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600] }}>Jumlah Barang</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400] }}>{item.jumlah}</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, "Hapus barcode ini ?", [
                        {
                            'text': 'TIDAK',
                            'style': 'cancel'
                        },
                        {
                            'text': 'HAPUS',
                            onPress: () => {
                                axios.post(apiURL + 'hasil_delete', {
                                    id: item.id
                                }).then(res => {
                                    console.log(res.data);
                                    __getTransaction();
                                })
                            }
                        }
                    ])
                }} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: colors.danger,
                    padding: 5,
                }}>
                    <Icon type='ionicon' name='trash' color={colors.white} size={15} />
                </TouchableOpacity>
            </View>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})