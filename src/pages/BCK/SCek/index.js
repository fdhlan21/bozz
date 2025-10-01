import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import RenderHtml from 'react-native-render-html';
import YoutubePlayer from "react-native-youtube-iframe";
export default function SCek({ navigation }) {

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {

        __getTransaction();

    }, []);

    const __getTransaction = () => {
        axios(apiURL + 'company').then(res => {
            console.log(res.data.data.website)
            setData(res.data.data);
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>

            <YoutubePlayer
                height={300}
                play={false}
                videoId={data.panduan}

            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    judul: {
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 35
    },
    item: {
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 35
    }
})