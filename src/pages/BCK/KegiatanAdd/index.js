import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
export default function KegiatanAdd({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        nama_kegiatan: '',
        tanggal_kegiatan: '',


    });


    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'insert_kegiatan', kirim).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                Alert.alert(MYAPP, 'Data berhasil di simpan !');
                navigation.goBack();
            }
        })
    }

    const [region, setRegion] = useState([]);

    useEffect(() => {

        axios.post(apiURL + 'region').then(res => {
            console.log(res.data);
            setRegion(res.data);
            setKirim({
                ...kirim,
                region: res.data[0].value
            })
        })

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>





                <MyInput value={kirim.tanggal_kegiatan} keyboardType='number-pad' maxLength={10} iconname='create' label='Tanggal Kegiatan* contoh : 29/04/2022' onChangeText={x => {
                    // console.log()
                    setKirim({
                        ...kirim,

                        tanggal_kegiatan: maskJs('99/99/9999', x)

                    })
                }} />
                <MyInput iconname='create' label='Nama Kegiatan' onChangeText={x => { setKirim({ ...kirim, nama_kegiatan: x }) }} />




            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})