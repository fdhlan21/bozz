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
import MyCarouser from '../../components/MyCarouser';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components';

export default function MenuKyt({ navigation, route }) {

    const isFocus = useIsFocused();

    useEffect(() => {

        if (isFocus) {
            __getTransaction();
        }
    }, isFocus);

    const [data, setData] = useState([]);

    const __renderItem = ({ item }) => {
        return (
            <TouchableNativeFeedback onPress={() => {
                if (item.tipe == 'VIDEO') {
                    navigation.navigate('InfoYT', item)
                } else {
                    navigation.navigate('InfoPdf', item)
                }
            }}>
                <View style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 10,
                    margin: 5,
                    height: 120,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain'
                    }} source={{
                        uri: item.icon
                    }} />
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: 11,
                        textAlign: 'center',
                        color: colors.white,
                    }}>{item.nama_materi}</Text>


                </View>
            </TouchableNativeFeedback>
        )
    }

    const __getTransaction = () => {

        axios.post(apiURL + 'materi', {
            fid_menu: route.params.id
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul={route.params.judul} onPress={() => navigation.goBack()} />
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <FlatList numColumns={3} showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})