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



export default function Kategori({ navigation, route }) {

    const [data, setData] = useState({});

    useEffect(() => {
        axios.post(apiURL + 'materi', {
            fid_menu: route.params.id
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }, [])


    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('Add', item);
                console.log(item)
            }}>
                <View style={{
                    flex: 1,
                    margin: 10,
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={{
                        uri: item.icon
                    }} style={{
                        width: windowHeight / 4,
                        resizeMode: 'contain',
                        height: windowWidth / 4
                    }} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        marginVertical: 5,
                        color: colors.primary
                    }}>{item.kategori}</Text>
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
                padding: 10,
                marginBottom: 10,
                backgroundColor: colors.secondary,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={{
                    uri: route.params.image
                }} style={{
                    width: windowWidth / 5,
                    resizeMode: 'contain',
                    height: 50,
                }} />

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 18,

                }}>{route.params.judul}</Text>
            </View>

            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} numColumns={2} renderItem={__renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})