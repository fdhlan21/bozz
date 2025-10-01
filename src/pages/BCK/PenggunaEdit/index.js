import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyCalendar from '../../components/MyCalendar';

export default function PenggunaEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'pengguna_edit', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                navigation.goBack();
            }
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {


                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 200,
                            maxHeight: 200
                        }, response => {
                            // console.log('All Response = ', response);

                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                        });



                    }} style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: colors.border,
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : kirim.foto_user,
                        }} />
                    </TouchableOpacity>
                </View>

                <MyPicker label="Level" value={kirim.level} onValueChange={x => setKirim({ ...kirim, level: x })} iconname="medal-outline" data={[
                    {
                        value: 'User',
                        label: 'User'
                    },
                    {
                        value: 'Auditor',
                        label: 'Auditor'
                    },
                    {
                        value: 'Admin',
                        label: 'Admin'
                    },

                ]} />
                <MyGap jarak={10} />
                <MyPicker value={kirim.kategori} onValueChange={x => setKirim({
                    ...kirim,
                    kategori: x
                })} iconname='grid-outline' label="Kategori" data={[
                    { label: 'Jayagiri', value: 'Jayagiri' },
                    { label: 'Villa', value: 'Villa' },
                    { label: 'RnV', value: 'RnV' },
                    { label: 'Kebun', value: 'Kebun' },
                ]} />

                <MyGap jarak={10} />
                <MyInput label="Nama Pengguna" iconname="person-outline" placeholder="Masukan nama pengguna" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />

                <MyGap jarak={10} />

                <MyInput label="Username" iconname="at" placeholder="Masukan nama username" value={kirim.username} onChangeText={x => setKirim({ ...kirim, username: x })} />
                <MyGap jarak={10} />
                <MyInput label="Password" iconname="keypad" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, password: x })} placeholder="Masukan password" />
                <MyGap jarak={10} />
                <MyInput label="Jabatan" placeholder="Masukan jabatan" iconname="briefcase-outline" value={kirim.jabatan} onChangeText={x => setKirim({ ...kirim, jabatan: x })} />
                <MyGap jarak={10} />
                <MyInput label="Email" placeholder="Masukan email" iconname="mail-outline" value={kirim.email} onChangeText={x => setKirim({ ...kirim, email: x })} />

                <MyGap jarak={10} />
                <MyInput label="No. Handphone" keyboardType="phone-pad" placeholder="Masukan No. Handphone" iconname="logo-whatsapp" value={kirim.telepon} onChangeText={x => setKirim({ ...kirim, telepon: x })} />
                <MyGap jarak={10} />
                <MyPicker label="Jenis Kelamin" value={kirim.jenis_kelamin} onValueChange={x => setKirim({ ...kirim, jenis_kelamin: x })} iconname="male-female-outline" data={[
                    {
                        value: 'Laki-laki',
                        label: 'Laki-laki'
                    },
                    {
                        value: 'Perempuan',
                        label: 'Perempuan'
                    },


                ]} />
                <MyGap jarak={10} />
                <MyInput label="Tempat Lahir" placeholder="Masukan tempat lahir" iconname="home-outline" value={kirim.tempat_lahir} onChangeText={x => setKirim({ ...kirim, tempat_lahir: x })} />
                <MyGap jarak={10} />
                <MyCalendar value={kirim.tanggal_lahir} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })
                }} label="Tanggal Lahir" iconname="calendar-outline" placeholder="Pilih tanggal lahir" />

                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})