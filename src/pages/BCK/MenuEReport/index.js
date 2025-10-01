import React, { useEffect, useRef, useState } from 'react';
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
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
export default function EReport({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {

                axios.post(apiURL + 'update_info', {
                    id: res.id
                }).then(uu => {
                    setOpen(true);
                    setUser(uu.data);
                })



            });
        }




    }, [isFocused]);




    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
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

    const MyList2 = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.zavalabs,
                    flexDirection: 'row',
                    backgroundColor: colors.zavalabs,
                    alignItems: 'center'
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.white,
                        fontSize: 12,
                        flex: 1,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        backgroundColor: colors.primary,
                        fontFamily: fonts.primary[800],
                        color: colors.white,
                        paddingHorizontal: 10,
                        fontSize: 15
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F4F6FF'
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}


            {open &&
                <>
                    <View>
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
                            }}>E - REPORT</Text>

                        </View>
                        <ViewShot ref={ref} options={{ fileName: "Ereport", format: "jpg", quality: 0.9 }}>

                            <View style={{
                                marginHorizontal: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                                backgroundColor: colors.primary,
                            }}>
                                <View>
                                    <Image source={require('../../assets/piksi.png')} style={{
                                        width: 50,
                                        height: 50,
                                    }} />
                                </View>
                                <Text style={{
                                    flex: 1,
                                    marginLeft: 10,
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: colors.white,
                                    fontFamily: fonts.secondary[600]
                                }}>E-Report Hasil Pembelajaran Budaya K3</Text>
                            </View>

                            <View style={{
                                backgroundColor: colors.white,
                                margin: 10,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1
                                }}>

                                    <View style={{ padding: 10, }}>

                                        <Image source={
                                            {
                                                uri: user.foto_user
                                            }
                                        } style={{
                                            width: 80,
                                            height: 80,
                                            alignSelf: 'center',
                                            borderRadius: 40,
                                            marginBottom: 10,
                                        }} />
                                        <MyList label="Nama Lengkap" value={user.nama_lengkap} />
                                        <MyList label="NIK/NIS/NIM/NIDN" value={user.nik} />

                                        <MyList label="Tempat, Tanggal/Lahir" value={user.tempat_lahir + ', ' + moment(user.tanggal_lahir).format('DD MMMM YYYY')} />
                                        <MyList label="Status/Jabata" value={user.jabatan} />
                                        <MyList label="Instansi/Perusahaan" value={user.instansi} />



                                    </View>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>

                                    <View style={{ padding: 10, flex: 1, justifyContent: 'space-around' }}>

                                        <MyList2 label="DASAR-DASAR K3" value={parseFloat(user.nilai1).toFixed(2)} />
                                        <MyList2 label="ALAT PELINDUNG DIRI" value={parseFloat(user.nilai2).toFixed(2)} />
                                        <MyList2 label="RAMBU-RAMBU K3" value={parseFloat(user.nilai3).toFixed(2)} />
                                        <MyList2 label="5R" value={parseFloat(user.nilai4).toFixed(2)} />
                                        <MyList2 label="TOTAL NILAI" value={(parseFloat(user.nilai1) + parseFloat(user.nilai2) + parseFloat(user.nilai3) + parseFloat(user.nilai4)).toFixed(2)} />
                                        <MyList2 label="NILAI RATA-RATA" value={((parseFloat(user.nilai1) + parseFloat(user.nilai2) + parseFloat(user.nilai3) + parseFloat(user.nilai4)) / 4).toFixed(2)} />



                                    </View>


                                </View>


                            </View>
                            <View style={{
                                padding: 5,
                                marginHorizontal: 10,
                                borderWidth: 1,
                                flexDirection: 'row',
                                backgroundColor: colors.white

                            }}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        fontFamily: fonts.secondary[600]
                                    }}>Instruktur</Text>
                                    <Text style={{
                                        marginTop: 40,
                                        fontSize: 12,
                                        fontFamily: fonts.secondary[600]
                                    }}>(____________)</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        fontFamily: fonts.secondary[600]
                                    }}>Peserta</Text>
                                    <Text style={{
                                        marginTop: 40,
                                        fontSize: 12,
                                        fontFamily: fonts.secondary[600]
                                    }}>({user.nama_lengkap})</Text>
                                </View>
                            </View>
                        </ViewShot>
                        <View style={{
                            padding: 20,
                        }}>
                            <MyButton onPress={() => {
                                ref.current.capture().then(uri => {
                                    console.log("do something with ", uri);
                                    Share.open({
                                        url: uri
                                    })
                                        .then((res) => {
                                            console.log(res);
                                        })
                                        .catch((err) => {
                                            err && console.log(err);
                                        });
                                });
                            }} title="Download E-REPORT" warna={colors.secondary} />
                        </View>

                    </View>

                </>
            }

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
