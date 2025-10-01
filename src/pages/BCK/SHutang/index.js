import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'

export default function SHutang({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        tanggal: new Date(),
        tipe: 'Transfer Bank',
        total: '',
        keterangan: '',
        foto_bayar: '',
        kode: route.params.kode
    });

    useEffect(() => {
        getData('user').then(u => setKirim({
            ...kirim,
            fid_user: u.id
        }));


    }, []);


    const sendServer = () => {
        console.log(kirim);
        setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + 'add_hutang.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                Alert.alert('Catatan Piutang', 'Data berhasil disimpan !')
                console.log(kirim);
                navigation.goBack();
            })
        }, 1200)
    }


    const __getImage = () => {
        launchImageLibrary({
            includeBase64: true,
            quality: 0.3,
        }, response => {
            console.log('All Response = ', response);

            console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 200000) {
                    let source = { uri: response.uri };

                    console.log(`data:${response.type};base64, ${response.base64}`);
                    setKirim({
                        ...kirim,
                        foto_bayar: `data:${response.type};base64, ${response.base64}`
                    })

                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DatePicker
                    style={{ width: '100%' }}
                    date={kirim.tanggal}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            backgroundColor: colors.zavalabs,
                            borderColor: colors.zavalabs,
                            borderRadius: 10,
                            // borderWidth: 1,
                            paddingLeft: 10,
                            color: colors.black,
                            fontSize: 12,
                            fontFamily: fonts.primary[400],

                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setKirim({ ...kirim, tanggal: date })}
                />
                <MyGap jarak={10} />
                <MyInput label="Keterangan" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        keterangan: x
                    })
                }} iconname="create" placeholder="masukan keterangan" multiline />
                <MyGap jarak={10} />
                <MyInput keyboardType="number-pad" label="Jumlah" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        total: x
                    })
                }} placeholder="masukan jumbah piutang" iconname="wallet" />
                <MyGap jarak={10} />



            </ScrollView>
            {!loading && <MyButton onPress={sendServer} title="Tambahkan" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})