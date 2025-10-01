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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
export default function AktifitasAdd({ navigation, route }) {


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
                                foto: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                        case 2:
                            setKirim({
                                ...kirim,
                                foto: `data:${response.type};base64, ${response.base64}`,
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
    const [show, setShow] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: new Date(),
        tanggal_show: moment().format('LL'),
        tanggal_set: new Date(),
        lokasi: '',
        aktifitas: '',
        keterangan: '',
        foto: ''


    });


    // setLoading(false);

    const sendServer = () => {
        // console.log(kirim);
        setLoading(true);

        axios.post(apiURL + 'aktifitas_add', kirim).then(res => {
            setLoading(false);
            setKirim({
                tanggal: kirim.tanggal,
                tanggal_show: kirim.tanggal_show,
                tanggal_set: new Date(),
                lokasi: '',
                aktifitas: '',
                keterangan: '',
                foto: ''
            })
            console.log(res.data);
            if (res.data == 200) {
                Alert.alert(MYAPP, 'Data berhasil di simpan !');
                // navigation.goBack();

            }
        })
    }

    const [region, setRegion] = useState([]);

    useEffect(() => {

        getData('user').then(res => {
            setKirim({
                ...kirim,
                fid_user: res.id
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



                {show && <DateTimePicker
                    testID="dateTimePicker"
                    value={kirim.tanggal_set}
                    mode="date"

                    onChange={(event, selectedDate) => {
                        moment.locale('fr');
                        setShow(false)
                        console.log(event.type)
                        console.log(moment(event.nativeEvent.timestamp).format('YYYY-MM-DD'));

                        if (event.type == "set") {
                            setKirim({
                                ...kirim,
                                tanggal: moment(event.nativeEvent.timestamp).format('YYYY-MM-DD'),
                                tanggal_set: event.nativeEvent.timestamp,
                                tanggal_show: moment(event.nativeEvent.timestamp).format('LL', 'id')
                            });

                        } else {
                            setKirim({
                                ...kirim,
                                tanggal_set: new Date(),
                                tanggal: moment(new Date()).format('YYYY-MM-DD'),
                                tanggal_show: moment(new Date()).format('LL', 'id')
                            });

                        }


                    }}
                />}


                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyInput
                            editable={false}
                            value={kirim.tanggal_show}
                            // onFocus={() => setShow(true)}
                            // onBlur={() => setShow(false)}
                            placeholder="Tanggal"
                            label="Tanggal"
                            iconname="calendar"

                        />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 25,
                    }}>
                        <TouchableOpacity onPress={() => setShow(true)} style={{
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            marginLeft: 10,
                        }}>
                            <Icon type='ionicon' name='calendar' color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                <MyGap jarak={10} />
                <MyInput label="Keterangan" value={kirim.keterangan} iconname="create" onChangeText={x => setKirim({ ...kirim, keterangan: x })} />




            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="Checkin Sekarang" warna={colors.primary} Icons="log-in-outline" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})