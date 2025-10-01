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

const MyMenuFeature = ({ img, label, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                flex: 1,
                padding: 5,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={img} style={{
                    width: windowHeight / 2,
                    resizeMode: 'contain',
                    height: windowWidth / 2
                }} />

            </View>
        </TouchableWithoutFeedback>
    )
}

export default function GameGambar({ navigation }) {

    const [comp, setComp] = useState({});

    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data);
            setComp(res.data.data)
        })
    }, [])


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

                }}>Perbedaan Gambar</Text>
                <View style={{
                    borderBottomWidth: 1,
                    width: windowWidth / 2,
                    borderColor: colors.border

                }}></View>
            </View>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20,
            }}>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                }}>
                    <MyMenuFeature img={require('../../assets/b1.png')} onPress={() => navigation.navigate('GameGambar1')} />
                    <MyMenuFeature img={require('../../assets/b2.png')} onPress={() => navigation.navigate('GameGambar2')} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                }}>
                    <MyMenuFeature img={require('../../assets/b3.png')} onPress={() => navigation.navigate('GameGambar3')} />
                    <MyMenuFeature img={require('../../assets/b4.png')} onPress={() => navigation.navigate('GameGambar4')} />
                </View>




            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})