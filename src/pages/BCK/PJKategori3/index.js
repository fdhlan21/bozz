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

const MyListTarget = ({ onPress, foto_user = 'https://zavalabs.com/nogambar.jpg', logo, target = null, target_avg = null, nama_lengkap, detail, point = null, uang = null, jenis = null }) => {

    let warnaTarget = colors.hijau;
    let persent = target

    if (persent >= 80 && persent <= 100) {
        warnaTarget = colors.hijau
    } else if (persent >= 50 && persent <= 79) {
        warnaTarget = colors.kuning
    } else if (persent >= 0 && persent <= 49) {
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

                    padding: 7,
                    justifyContent: 'center'
                }}>
                    <Image style={{
                        width: 50,
                        borderRadius: 35,
                        height: 50,
                    }} source={{
                        uri: foto_user
                    }} />

                </View>

                <View style={{
                    flex: 1,
                    padding: 7,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 17,
                        color: colors.primary
                    }}>{nama_lengkap}</Text>

                </View>
                <View style={{
                    flex: 1,
                    padding: 7,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {target != null && <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 25,
                        color: warnaTarget
                    }}>{parseFloat(target).toString().replace(".", ",")}%</Text>}

                </View>
            </TouchableOpacity>
        </>
    )
}




export default function PJKategori3({ navigation, route }) {

    const KATEGORI = route.params.kategori;

    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [nilai, setNilai] = useState(0);
    const [waktu, setWaktu] = useState({
        tanggal_awal: moment().format('YYYY-MM-DD'),
        tanggal_akhir: moment().format('YYYY-MM-DD'),
    });
    const [sisaHari, setSisaHari] = useState(moment(waktu.tanggal_akhir).fromNow(true));
    const [warnaHari, setWarnaHari] = useState(colors.hijau);
    const [warnaKategori, setWarnaKategori] = useState(colors.hijau);


    const _getPJlist = () => {
        getData('user').then(uu => {

            axios.post(apiURL + 'pj_list_pengguna', {
                kategori: route.params.kategori
            }).then(nn => {

                setData(nn.data);

            })



        })

    }



    const __getWaktu = () => {

        axios.post(apiURL + 'get_pj_kategori', {
            kategori: route.params.kategori
        }).then(ni => {

            console.log('PJ Kategori', ni.data)

            let tmpnilai = ni.data.nilai == null ? parseFloat(0) : parseFloat(ni.data.nilai);
            setNilai(tmpnilai);
            if (tmpnilai >= 80 && tmpnilai <= 100) {
                setWarnaKategori(colors.hijau)
            } else if (tmpnilai >= 50 && tmpnilai <= 79) {
                setWarnaKategori(colors.kuning)
            } else if (tmpnilai >= 0 && tmpnilai <= 49) {
                setWarnaKategori(colors.merah)
            }







        })

        axios.post(apiURL + 'waktu').then(res => {

            setWaktu(res.data);
            setSisaHari(moment(res.data.tanggal_akhir).fromNow(true));
            let hari = parseInt(moment(res.data.tanggal_akhir).fromNow(true).split(" ")[0]);

            if (hari >= res.data.hijau_min && hari <= res.data.hijau_max) {
                setWarnaHari(colors.hijau);
            } else if (hari >= res.data.kuning_min && hari <= res.data.kuning_max) {
                setWarnaHari(colors.kuning);
            } else if (hari >= res.data.merah_min && hari <= res.data.merah_max) {
                setWarnaHari(colors.merah);
            }
            setLoading(false);

        })

    }

    const [ikhlas, setIkhlas] = useState([]);


    useEffect(() => {

        if (isFocused) {
            _getPJlist();
            __getWaktu();

        }

    }, [isFocused]);





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
                }}>{KATEGORI}</Text>

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
                            color: warnaKategori
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
                            color: warnaHari
                        }}>{loading ? '0' : sisaHari.toString().split(" ")[0]}</Text></Text>
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
                    }}>Persentase Tanggung Jawab</Text>


                    {data.map((item, index) => {
                        return (
                            <MyListTarget foto_user={item.foto_user} nama_lengkap={item.nama_lengkap} target={item.nilai} />
                        )

                    })}






                </View>
            </ScrollView>



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