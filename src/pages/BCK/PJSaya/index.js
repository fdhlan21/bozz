import { Alert, StyleSheet, Text, View, Image, Modal, FlatList, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
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

const MyListTarget = ({ onPress, kategori, logo, target = null, target_avg = null, judul, detail, point = null, uang = null, jenis = null }) => {

    let warnaTarget = colors.hijau;
    let persent = target

    if (persent >= 80 && persent <= 100) {
        warnaTarget = colors.hijau
    } else if (persent >= 50 && persent < 80) {
        warnaTarget = colors.kuning
    } else if (persent >= 0 && persent < 50) {
        warnaTarget = colors.merah
    }




    return (
        <>
            {/* RnV */}

            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row', marginHorizontal: '7%', marginVertical: '1%', borderRadius: 10, backgroundColor: colors.white,
                borderWidth: 4,
                borderColor: colors.primary,
            }}>


                <View style={{
                    flex: 0.4,
                    padding: 7,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {target != null && <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 25,
                        color: warnaTarget
                    }}>{target.toString().replace(".", ",")}%</Text>}

                </View>
                <View style={{
                    flex: 1,
                    padding: 7,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15,
                        color: colors.primary
                    }}>{judul}</Text>

                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                }}>
                    <Icon type='ionicon' name='chevron-forward' color={colors.primary} size={25} />
                </View>
            </TouchableOpacity>
        </>
    )
}

const MyListTargetAmanah = ({ onPress, kategori, tanggal, target = null, target_avg = null, judul, detail, point = null, uang = null, jenis = null }) => {

    let warnaTarget = colors.hijau;
    let persent = target

    if (persent >= 80 && persent <= 100) {
        warnaTarget = colors.hijau
    } else if (persent >= 50 && persent < 80) {
        warnaTarget = colors.kuning
    } else if (persent >= 0 && persent < 50) {
        warnaTarget = colors.merah
    }




    return (
        <>
            {/* RnV */}

            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row', marginHorizontal: '7%', marginVertical: '1%', borderRadius: 10, backgroundColor: colors.white,
                borderWidth: 4,
                borderColor: colors.primary,
            }}>


                <View style={{
                    flex: 0.4,
                    padding: 7,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {target != null && <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 25,
                        color: warnaTarget
                    }}>{target.toString().replace(".", ",")}%</Text>}

                </View>
                <View style={{
                    flex: 1,
                    padding: 7,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15,
                        color: colors.primary
                    }}>{judul}</Text>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 13,
                        color: colors.hijau
                    }}>{tanggal}</Text>

                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                }}>
                    <Icon type='ionicon' name='chevron-forward' color={colors.primary} size={25} />
                </View>
            </TouchableOpacity>
        </>
    )
}

const MyListTargetIkhlas = ({ onPress, kategori, tanggal, target = null, target_avg = null, judul, detail, point = null, uang = null, jenis = null }) => {

    let warnaTarget = colors.hijau;
    let persent = target

    if (persent >= 80 && persent <= 100) {
        warnaTarget = colors.hijau
    } else if (persent >= 50 && persent < 80) {
        warnaTarget = colors.kuning
    } else if (persent >= 0 && persent < 50) {
        warnaTarget = colors.merah
    }




    return (
        <>
            {/* RnV */}

            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row', marginHorizontal: '7%', marginVertical: '1%', borderRadius: 10, backgroundColor: colors.white,
                borderWidth: 4,
                borderColor: colors.primary,
            }}>



                <View style={{
                    flex: 1,
                    padding: 7,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15,
                        color: colors.primary
                    }}>{judul}</Text>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 13,
                        color: colors.hijau
                    }}>{tanggal}</Text>

                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                }}>
                    <Icon type='ionicon' name='chevron-forward' color={colors.primary} size={25} />
                </View>
            </TouchableOpacity>
        </>
    )
}


