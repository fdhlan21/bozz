import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import ProgressCircle from 'react-native-progress-circle'

export default function Game({ navigation, route }) {

    const [berkas, setberkas] = useState({});
    const item = route.params;

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                Linking.openURL(item.file)
            }} style={{
                margin: 5,
                borderWidth: 1,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: colors.white,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    backgroundColor: item.tipe == 'pdf' ? colors.danger : colors.primary,
                    color: colors.white,
                    padding: 4,
                    textAlign: 'center'
                }}>{item.tipe}</Text>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        flex: 1,
                    }}>{item.nama_berkas}</Text>
                    <Icon type='ionicon' name='download-outline' color={colors.danger} />
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        axios.post(apiURL + 'data_berkas', {
            kode: route.params.kode
        }).then(res => {
            console.log(res.data);
            setberkas(res.data)
        })
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>
            <View style={{
                padding: 10,
                backgroundColor: colors.primary,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 15,
                    textAlign: 'center'
                }}>{item.judul}</Text>
            </View>
            <View style={{
                padding: 10,
                backgroundColor: colors.secondary,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 15,
                    textAlign: 'center'
                }}>{item.kategori}</Text>
            </View>


            {item.kategori == 'Ahli Waris' || item.kategori == 'Riwayat Tanah' ?

                <>
                    <View style={{
                        borderWidth: 1,
                        padding: 10,
                        borderColor: colors.secondary
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                color: colors.black
                            }}>Nama</Text>

                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black
                            }}>{item.nama}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                color: colors.black
                            }}>Alamat</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black
                            }}>{item.alamat}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                color: colors.black
                            }}>Nomor Surat</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black
                            }}>{item.nomor_surat}</Text>
                        </View>
                    </View>
                </> : <></>
            }


            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
            }}>
                <ProgressCircle
                    percent={item.persen}
                    radius={40}
                    borderWidth={5}
                    color={colors.primary}
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 20 }}>{`${item.persen}%`}</Text>
                </ProgressCircle>
            </View>
            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <ScrollView>
                    <FlatList data={berkas} renderItem={__renderItem} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})