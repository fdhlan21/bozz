import { ActivityIndicator, FlatList, Image, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'baju').then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }

    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (



            <TouchableWithoutFeedback onPress={() => {
                Linking.openURL('https://sketsa.okeadmin.com/baju/print/' + item.id)
            }}>
                <View style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    width: '100%',
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <ImageBackground source={{
                            uri: item.img
                        }} style={{

                            width: 150,
                            height: 180,
                        }}>
                            <Image source={require('../../assets/sfront.png')} style={{
                                width: 150,
                                height: 180,
                            }} />
                        </ImageBackground>
                        <ImageBackground source={{
                            uri: item.img
                        }} style={{

                            width: 150,
                            height: 200,
                        }}>
                            <Image source={require('../../assets/sback.png')} style={{
                                width: 150,
                                height: 200,
                            }} />
                        </ImageBackground>
                    </View>
                    <View style={{
                        opacity: 0.6,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        padding: 10,
                        backgroundColor: colors.primary
                    }}>

                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            color: colors.white,
                            fontSize: MyDimensi / 5
                        }}>{moment(item.tanggal).format('dddd, DD MMM YYYY')} pukul {item.jam}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>



        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Riwayat Foto" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                    <View style={{
                        position: 'relative'
                    }}>
                        {key.length > 0 &&

                            <TouchableWithoutFeedback onPress={() => {
                                setKey(''); setData(TMP);
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 99,
                                    top: 10,
                                    right: 10,
                                }}>
                                    <Icon type='ionicon' name='close' color={colors.secondary} />
                                </View>
                            </TouchableWithoutFeedback>}
                        <View style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                        }}>
                            <Icon type='ionicon' name='search' color={colors.primary} />
                        </View>
                        <TextInput value={key} onChangeText={x => {
                            setKey(x);
                            if (x.length > 0) {
                                let TMPSrc = data.filter(i => i.judul.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                if (TMPSrc.length > 0) {
                                    setData(TMPSrc);
                                }
                            } else {
                                setData(TMP);
                            }
                        }} placeholder='Pencarian . . .' style={{
                            height: 45,
                            borderWidth: 1,
                            marginBottom: 10,
                            borderRadius: 30,
                            paddingLeft: 40,
                            borderColor: colors.primary,
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 4
                        }} />
                    </View>
                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})