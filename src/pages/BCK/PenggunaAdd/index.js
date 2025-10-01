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
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import MyCalendar from '../../components/MyCalendar';
export default function PenggunaAdd({ navigation, route }) {

    const options = {
        includeBase64: true,
        quality: 1,
    };

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            // console.log('All Response = ', response);

            // console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 2000000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setKirim({
                                ...kirim,
                                foto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                        case 2:
                            setKirim({
                                ...kirim,
                                foto_profile: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };


    const [kirim, setKirim] = useState({
        username: '',
        password: '',
        nama_lengkap: '',
        telepon: '',
        email: '',
        foto_user: 'https://zavalabs.com/nogambar.jpg',
        level: 'User',
        jabatan: '',
        kategori: 'Jayagiri',
        jenis_kelamin: 'Laki-laki',
        tanggal_lahir: moment().format('YYYY-MM-DD')
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'pengguna_add', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data);

                navigation.goBack();
            } else {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            }
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
            paddingTop: 20,
        }}>
            <ScrollView showsVerticalScrollIndicator={false} >

                <View style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>
                    <View style={{
                        // flex: 1,
                        paddingRight: 5,
                    }}>

                        <TouchableOpacity onPress={() => getGallery(1)} style={{
                            width: 100,
                            height: 100,
                            padding: 10,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: colors.border
                        }}>
                            {kirim.foto_user !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                                uri: kirim.foto_user
                            }} style={{
                                width: 100,
                                height: 100,
                            }} />}
                            {kirim.foto_user == 'https://zavalabs.com/nogambar.jpg' && <Image source={require('../../assets/camera.png')} style={{
                                width: 40,
                                height: 40,
                            }} />}
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
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
                    </View>
                </View>
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

                {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})