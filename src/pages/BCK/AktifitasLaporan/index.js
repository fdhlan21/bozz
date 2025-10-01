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

export default function AktifitasLaporan({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'aktifitas_laporan').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }


    const __renderItem = ({ item }) => {

        return (
            <View style={{
                borderBottomWidth: 1,
                paddingVertical: 5,
                borderBottomColor: colors.zavalabs,
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                flexDirection: 'row'
            }}>

                <View style={{
                    flex: 1,
                }}>



                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pengguna</Text>
                        <Text style={{
                            flex: 0.1,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{item.nama_lengkap}</Text>
                    </View>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30
                    }}>Laporan Aktivitas 7 Hari Terakhir</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_1}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_1_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_1_jumlah}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_2}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_2_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_2_jumlah}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_3}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_3_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_3_jumlah}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_4}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_4_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_4_jumlah}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_5}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_5_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_5_jumlah}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_6}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_6_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_6_jumlah}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 10,
                            padding: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 50,
                            }}>{item.tanggal_7}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                borderRadius: 10,
                                color: colors.white,
                                backgroundColor: item.tanggal_7_jumlah > 0 ? colors.secondary : colors.danger
                            }}>{item.tanggal_7_jumlah}</Text>
                        </View>
                    </View>



                </View>




            </View>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})