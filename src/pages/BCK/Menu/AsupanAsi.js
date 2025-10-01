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
export default function AsupanAsi({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        waktu_pemberian: 'Pagi',
        frek_menyusui: 1,
        durasi_menyusui: ''
    });

    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(uu => {
            setKirim({
                ...kirim,
                fid_user: uu.id
            })
        })
    }, [])

    const sendServer = () => {

        if (kirim.durasi_menyusui.length == 0) {
            showMessage({
                message: 'Maaf durasi menyusui wajib di isi !',
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'insert_asupan_asi', kirim).then(res => {
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
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Asupan ASI" onPress={() => navigation.goBack()} />

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
                <MyPicker iconname="time-outline" data={[
                    { label: 'Pagi', value: 'Pagi' },
                    { label: 'Siang', value: 'Siang' },
                    { label: 'Sore', value: 'Sore' },
                    { label: 'Malam', value: 'Malam' },
                ]} label="Waktu Pemberian" value={kirim.waktu_pemberian} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        waktu_pemberian: x
                    })

                }} />
                <MyGap jarak={10} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 0,
                        position: 'relative'
                    }}>
                    <Icon type="ionicon" name="aperture-outline" color={colors.primary} size={MyDimensi / 4} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            left: 10,
                            fontSize: MyDimensi / 4,
                        }}>
                        Frekuensi Menyusui
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                }}>


                    <TouchableWithoutFeedback onPress={() => {
                        if (kirim.frek_menyusui == 1) {
                            showMessage({
                                message: 'Minimal Frekuensi Pemberian Makanan Utama 1',
                                type: 'danger'
                            })
                        } else {
                            setKirim({
                                ...kirim,
                                frek_menyusui: kirim.frek_menyusui - 1
                            });

                        }
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: MyDimensi / 1.5,
                                height: MyDimensi / 1.5,
                                backgroundColor: colors.primary,
                                borderRadius: MyDimensi / 3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon type='ionicon' name='remove' color={colors.white} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2.5,
                        textAlign: 'center',
                    }}>{kirim.frek_menyusui}</Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setKirim({
                            ...kirim,
                            frek_menyusui: kirim.frek_menyusui + 1
                        });

                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: MyDimensi / 1.5,
                                height: MyDimensi / 1.5,
                                backgroundColor: colors.primary,
                                borderRadius: MyDimensi / 3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon type='ionicon' name='add' color={colors.white} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <MyGap jarak={10} />

                <MyInput label="Durasi Menysui ( Menit )" keyboardType="number-pad" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        durasi_menyusui: x
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



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})