import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';

import YoutubePlayer from "react-native-youtube-iframe";
import CountDown from 'react-native-countdown-component';
export default function AATesawal({ navigation, route }) {
    const __renderItem = ({ item, index }) => {
        return (

            <LinearGradient colors={index % 2 != 0 ? [colors.foourty, colors.tertiary] : [colors.tertiary, colors.foourty]}

                start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                style={{
                    borderRadius: 10,
                    marginVertical: 5,
                    elevation: 2,
                    overflow: 'hidden'
                }}
            >
                <YoutubePlayer
                    height={220}
                    play={false}
                    videoId={item.link_video}
                />
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 25
                    }}>{item.judul_video}</Text>
                </View>
            </LinearGradient>

        )
    }

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [nomor, setNomor] = useState(0);
    const [open, setOpen] = useState(false)
    const isFocused = useIsFocused();
    useEffect(() => {



        __getTransaction();


    }, []);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });

        axios.post(apiURL + 'tesawal', {
            fid_subbab: route.params.id
        }).then(res => {

            console.log(res.data);
            setData(res.data);
            setTimeout(() => {
                setOpen(true);
            }, 200)
        })



    };

    const [pilih, setPilih] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    })

    const [skor, setSkor] = useState(0);



    return (






        <LinearGradient colors={[colors.foourty, colors.tertiary]} style={{
            flex: 1,
        }}>

            <Image
                source={require('../../assets/head.png')}
                style={
                    {
                        width: windowWidth,
                        height: 80,

                    }
                }
            />
            <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: windowWidth / 20
                }}>{user.nama_siswa} [ {user.nisn} ] {skor}</Text>

            </TouchableOpacity>


            <View style={{
                flex: 1,
                padding: 10,
            }}>

                <LinearGradient colors={[colors.tertiary, colors.foourty]}

                    start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                    style={{
                        padding: 5,
                        marginVertical: 2,
                    }}
                >
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 25
                    }}>Tes Awal</Text>
                </LinearGradient>
                {open && <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    padding: 5,
                }}>
                    {/* SOAL */}
                    <Text style={{ fontFamily: fonts.secondary[400], fontSize: 14, left: 5, }}>JUMLAH SOAL ADA {data.length}</Text>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.foourty
                    }}>

                        <Text style={{ flex: 1, fontFamily: fonts.secondary[800], fontSize: 20 }}> SOAL NOMOR <Text style={{ backgroundColor: colors.background, color: colors.white, }}>  {data[nomor].nomor}  </Text></Text>
                        <View style={{}}>
                            <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Sisa Waktu : </Text>
                            <CountDown
                                until={60 * 10 + 30}
                                size={15}
                                onFinish={() => alert('Finished')}
                                digitStyle={{ backgroundColor: colors.primary }}
                                digitTxtStyle={{ color: colors.white }}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: 'Menit', s: 'Detik' }}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={{
                            fontFamily: fonts.primary[400], fontSize: 14
                        }}>{data[nomor].soal} </Text>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih.a) {
                                    setPilih({ ...pilih, a: true });
                                    data[nomor].jawaban == 'A' ? setSkor(skor + 1) : setSkor(skor + 0)
                                } else {
                                    setPilih({ ...pilih, a: false });
                                    data[nomor].jawaban == 'A' ? setSkor(skor - 1) : setSkor(skor - 0)
                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>A. </Text>
                            {pilih.a && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].a} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih.b) {
                                    setPilih({ ...pilih, b: true });
                                    data[nomor].jawaban == 'B' ? setSkor(skor + 1) : setSkor(skor + 0)
                                } else {
                                    setPilih({ ...pilih, b: false });
                                    data[nomor].jawaban == 'B' ? setSkor(skor - 1) : setSkor(skor - 0)
                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>B. </Text>
                            {pilih.b && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].b} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih.c) {
                                    setPilih({ ...pilih, c: true });
                                    data[nomor].jawaban == 'C' ? setSkor(skor + 1) : setSkor(skor + 0)
                                } else {
                                    setPilih({ ...pilih, c: false });
                                    data[nomor].jawaban == 'C' ? setSkor(skor - 1) : setSkor(skor - 0)
                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>C. </Text>
                            {pilih.c && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].c} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih.d) {
                                    setPilih({ ...pilih, d: true });
                                    data[nomor].jawaban == 'D' ? setSkor(skor + 1) : setSkor(skor + 0)
                                } else {
                                    setPilih({ ...pilih, d: false });
                                    data[nomor].jawaban == 'D' ? setSkor(skor - 1) : setSkor(skor - 0)
                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>D. </Text>
                            {pilih.d && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].d} </Text>
                        </TouchableOpacity>

                    </View>

                </View>}
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    padding: 2,
                }}>
                    <TouchableOpacity style={{
                        padding: 5,
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: colors.mybutton,
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Icon type='ionicon' name='arrow-back-outline' color={colors.white} size={14} />
                        <Text style={{
                            left: 5,
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: windowWidth / 32
                        }}>Soal Sebelumnya</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 0.8,
                    padding: 2,
                    height: 40,

                }}>
                    <TouchableOpacity style={{
                        padding: 5,
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <Icon type='ionicon' name='stop' color={colors.white} size={15} />
                        <Text style={{
                            left: 5,
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: windowWidth / 32
                        }}>Ragu-ragu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    padding: 2,
                    height: 40,
                }}>
                    <TouchableOpacity style={{
                        padding: 5,
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: colors.mybutton,
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>

                        <Text style={{
                            right: 5,

                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: windowWidth / 32
                        }}>Soal Berikutnya</Text>
                        <Icon type='ionicon' name='arrow-forward' color={colors.white} size={15} />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>




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