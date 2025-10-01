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
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar, webPDF } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util'

export default function MenuDownload({ navigation, route }) {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);

    const [kirim, setKirim] = useState({
        pesan: '',

    });

    const sendServer = () => {
        console.log(kirim);
        axios.post(apiURL + 'testimoni_add', kirim).then(res => {
            console.log(res.data);
            __getTransaction();
            Alert.alert(MYAPP, 'Testimoni berhasil di kirim !');
            setKirim({
                ...kirim,
                pesan: ''
            })
        })
    }

    const __getTransaction = () => {
        axios.post(apiURL + 'testimoni').then(res => {
            console.log(res.data);
            setData(res.data);

        })
    }

    const __downloadPDF = (x, fileName) => {

        let fileUrl = webPDF + x;
        let dirs = ReactNativeBlobUtil.fs.dirs;
        ReactNativeBlobUtil
            .config({

                fileCache: true,
                appendExt: 'pdf',
                path: `${dirs.DocumentDir}/${fileName}.pdf`,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    title: fileName,
                    description: 'File downloaded by download manager.',
                    mime: 'application/pdf',
                },
            })
            .fetch('GET', fileUrl, {
                //some headers ..
            })
            .then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                Alert.alert(MYAPP, `${fileName} berhasil di downlolad`)
                console.log('The file saved to ', res.path())
            })


    }

    useEffect(() => {


        if (isFocused) {
            __getTransaction();
            getData('user').then(res => {

                setOpen(true);
                setKirim({
                    ...kirim,
                    fid_user: res.id
                })
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: '#8E99A2',
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 5,
                height: 80,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 5,
                }}>
                    <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,

                    color: colors.black
                }}>KIKEN YOCHI TRAINING</Text>
            </View>

            <View style={{
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: colors.tertiary,
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                    textAlign: 'center',
                    color: colors.secondary
                }}>TATA CARA MENGERJAKAN KUIS TUGAS :</Text>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>1. </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>Berdo’alah terlebih dahulu sebelum mengerjakan tugas.</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>2. </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>Pilih menu Download Formulir A, B & C untuk mengetahui tugas-tugas yang harus diselesaikan.</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>3. </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>
                        Selanjutnya kerjakan tugas sesuai penjelasan berikut :{'\n'}
                        Formulir A : Identifikasi Bahaya, Pengendalian dan Penilaian Resiko K3{'\n'}
                        Formulir B : Kiken Yochi Training (KYT) / Latihan Menduga Bahaya{'\n'}
                        Formulir C : Membuat video aksi Kiken Yochi Training (KYT)

                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>4. </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>
                        Setelah semua tugas dapat diselesaikan maka berkas dan hasil video dikumpulkan kepada Instruktur untuk dilakukan diskusi/kajian bersama.
                    </Text>
                </View>

            </View>

            <View style={{
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: colors.tertiary,
                padding: 10,
                flexDirection: 'row'
            }}>

                <View>
                    <Image source={require('../../assets/cara.png')} style={{
                        width: 100,
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>
                <View style={{
                    padding: 10,
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 14,
                        textAlign: 'center',
                        color: colors.secondary
                    }}>DOWNLOAD FORMULIR :</Text>
                    <TouchableOpacity onPress={() => __downloadPDF('f1.pdf', 'FORMULIR_A')} style={{
                        marginVertical: 10,
                        backgroundColor: colors.secondary,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.secondary[800],
                                fontSize: 15,
                            }}>Formulir A</Text>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                            }}>Formulir Identifikasi Bahaya, Pengendalian dan Penilaian Resiko K3</Text>
                        </View>
                        <Icon type='ionicon' name='download-outline' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => __downloadPDF('f2.pdf', 'FORMULIR_B')} style={{
                        marginVertical: 10,
                        backgroundColor: colors.secondary,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.secondary[800],
                                fontSize: 15,
                            }}>Formulir B</Text>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                            }}>Formulir Kiken Yochi Training (KYT)</Text>
                        </View>
                        <Icon type='ionicon' name='download-outline' />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => __downloadPDF('f3.pdf', 'FORMULIR_C')} style={{
                        marginVertical: 10,
                        backgroundColor: colors.secondary,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.secondary[800],
                                fontSize: 15,
                            }}>Formulir C</Text>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                            }}>Tugas Membuat Konten Video Pembelajaran Aksi Kiken Yochi Training (KYT)</Text>
                        </View>
                        <Icon type='ionicon' name='download-outline' />

                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
