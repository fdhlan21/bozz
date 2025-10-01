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
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';
import MyMenu from '../../components/MyMenu';

const MyListTarget = ({ onPress, kategori, logo, target = null, target_avg = null, judul, detail, point = null, uang = null, jenis = null,

    rumus,
    hijau_min,
    hijau_max,
    kuning_min,
    kuning_max,
    merah_min,
    merah_max

}) => {

    let warnaTarget = colors.hijau;
    let persent = target_avg;
    if (persent >= hijau_min && persent <= hijau_max) {
        warnaTarget = colors.hijau
    } else if (persent >= kuning_min && persent <= kuning_max) {
        warnaTarget = colors.kuning
    } else if (persent >= merah_min && persent <= merah_max) {
        warnaTarget = colors.merah
    }




    return (
        <>
            {/* RnV */}

            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row', marginHorizontal: '7%', marginVertical: '1%', borderRadius: 10, backgroundColor: colors.white,
                borderWidth: 2,
            }}>


                <View style={{
                    flex: 0.5,
                    padding: 7,
                    justifyContent: 'center',


                }}>
                    {target_avg != null && jenis == '%' && <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 25,
                        color: warnaTarget
                    }}>{target_avg.toString().replace(".", ",")}%</Text>}
                    {target_avg != null && jenis == 'Jumlah' && <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 25,
                        color: target == 0 && target_avg == 0 ? colors.merah : warnaTarget
                    }}>{target_avg.toString().replace(".", ",")}</Text>}
                    {target_avg != null && jenis == 'Rp' &&

                        <View>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 25,
                                color: warnaTarget
                            }}>{(target_avg / 1000000).toFixed(2).toString().replace(".", ",")} JT</Text>
                            <Text style={{
                                fontFamily: fonts.primary[400],
                                fontSize: 10,
                                color: warnaTarget
                            }}>Rp. {new Intl.NumberFormat().format(target_avg)}</Text>
                        </View>

                    }
                </View>
                <View style={{
                    flex: 1,
                    padding: 7,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 14,
                        color: colors.primary
                    }}>{judul}</Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 14,
                        color: colors.primary
                    }}>{detail}</Text>

                </View>
            </TouchableOpacity>
        </>
    )
}


export default function Belgareti({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {

        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });
        axios.post(apiURL + 'target').then(res => {
            console.log('target', res.data);
            setData(res.data);


        })
    }

    const getKategoriData = (mydata, x) => {

        return mydata.filter(i => i.kategori.toLowerCase().indexOf(x.toLowerCase()) > -1);
    }







    return (






        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>




            <View style={{
                top: windowHeight / 2.5,
                position: 'absolute',
                backgroundColor: colors.primary,
                width: 20,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10
            }}>
                <Text style={{ fontFamily: fonts.primary.normal, color: colors.kuning, fontSize: 30, textAlign: 'center' }}>A</Text>
                <Text style={{ fontFamily: fonts.primary.normal, color: colors.kuning, fontSize: 30, textAlign: 'center' }}>J</Text>
                <Text style={{ fontFamily: fonts.primary.normal, color: colors.kuning, fontSize: 30, textAlign: 'center' }}>A</Text>
                <Text style={{ fontFamily: fonts.primary.normal, color: colors.kuning, fontSize: 30, textAlign: 'center' }}>I</Text>
                <Text style={{ fontFamily: fonts.primary.normal, color: colors.kuning, fontSize: 30, textAlign: 'center' }}>B</Text>
            </View>
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
                }}>Belgareti</Text>

                <TouchableOpacity onPress={() => navigation.navigate('TargetAdd')} style={{
                    borderWidth: 2,
                    borderColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        width: 30,
                        height: 30,
                        backgroundColor: colors.secondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                    }}>
                        <Icon type='ionicon' name='add' color={colors.white} />
                    </View>
                    <Text style={{
                        left: 20,
                        fontFamily: fonts.primary[400],
                        color: colors.primary,
                        fontSize: 25,
                    }}>Tambah Target</Text>
                </TouchableOpacity>
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
                    }}>Jayagiri</Text>

                    {
                        getKategoriData(data, 'Jayagiri').map(i => {
                            return (

                                <MyListTarget
                                    rumus={i.rumus}
                                    hijau_min={i.hijau_min}
                                    hijau_max={i.hijau_max}
                                    kuning_min={i.kuning_min}
                                    kuning_max={i.kuning_max}
                                    merah_min={i.merah_min}
                                    merah_max={i.merah_max}

                                    onPress={() => navigation.navigate('TargetDetail', i)} judul={i.judul} detail={i.keterangan} target={i.target} target_avg={i.target_avg} jenis={i.jenis} />
                            )
                        })
                    }

                    <Text style={{
                        marginHorizontal: '7%',
                        marginTop: '1%',
                        fontFamily: fonts.primary.normal,
                        fontSize: 20,
                    }}>Villa</Text>
                    {
                        getKategoriData(data, 'Villa').map(i => {
                            return (

                                <MyListTarget onPress={() => navigation.navigate('TargetDetail', i)} judul={i.judul} detail={i.keterangan}

                                    rumus={i.rumus}
                                    hijau_min={i.hijau_min}
                                    hijau_max={i.hijau_max}
                                    kuning_min={i.kuning_min}
                                    kuning_max={i.kuning_max}
                                    merah_min={i.merah_min}
                                    merah_max={i.merah_max}

                                    target_avg={i.target_avg} jenis={i.jenis} />
                            )
                        })
                    }

                    <Text style={{
                        marginHorizontal: '7%',
                        marginTop: '1%',
                        fontFamily: fonts.primary.normal,
                        fontSize: 20,
                    }}>RnV</Text>
                    {
                        getKategoriData(data, 'RnV').map(i => {
                            return (

                                <MyListTarget
                                    rumus={i.rumus}
                                    hijau_min={i.hijau_min}
                                    hijau_max={i.hijau_max}
                                    kuning_min={i.kuning_min}
                                    kuning_max={i.kuning_max}
                                    merah_min={i.merah_min}
                                    merah_max={i.merah_max}
                                    onPress={() => navigation.navigate('TargetDetail', i)} judul={i.judul} detail={i.keterangan} target={i.target} target_avg={i.target_avg} jenis={i.jenis} />
                            )
                        })
                    }

                    <Text style={{
                        marginHorizontal: '7%',
                        marginTop: '1%',
                        fontFamily: fonts.primary.normal,
                        fontSize: 20,
                    }}>Kebun</Text>
                    {
                        getKategoriData(data, 'Kebun').map(i => {
                            return (

                                <MyListTarget

                                    rumus={i.rumus}
                                    hijau_min={i.hijau_min}
                                    hijau_max={i.hijau_max}
                                    kuning_min={i.kuning_min}
                                    kuning_max={i.kuning_max}
                                    merah_min={i.merah_min}
                                    merah_max={i.merah_max}

                                    onPress={() => navigation.navigate('TargetDetail', i)} judul={i.judul} detail={i.keterangan} target={i.target} target_avg={i.target_avg} jenis={i.jenis} />
                            )
                        })
                    }


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