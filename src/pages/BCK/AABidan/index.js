import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';

import YoutubePlayer from "react-native-youtube-iframe";
import { Linking } from 'react-native';

export default function AABidan({ navigation, route }) {
    const __renderItem = ({ item, index }) => {
        return (

            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/' + item.telepon)} style={{
                flex: 1,
                width: windowWidth / 3.2,
                height: windowHeight / 4.1,
                backgroundColor: colors.white,
                margin: 2,
                padding: 10,
                borderRadius: 10,
                elevation: 1,
            }}>
                <Image style={{
                    width: '100%',
                    borderTopRightRadius: 20,
                    height: 100,
                }} source={{
                    uri: item.foto_bidan
                }} />
                <View style={{
                    marginTop: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 35,
                    }}>{item.nama_bidan}</Text>
                    <Text style={{
                        top: -5,
                        fontFamily: fonts.secondary[200],
                        fontSize: windowWidth / 38
                    }}>{item.keterangan}</Text>
                </View>
            </TouchableOpacity>

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
        axios.post(apiURL + 'bidan').then(res => {
            console.log(res.data);
            setData(res.data);
        })



    }

    return (



        <SafeAreaView style={{
            flex: 1,
            padding: 0,
            backgroundColor: colors.myback2,
        }}>
            <View style={{
                padding: 20,
            }}>
                <MyHeader />
                <View style={{
                    borderTopWidth: 1,
                    marginBottom: 20,
                    borderTopColor: colors.white,
                    width: 100,
                }} />
                <Text style={{
                    fontFamily: fonts.primary[400],
                    color: colors.foourty,
                    fontSize: windowWidth / 28
                }}>tanyakan seputar keluhanmu, yuk!</Text>
                <Text style={{
                    fontFamily: fonts.primary[800],
                    color: colors.foourty,
                    fontSize: windowWidth / 9
                }}>TANYA NAKES</Text>
            </View>

            <View style={{
                flex: 1,
                alignItems: 'center'
            }}>
                <FlatList style={{
                    flex: 1,
                }} numColumns={3} data={data} renderItem={__renderItem} />
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