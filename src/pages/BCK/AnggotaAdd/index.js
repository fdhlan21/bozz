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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
export default function AnggotaAdd({ navigation, route }) {


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
                                foto_ktp: `data:${response.type};base64, ${response.base64}`,
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

    const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    elevation: 2,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>
                <Image
                    source={{
                        uri: !foto ? 'https://zavalabs.com/nogambar.jpg' : foto,
                    }}
                    style={{
                        width: '50%',
                        alignSelf: 'center',
                        aspectRatio: 2,
                        resizeMode: 'contain',
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                    }}>

                    <View
                        style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                        <MyButton
                            onPress={onPress2}
                            title="GALLERY"
                            colorText={colors.primary}
                            warna={colors.secondary}
                        />
                    </View>
                </View>
            </View>
        );
    };


    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        nik: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: 'Laki-laki',
        gol_darah: '',
        agama: '',
        alamat: '',
        rt_rw: '',
        kel_desa: '',
        kecamatan: '',
        status_perkawinan: 'Kawin',
        pekerjaan: '',
        kewarganegaraan: '',
        foto_ktp: '',
        foto_profile: '',

    });


    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        axios.post(apiURL + 'insert_anggota', kirim).then(res => {
            setLoading(false);
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





                <MyInput iconname='create' label='NIK' onChangeText={x => { setKirim({ ...kirim, nik: x }) }} />
                <MyInput iconname='create' label='Nama Lengkap' onChangeText={x => { setKirim({ ...kirim, nama_lengkap: x }) }} />
                <MyInput iconname='create' label='Tempat Lahir' onChangeText={x => { setKirim({ ...kirim, tempat_lahir: x }) }} />
                <MyInput value={kirim.tanggal_lahir} keyboardType='number-pad' maxLength={10} iconname='create' label='Tanggal lahir* contoh : 29/04/1995' onChangeText={x => {
                    // console.log()
                    setKirim({
                        ...kirim,

                        tanggal_lahir: maskJs('99/99/9999', x)

                    })
                }} />
                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, jenis_kelamin: x })} label="Jenis Kelamin" data={[
                    { label: 'Laki-laki', value: 'Laki-laki', },
                    { label: 'Perempuan', value: 'Perempuan', },
                ]} />

                <MyInput iconname='create' label='Gol. Darah' onChangeText={x => { setKirim({ ...kirim, gol_darah: x }) }} />
                <MyInput iconname='create' label='Agama' onChangeText={x => { setKirim({ ...kirim, agama: x }) }} />
                <MyInput iconname='create' label='Alamat' onChangeText={x => { setKirim({ ...kirim, alamat: x }) }} />
                <MyInput iconname='create' label='RT/RW' onChangeText={x => { setKirim({ ...kirim, rt_rw: x }) }} />
                <MyInput iconname='create' label='Kel/Desa' onChangeText={x => { setKirim({ ...kirim, kel_desa: x }) }} />
                <MyInput iconname='create' label='Kecamatan' onChangeText={x => { setKirim({ ...kirim, kecamatan: x }) }} />



                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, status_perkawinan: x })} label="Status Perkawinan" data={[
                    { label: 'Kawin', value: 'Kawin', },
                    { label: 'Tidak Kawin', value: 'Tidak Kawin', },
                ]} />

                <MyInput iconname='create' label='Pekerjaan' onChangeText={x => { setKirim({ ...kirim, pekerjaan: x }) }} />
                <MyInput iconname='create' label='Kewarganegaraan' onChangeText={x => { setKirim({ ...kirim, kewarganegaraan: x }) }} />
                {/* <MyInput iconname='create' label='Foto KTP' onChangeText={x => { setKirim({ ...kirim, foto_ktp: x }) }} />
                <MyInput iconname='create' label='Foto Profile' onChangeText={x => { setKirim({ ...kirim, foto_profile: x }) }} /> */}

                <UploadFoto onPress2={() => getGallery(1)} foto={kirim.foto_ktp} label="Upload foto KTP" />
                <UploadFoto onPress2={() => getGallery(2)} foto={kirim.foto_profile} label="Upload foto Profile" />
            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})