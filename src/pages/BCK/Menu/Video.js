import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'video').then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data);
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('VideoDetail', item)
            }}>
                <View style={{
                    flex: 1,
                    // margin: 5,
                    width: '100%',
                    position: 'relative',
                    borderRadius: 0,
                    overflow: 'hidden'
                }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            // resizeMode: 'contain',
                            height: windowHeight / 2,
                            width: '100%',
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        padding: 10,
                        backgroundColor: colors.myback2
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: MyDimensi / 4
                        }}>{item.judul}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            color: colors.white,
                            fontSize: MyDimensi / 5
                        }}>{moment(item.tanggal).format('dddd, DD MMM YYYY')}</Text>
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

            <MyHeader judul="Video" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 0,
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
                    <FlatList data={data} numColumns={2} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

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