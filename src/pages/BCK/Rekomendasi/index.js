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

export default function Rekomendasi({ navigation }) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(apiURL + 'artikel').then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false)
            // setComp(res.data.data)
        })
    }, [])

    const MyMenuFeature = ({ img, label, onPress }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{
                    marginBottom: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    overflow: 'hidden',
                    marginHorizontal: 10,
                }}>
                    <Image source={{
                        uri: img
                    }} style={{
                        width: '100%',
                        height: 200,
                    }} />
                    <View style={{
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            marginVertical: 5,
                            fontSize: 15,
                            color: colors.black
                        }}>{label}</Text>
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                marginVertical: 5,
                                fontSize: 15,
                                color: colors.black,
                                marginRight: 5,
                            }}>Read More</Text>
                            <Icon type='ionicon' name='arrow-forward-circle' color={colors.black} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>

            <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 0
            }}>
                <Image source={require('../../assets/top2.png')} style={{
                    width: 100,
                    height: 140,
                }} />
            </View>
            <View style={{
                height: 120,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 24,
                    marginBottom: 5,

                }}>Rekomendasi Aktitas</Text>
                <View style={{
                    borderBottomWidth: 1,
                    width: windowWidth / 2,
                    borderColor: colors.border

                }}></View>
            </View>

            <View style={{
                flex: 1,
                // justifyContent: 'center',
                padding: 20,
            }}>

                {loading && <ActivityIndicator size="large" color={colors.primary} />}


                <ScrollView showsVerticalScrollIndicator={false}>
                    {!loading && data.map(i => {
                        return (
                            <MyMenuFeature img={i.image} label={i.judul} onPress={() => navigation.navigate('RekomendasiDetail', i)} />
                        )
                    })}
                </ScrollView>






            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})