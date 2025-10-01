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
import { WebView } from 'react-native-webview';
export default function AANilai({ navigation, route }) {


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




    }

    return (



        <SafeAreaView style={{
            flex: 1,
            padding: 0,
            backgroundColor: '#F4F6FF',
            position: 'relative'
        }}>
            <View style={{
                padding: 20,
            }}>
                <MyHeader />

            </View>


            <View style={{
                flex: 1,
                backgroundColor: 'red'
            }}>
                <WebView source={{ uri: 'https://bit.ly/SRQ-COLOMADU1' }} />
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