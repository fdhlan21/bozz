import { Alert, StyleSheet, Text, View, Image, Modal, FlatList, ActivityIndicator, Dimensions, ImageBackground, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'moment/locale/id';
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';
import MyMenu from '../../components/MyMenu';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function PJSayaAdd({ navigation, route }) {


    const [modalVisible, setModalVisible] = useState(false);
    const [header, setHeader] = useState(route.params);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Izinkan untuk akses kamera",
                    message: "Diperlukan izin akses untuk membuka kamera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };



    const options = {
        includeBase64: true,
        quality: 0.5,
        maxWidth: 400
    };

    const sendServer = () => {
        console.log(kirim);
        setLoading(true);
        axios.post(apiURL + 'pj_add', kirim).then(res => {
            setLoading(false);
            navigation.goBack();
            console.log(res.data);
            Alert.alert(MYAPP, res.data.message);
        })
    }


    const [kirim, setKirim] = useState({
        fid_pjdaftar: route.params.id,
        deskripsi: '',
        foto_pjdetail: 'https://zavalabs.com/nogambar.jpg',
    });
    const getGallery = xyz => {
        launchCamera(options, response => {
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
                                foto_pjdetail: `data:${response.type};base64, ${response.base64}`,
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




    useEffect(() => {
        requestCameraPermission();
        if (isFocused) {

            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
            setKirim({
                ...kirim,
                fid_user: res.id
            })
        });

    }



    return (






        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>





            {/* header */}
            <MyHeader />
            <View style={{
                marginHorizontal: '7%'
            }}>
                <Text style={{

                    fontFamily: fonts.primary.normal,
                    color: colors.primary,
                    fontSize: 20,
                    marginBottom: 10,
                }}>{header.judul}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <Icon type='ionicon' name='file-tray-stacked-outline' color={colors.primary} size={20} />
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        color: colors.primary,
                        fontSize: 15,
                        left: 10,
                    }}>Penyelesaian Tanggung Jawab</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <MyGap jarak={10} />
                    <MyInput label="Deskripsi" autoFocus={true} value={kirim.deskripsi} onChangeText={x => setKirim({
                        ...kirim,
                        deskripsi: x
                    })} multiline iconname="create-outline" placeholder="Masukan deskripsi" />
                    <MyGap jarak={10} />
                    <MyInput label="Tanggal" iconname="calendar-outline" value={moment().format('dddd, DD MMMM YYYY ; HH:mm:ss')} />
                    <MyGap jarak={10} />
                    <TouchableOpacity onPress={() => getGallery(1)} style={{
                        width: '100%',
                        height: 250,
                        padding: 10,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: colors.border
                    }}>
                        {kirim.foto_pjdetail !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                            uri: kirim.foto_pjdetail
                        }} style={{
                            width: '100%',
                            height: 230,
                            borderRadius: 10,
                        }} />}
                        {kirim.foto_pjdetail == 'https://zavalabs.com/nogambar.jpg' && <Image source={require('../../assets/camera.png')} style={{
                            width: 40,
                            height: 40,
                        }} />}
                    </TouchableOpacity>
                    <MyGap jarak={20} />
                    {loading && <ActivityIndicator color={colors.primary} size="large" />}

                    {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan" Icons="download-outline" />}
                </ScrollView>




            </View>



        </SafeAreaView >


    )






}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});