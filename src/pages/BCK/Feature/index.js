import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, Modal, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';



import ProgressCircle from 'react-native-progress-circle'
import { MyInput, MyButton, MyGap, MyPicker } from '../../components';
export default function Kategori({ navigation, route }) {



    const [data, setData] = useState({});
    const [kirim, setKirim] = useState({
        kode: '',
        fid_user: '',
    });
    const [open, setOpen] = useState(false);
    const [pengguna, setPengguna] = useState([]);

    useEffect(() => {
        __getTransaction();
    }, [])

    const [user, setUser] = useState({});
    const __getTransaction = () => {
        getData('user').then(uu => {

            setUser(uu);
            axios.post(apiURL + 'pengguna_list', {
                fid_user: uu.id
            }).then(resPos => {
                console.log(resPos.data);
                setPengguna(resPos.data);
                setKirim({
                    ...kirim,
                    fid_user: resPos.data[0].value
                })
            })


            axios.post(apiURL + 'arsip', {
                fid_user: uu.id
            }).then(res => {

                setData(res.data)
            })
        })
    }


    const __renderItem = ({ item }) => {
        return (

            <View style={{
                flex: 1,
                margin: 10,
                flexDirection: 'row',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black
                    }}>{item.judul}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.black
                    }}>{item.kategori}</Text>

                    <Text style={{

                        fontFamily: fonts.secondary[800],
                        color: colors.secondary
                    }}>Posisi :</Text>
                    <Text style={{
                        padding: 5,
                        marginBottom: 5,
                        backgroundColor: colors.black,
                        color: colors.white,

                    }}>  {item.nama_lengkap}  </Text>


                    {item.kategori == 'Ahli Waris' || item.kategori == 'Riwayat Tanah' ?

                        <>
                            <View style={{
                                borderWidth: 1,
                                padding: 10,
                                borderColor: colors.secondary
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        color: colors.black
                                    }}>Nama</Text>

                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.nama}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        color: colors.black
                                    }}>Alamat</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.alamat}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        color: colors.black
                                    }}>Nomor Surat</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.nomor_surat}</Text>
                                </View>
                            </View>
                        </> : <></>
                    }

                    {item.judul == 'Surat' && (user.username == 'lurah' || user.username == 'sekkel') ?
                        <>

                            <View>
                                <TouchableNativeFeedback onPress={() => {
                                    setOpen(true);
                                    setKirim(item)
                                }}>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.success,
                                        flexDirection: 'row'
                                    }}><Text
                                        style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.white,
                                            flex: 1,

                                        }}
                                    >Disposisi Surat</Text>
                                        <Icon type='ionicon' color={colors.white} size={15} name='create' />
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </>
                        : <></>}
                </View>
                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <ProgressCircle
                        percent={item.persen}
                        radius={40}
                        borderWidth={5}
                        color={colors.primary}
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 20 }}>{`${item.persen}%`}</Text>
                    </ProgressCircle>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        textAlign: 'center',
                        fontSize: 10
                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')} {'\nPukul'} {item.jam} {'WIB'}</Text>

                    <TouchableNativeFeedback onPress={() => navigation.navigate('Game', item)}>
                        <View style={{
                            marginTop: 10,
                            padding: 10,
                            backgroundColor: colors.secondary,
                            borderRadius: 20,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: fonts.secondary[600],
                                color: colors.white
                            }}>Lihat Detail</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>


            </View>

        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>


            <View style={{
                padding: 10,
                marginBottom: 10,
                backgroundColor: colors.white,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 5,
                    resizeMode: 'contain',
                    height: 50,
                }} />

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 18,

                }}>Arsip / Result</Text>
            </View>

            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} numColumns={1} renderItem={__renderItem} />
            </View>

            {/* modal */}
            <Modal

                animationType="fade"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    setOpen(!open);
                    setKirim({
                        kode: '',
                        fid_user: '',
                    })
                }}>
                <View style={{
                    backgroundColor: '#00000090',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <View style={{
                        borderRadius: 10,
                        padding: 20,
                        flex: 0.5,
                        backgroundColor: colors.white,
                        justifyContent: 'center'
                    }}>
                        <ScrollView>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black
                            }}>{kirim.judul}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                color: colors.black
                            }}>{kirim.kategori}</Text>

                            <Text style={{

                                fontFamily: fonts.secondary[800],
                                color: colors.secondary
                            }}>Posisi : </Text>
                            <Text style={{
                                padding: 5,
                                marginBottom: 5,
                                backgroundColor: colors.black,
                                color: colors.white,

                            }}>  {kirim.nama_lengkap}  </Text>

                            {kirim.kategori == 'Ahli Waris' || kirim.kategori == 'Riwayat Tanah' ?

                                <View style={{
                                    borderWidth: 1,
                                    padding: 10,
                                    borderColor: colors.secondary
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            fontFamily: fonts.secondary[400],
                                            color: colors.black
                                        }}>Nama</Text>

                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black
                                        }}>{kirim.nama}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            fontFamily: fonts.secondary[400],
                                            color: colors.black
                                        }}>Alamat</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black
                                        }}>{kirim.alamat}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            fontFamily: fonts.secondary[400],
                                            color: colors.black
                                        }}>Nomor Surat</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black
                                        }}>{kirim.nomor_surat}</Text>
                                    </View>
                                </View> : <></>}
                            <MyGap jarak={20} />
                            <MyPicker value={kirim.fid_user} data={pengguna} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    fid_user: x
                                })
                            }} label="Ubah Posisi Surat" iconname="options" />
                            <MyGap jarak={20} />
                            <MyButton title="Simpan" onPress={() => {
                                console.log(kirim);

                                axios.post(apiURL + 'update_arsip', kirim).then(res => {
                                    console.log(res.data);
                                    setOpen(false);
                                    __getTransaction();

                                })




                            }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})