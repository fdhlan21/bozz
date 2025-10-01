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
import DatePicker from 'react-native-datepicker'
import CurrencyInput from 'react-native-currency-input';

const MyListTarget = ({ onDelete, onPress, kategori, logo, target = null, target_avg = null, judul, detail, point = null, uang = null, jenis = null,

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

            <View onPress={onPress} style={{
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
                <TouchableOpacity onPress={onDelete} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingHorizontal: 5,
                }}>
                    <Icon type='ionicon' name='trash' color={colors.danger} />
                </TouchableOpacity>
            </View>
        </>
    )
}




export default function TargetDetail({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAdd, setModalAdd] = useState(false)
    const [user, setUser] = useState({});
    const [header, setHeader] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();

    const MyListTargetDetail = ({ onPress, kategori, logo, capaian = null, target_avg = null, judul, detail, point = null, uang = null, jenis = null, onDelete }) => {

        let warnaTarget = colors.hijau;
        if (capaian >= header.hijau_min && capaian <= header.hijau_max) {
            warnaTarget = colors.hijau
        } else if (capaian >= header.kuning_min && capaian <= header.kuning_max) {
            warnaTarget = colors.kuning
        } else if (capaian >= header.merah_min && capaian <= header.merah_max) {
            warnaTarget = colors.merah
        }



        return (
            <>


                <TouchableOpacity onPress={onPress} style={{
                    flexDirection: 'row', marginHorizontal: '7%', marginVertical: '1%', borderRadius: 10, backgroundColor: colors.white,
                    borderWidth: 2,
                }}>


                    <View style={{
                        flex: 0.5,
                        padding: 7,
                        justifyContent: 'center',


                    }}>
                        {capaian != null && jenis == '%' && <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 25,
                            color: warnaTarget
                        }}>{capaian.toString().replace(".", ",")}%</Text>}
                        {capaian != null && jenis == 'Jumlah' && <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 25,
                            color: warnaTarget
                        }}>{capaian.toString().replace(".", ",")}</Text>}
                        {capaian != null && jenis == 'Rp' && <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 25,
                            color: warnaTarget
                        }}>{(capaian / 1000000).toFixed(2).toString().replace(".", ",")} JT</Text>}
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
                    <TouchableOpacity onPress={onDelete} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        paddingHorizontal: 5,
                    }}>
                        <Icon type='ionicon' name='trash' color={colors.danger} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </>
        )
    }


    useEffect(() => {

        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });
        axios.post(apiURL + 'target_detail', {
            id: route.params.id
        }).then(res => {
            console.log('target header', res.data);
            setHeader(res.data[0]);
        })

        axios.post(apiURL + 'targetd', {
            fid_target: route.params.id
        }).then(res => {
            console.log('target detail', res.data);
            setData(res.data);
            setLoading(false);
        })

    }

    const [kirim, setKirim] = useState({
        fid_target: route.params.id,
        tanggal: moment().format('YYYY-MM-DD'),
        capaian: ''
    });

    const sendServer = () => {
        console.log(kirim);
        axios.post(apiURL + 'target_detail_add', kirim).then(res => {
            console.log(res.data)
            if (res.data.status == 200) {
                showMessage({
                    message: res.data.message,
                    type: 'success'
                });
                setKirim({
                    ...kirim,
                    capaian: '',
                })
                __getTransaction();
                setModalAdd(false)
            }
        })
    }



    const hapusTargetd = (id) => {
        axios.post(apiURL + 'targetd_delete', {
            id: id
        }).then(res => {
            console.log(res.data)
            if (res.data.status == 200) {
                showMessage({
                    message: res.data.message,
                    type: 'success'
                });
                __getTransaction();
            }
        })
    }


    const hapusTarget = (id) => {
        axios.post(apiURL + 'target_delete', {
            id: id
        }).then(res => {
            console.log(res.data)
            if (res.data.status == 200) {
                showMessage({
                    message: res.data.message,
                    type: 'success'
                });
                navigation.goBack();
            }
        })
    }




    return (



        <>
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}


            {!loading && <SafeAreaView style={{
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
                        }}>{header.kategori}</Text>

                        <MyListTarget


                            rumus={header.rumus}
                            hijau_min={header.hijau_min}
                            hijau_max={header.hijau_max}
                            kuning_min={header.kuning_min}
                            kuning_max={header.kuning_max}
                            merah_min={header.merah_min}
                            merah_max={header.merah_max}

                            onDelete={() => {
                                Alert.alert(MYAPP, `Apakah kamu yakin akan hapus target ${header.judul} detail target ${header.keterangan}   ?`, [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            hapusTarget(header.id)
                                        }
                                    }
                                ])
                            }} judul={header.judul} detail={header.keterangan} target_avg={header.target_avg} target={header.target} jenis={header.jenis} />

                        <Text style={{
                            marginHorizontal: '7%',
                            marginTop: '1%',
                            fontFamily: fonts.primary.normal,
                            fontSize: 20,
                        }}>Data</Text>


                        {data.map(i => {
                            return (
                                <MyListTargetDetail onDelete={() => {
                                    Alert.alert(MYAPP, `Apakah kamu yakin akan hapus target tanggal ${moment(i.tanggal).format('DD/MM/YYYY')} sebesar ${i.capaian + header.jenis} ?`, [
                                        { text: 'TIDAK' },
                                        {
                                            text: 'HAPUS',
                                            onPress: () => {
                                                hapusTargetd(i.id)
                                            }
                                        }
                                    ])
                                }} judul={'Tanggal'} detail={moment(i.tanggal).format('DD/MM/YYYY')} capaian={i.capaian} jenis={header.jenis} />
                            )
                        })}


                        <TouchableOpacity onPress={() => setModalAdd(true)} style={{
                            marginTop: '5%',
                            flexDirection: 'row',
                            marginHorizontal: '7%',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon type='ionicon' name='add' color={colors.white} />
                            </View>
                            <Text style={{
                                left: 10,
                                fontFamily: fonts.primary.normal,
                                fontSize: 20,
                                color: colors.primary
                            }}>Tambah</Text>

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

                <Modal
                    animationInTiming={1000}
                    animationIn="slideInRight"
                    animationOut="SlideOitRight"
                    transparent={true}
                    visible={modalAdd}
                    onRequestClose={() => {
                        setModalAdd(!modalAdd);
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{
                            height: windowHeight / 2.5,
                            backgroundColor: colors.primary,
                            padding: 10,
                        }}>

                            <DatePicker
                                style={{
                                    width: '100%', backgroundColor: colors.zavalabs, borderWidth: 0,
                                    borderRadius: 10,
                                    height: 50,
                                    paddingTop: 5,
                                    paddingLeft: 5,
                                }}
                                date={kirim.tanggal}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0,
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { setKirim({ ...kirim, tanggal: date }) }}
                            />

                            {header.jenis != 'Rp' &&
                                <MyInput textColor={colors.white} colorIcon={colors.white} keyboardType='number-pad' onChangeText={x => setKirim({
                                    ...kirim,
                                    capaian: x
                                })} label={'Capaian ' + header.jenis} iconname="analytics" />
                            }


                            {header.jenis == 'Rp' &&

                                <>
                                    <View
                                        style={{

                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 10,

                                        }}>
                                        <Icon type="ionicon" name="analytics" color={colors.white} size={16} />


                                        <Text style={{
                                            left: 10,
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 12
                                        }}>Capaian Rp</Text>

                                    </View>

                                    <CurrencyInput

                                        style={{
                                            backgroundColor: colors.zavalabs,
                                            borderRadius: 10,
                                            paddingLeft: 10,
                                            color: colors.black,
                                            fontSize: 12,
                                            fontFamily: fonts.primary[400],
                                        }}
                                        value={kirim.capaian}
                                        // onChangeValue={setValue}

                                        delimiter=","
                                        separator="."
                                        precision={0}
                                        minValue={0}

                                        onChangeValue={x => setKirim({
                                            ...kirim,
                                            capaian: x
                                        })}
                                    />
                                </>
                            }

                            <MyGap jarak={20} />
                            <MyButton title="Save" onPress={sendServer} warna={colors.secondary} />
                        </View>
                    </View>
                </Modal>
                {/* menu */}

            </SafeAreaView >}


        </>
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