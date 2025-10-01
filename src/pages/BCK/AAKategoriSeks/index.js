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

export default function AAKategoriSeks({ navigation, route }) {
    const __renderItem = ({ item, index }) => {
        return (

            <View style={{
                position: 'relative',
                padding: 10,
            }}>

                <TouchableOpacity onPress={() => {
                    if (item.judul == 'Seks Pranikah') {
                        navigation.navigate('AAKategoriSeks', {
                            fid_kategori: 0
                        })
                    } else {
                        navigation.navigate('AAMateriPdf', {
                            pdf: item.pdf_materi
                        })
                    }

                }} style={{
                    flex: 1,
                    width: windowWidth / 1.2,
                    height: 80,
                    backgroundColor: index % 2 !== 0 ? '#E6F0F3' : '#FFFFFF',
                    margin: 3,
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image style={{
                        width: windowWidth / 5,
                        height: 60,
                        resizeMode: 'contain',
                    }} source={{
                        uri: item.foto_materi
                    }} />


                    <View style={{
                        flex: 1,
                        paddingLeft: 10,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: windowWidth / 23,
                        }}>{item.judul} </Text>
                        <Text style={{
                            fontFamily: fonts.primary[300],
                            fontSize: windowWidth / 37,
                            color: colors.border
                        }}>{item.keterangan}</Text>
                        <View style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{
                                flex: 0.4,
                                fontFamily: fonts.primary[600],
                                fontSize: windowWidth / 30,
                                color: colors.foourty
                            }}>See Details</Text>
                            <Icon type='ionicon' name='arrow-forward-outline' color={colors.foourty} size={windowWidth / 22} />
                        </View>
                    </View>

                </TouchableOpacity>

            </View>

        )
    }

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });
        axios.post(apiURL + 'materi', {
            fid_kategori: route.params.fid_kategori
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        })



    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (



        <SafeAreaView style={{
            flex: 1,
            padding: 20,
            backgroundColor: colors.myback,
            position: 'relative'
        }}>
            <MyHeader />


            <Text style={{
                fontFamily: fonts.primary[600],
                color: colors.black,
                fontSize: windowWidth / 13
            }}>{capitalizeFirstLetter(route.params.nama_kategori.toLowerCase())}</Text>

            <View style={{
                marginTop: 20,
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <FlatList data={data} renderItem={__renderItem} />
            </View>
        </SafeAreaView>











    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});