import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { ScrollView } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
export default function StatusGizi({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        berat_badan: '',
        tinggi_badan: '',
    })

    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(uu => {
            console.log(uu);
            setKirim({
                ...kirim,
                jenis_kelamin: uu.jenis_kelamin,
                umur: parseFloat(moment().diff(uu.tanggal_lahir, 'month', false)),
                fid_user: uu.id
            })
        })
    }, []);

    const sendServer = () => {
        if (kirim.tinggi_badan.length == 0) {
            showMessage({
                message: 'Maaf tinggi badan wajib di isi !',
            })
        } else if (kirim.berat_badan.length == 0) {
            showMessage({
                message: 'Maaf berat badan wajib di isi !',
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'insert_status_gizi', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    SweetAlert.showAlertWithOptions({
                        title: MYAPP,
                        subTitle: res.data.message,
                        style: 'success',
                        cancellable: true
                    })
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>

            <MyHeader judul="Status Gizi" onPress={() => navigation.goBack()} />

            <View style={{
                padding: 10,
                borderWidth: 1,
                margin: 20,
                borderRadius: 10,
                borderColor: colors.border
            }}>
                <MyCalendar value={kirim.tanggal} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal: x
                    })
                }} label="Tanggal Pengukuran" iconname="calendar-outline" />
                <MyGap jarak={10} />


                <MyInput label="Berat Badan Saat Ini ( kg )" keyboardType="number-pad" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        berat_badan: x
                    })
                }} />
                <MyGap jarak={10} />


                <MyInput label="Tinggi Badan Saat Ini ( cm )" keyboardType="number-pad" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        tinggi_badan: x
                    })
                }} />
                <MyGap jarak={30} />
                <MyButton title="Kirim" onPress={sendServer} />
            </View>


            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }

            <TouchableWithoutFeedback onPress={() => navigation.navigate('StatusGiziHasil', user)}>
                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    borderRadius: 30,
                    backgroundColor: colors.secondary,
                    padding: 10,
                    height: 45,
                    width: windowWidth / 2.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Icon type='ionicon' name='search-outline' color={colors.black} size={MyDimensi / 3.5} />
                    <Text style={{
                        // left: 5,
                        marginLeft: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 3.5,
                        color: colors.black
                    }}>Lihat Hasil</Text>
                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})