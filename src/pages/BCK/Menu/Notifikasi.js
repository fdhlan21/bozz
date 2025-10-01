import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { ScrollView } from 'react-native';
export default function Notifikasi({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        berat_badan: '',
        tinggi_badan: '',
    })
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Notifikasi" onPress={() => navigation.goBack()} />

            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: MyDimensi / 4,
                textAlign: 'center'
            }}>Belum ada Notifikasi</Text>


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