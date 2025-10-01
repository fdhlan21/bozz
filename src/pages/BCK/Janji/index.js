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
import { MyButton, MyCalendar, MyGap, MyInput } from '../../components';

export default function Janji({ navigation, route }) {

    const [kirim, setKirim] = useState({
        nama: '',
        kpj: '',
        telepon: '',
        tanggal: moment().format('YYYY-MM-DD'),
        poli: '',
        dokter: ''
    })

    const sendServer = () => {


        let pesan = `Hallo *${item.nama_rs}*%0A%0ASaya peserta Bpjs Ketenagakerjaan ingin registrasi, dengan data sbb:%0A%0A- Nama  : *${kirim.nama}*%0A- No KPJ : *${kirim.kpj}*%0A- No tlp : *${kirim.telepon}*%0A- Tgl Kunjungan : *${moment(kirim.tanggal).format('dddd, DD MMMM YYYY')}*%0A- Poli : *${kirim.poli}*%0A- Dokter : *${kirim.dokter}*%0A`;

        console.log(pesan);

        Linking.openURL('https://wa.me/' + item.telepon_rs + '?text=' + pesan);
        // Linking.openURL('https://wa.me/6289653763986' + '?text=' + pesan);
    }

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <ScrollView>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                }}>
                    <Image source={{
                        uri: item.image
                    }} style={{
                        width: 100,
                        height: 50,
                        resizeMode: 'contain',
                    }} />
                </View>

                <View style={{
                    padding: 20,
                }}>
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama: x
                        })
                    }} label="Nama Lengkap" iconname="person-outline" placeholder="masukan nama lengkap" />
                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            kpj: x
                        })
                    }} label="No. KPJ" iconname="card-outline" placeholder="masukan no. kpj" />
                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            telepon: x
                        })
                    }} label="No. Telepon" keyboardType='phone-pad' iconname="logo-whatsapp" placeholder="masukan no. telepon" />
                    <MyGap jarak={10} />
                    <MyCalendar onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal: x
                        })
                    }} label="Tanggal Kunjungan" iconname="calendar-outline" />
                    <MyInput label="Poli" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            poli: x
                        })
                    }} iconname="heart-outline" placeholder="masukan poli" />
                    <MyGap jarak={10} />
                    <MyInput label="Dokter" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            dokter: x
                        })
                    }} iconname="people-outline" placeholder="masukan dokter" />
                    <MyGap jarak={10} />
                </View>
            </ScrollView>
            <MyButton onPress={sendServer} radius={0} Icons="logo-whatsapp" title="Buat Janji Temu" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})