export default function PJSaya({ navigation }) {


    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [nilai, setNilai] = useState(0);
    const [waktu, setWaktu] = useState({
        tanggal_awal: moment().format('YYYY-MM-DD'),
        tanggal_aakhir: moment().format('YYYY-MM-DD'),
    });


    const [warnaPJ, setWarnaPJ] = useState(colors.white);

    const _getPJlist = () => {
        getData('user').then(uu => {

            axios.post(apiURL + 'get_pj_saya', {
                fid_user: uu.id
            }).then(nn => {
                console.log('nilai', nn.data)


                let persent = parseFloat(nn.data.nilai)

                if (persent >= 80 && persent <= 100) {
                    setWarnaPJ(colors.hijau)
                } else if (persent >= 50 && persent < 80) {
                    setWarnaPJ(colors.kuning)
                } else if (persent >= 0 && persent < 50) {
                    setWarnaPJ(colors.merah)
                }

                setNilai(parseFloat(nn.data.nilai))
            })

            axios.post(apiURL + 'pj_list', {
                fid_user: uu.id
            }).then(res => {

                const TJB = res.data.filter(i => i.jenis.toLowerCase().indexOf('Tanggung Jawab'.toLowerCase()) > -1);
                const AMH = res.data.filter(i => i.jenis.toLowerCase().indexOf('Amanah'.toLowerCase()) > -1);

                setData(TJB);
                setData2(AMH);
            })

        })

    }

    const __getIkhlas = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'pj_ikhlas', {
                fid_user: uu.id
            }).then(res => {

                setIkhlas(res.data);

            })

        })
    }

    const __getWaktu = () => {

        axios.post(apiURL + 'waktu').then(res => {

            setWaktu(res.data);

            setLoading(false);

        })

    }

    const [ikhlas, setIkhlas] = useState([]);


    useEffect(() => {

        if (isFocused) {
            __getTransaction();
            __getIkhlas();
            __getWaktu();
            _getPJlist();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });

    }



    return (






        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>





            {/* header */}
            <MyHeader img={user.foto_user} user={user.nama_lengkap} onPress={() => setModalVisible(true)} />
            <View style={{
                marginHorizontal: '7%'
            }}>
                <Text style={{

                    fontFamily: fonts.primary.normal,
                    color: colors.primary,
                    fontSize: 40,
                    marginBottom: 10,
                }}>PJ Saya</Text>

                <View style={{
                    backgroundColor: colors.border,
                    // padding: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    borderRadius: 10,
                }}>
                    <View style={{
                        flex: 1,
                        borderRightWidth: 5,
                        borderRightColor: colors.primary,
                        padding: 10,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary.normal,
                            fontSize: 15,
                            color: colors.primary
                        }}>Pertanggung Jawaban</Text>
                        <Text style={{
                            fontFamily: fonts.primary.normal,
                            fontSize: 15,
                            color: colors.primary
                        }}><Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 35,
                            color: warnaPJ
                        }}>{nilai.toString().replace(".", ",")}%</Text></Text>
                    </View>
                    <View style={{
                        flex: 0.4,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary.normal,
                            fontSize: 15,
                            color: colors.primary
                        }}>Sisa Hari</Text>
                        <Text style={{
                            fontFamily: fonts.primary.normal,
                            fontSize: 15,
                            color: colors.primary
                        }}><Text style={{
                            fontFamily: fonts.primary[800],
                            fontSize: 35,
                            color: colors.primary
                        }}>{loading ? '0' : moment(waktu.tanggal_akhir).fromNow(true).toString().split(" ")[0]}</Text></Text>
                    </View>
                </View>
            </View>




            <ScrollView>
                <View style={{
                    flex: 1,
                    marginTop: 10,
                }}>
                    <Text style={{
                        marginHorizontal: '7%',
                        marginTop: '1%',
                        fontFamily: fonts.primary.normal,
                        fontSize: 20,
                    }}>Daftar Tanggung Jawab</Text>


                    {data.map((item, index) => {
                        return (
                            <MyListTarget onPress={() => navigation.navigate('PJSayaDetail', item)} judul={item.judul} target={item.nilai} />
                        )

                    })}



                    <Text style={{
                        marginHorizontal: '7%',
                        marginTop: '1%',
                        fontFamily: fonts.primary.normal,
                        fontSize: 20,
                    }}>Penyelesaian Amanah</Text>

                    {data2.map((item, index) => {
                        return (
                            <MyListTargetAmanah onPress={() => navigation.navigate('PJSayaDetailAmanah', item)} judul={item.judul} target={item.nilai} tanggal={moment(item.tanggal).format('DD/MM/YYYY')} />
                        )

                    })}




                    <Text style={{
                        marginHorizontal: '7%',
                        marginTop: '1%',
                        fontFamily: fonts.primary.normal,
                        fontSize: 20,
                    }}>Penyelesaian Ikhlas</Text>



                    {ikhlas.map(item => {
                        return (
                            <MyListTargetIkhlas onPress={() => navigation.navigate('PJSayaDetailIkhlas', item)} judul={item.deskripsi_sebelum} tanggal={moment(item.tanggal).format('DD/MM/YYYY')} />
                        )
                    })}

                    <TouchableOpacity onPress={() => navigation.navigate('PJSayaIkhlasAdd', user)} style={{

                        borderColor: colors.primary,
                        backgroundColor: colors.primary,
                        padding: 10,
                        marginHorizontal: '7%',
                        alignItems: 'center',
                        marginTop: '1%',
                        borderRadius: 10,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            width: 30,
                            height: 30,
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                        }}>
                            <Icon type='ionicon' name='add' color={colors.primary} />
                        </View>
                        <Text style={{
                            left: 20,
                            fontFamily: fonts.primary.normal,
                            color: colors.white,
                            fontSize: 18,
                        }}>Tambah Ikhlas</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>


            <Modal
                animationInTiming={1000}
                animationIn="slideInRight"
                animationOut="SlideOitRight"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <MyMenu />
            </Modal>
            {/* menu */}

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