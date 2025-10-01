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
    Modal,
    TextInput,
} from 'react-native';
import { windowWidth, fonts, windowHeight } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
export default function Transaksi({ navigation, route }) {

    const [pilih, setPilih] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [key, setKey] = useState('');
    const [kirim, setKirim] = useState({});
    const [produk, setProduk] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const sendServer = () => {

        if (pilih.qty == null) {
            Alert.alert(MYAPP, 'Jumlah harus di isi !')

        } else {
            setModalVisible(false);
            const send = {
                fid_user: user.id,
                fid_produk: pilih.id_produk,
                qty: pilih.qty,
                harga: pilih.harga_jual,
                total: pilih.harga_jual * pilih.qty
            };

            axios.post(apiURL + 'cart_add', send).then(r => {
                console.log(r.data);
                __getCart();
            })
        }

    };

    const [trx, setTrx] = useState({
        total: 0,
        bayar: 0,
        kembalian: 0
    })

    const [cart, setCart] = useState([])

    useEffect(() => {

        __getProduk();
        __getCart();
    }, []);


    const __getCart = () => {
        getData('user').then(u => {
            setUser(u);
            axios.post(apiURL + "cart", {
                fid_user: u.id
            }).then(res => {
                setCart(res.data.data);
                setTrx({
                    ...trx,
                    fid_user: u.id,
                    total: res.data.total
                })
                console.log('cart', res.data);
            })
        })

    }


    const simpanTransaksi = () => {
        console.log(trx);

        Alert.alert(MYAPP, 'Apakah sudah yakin ?', [
            { text: 'BATALKAN' },
            {
                text: 'OK', onPress: () => {
                    setLoading(true);
                    setTimeout(() => {

                        axios.post(apiURL + "transaksi_add", trx).then(res => {

                            console.log('trx', res.data);
                            navigation.replace('Success', trx)
                        })
                    }, 1000)
                }
            }
        ])

    }

    const __getProduk = () => {


        axios.post(apiURL + "produk").then(res => {
            setProduk(res.data);
            setTemp(res.data);
            console.log(res.data);
        })
    }

    const myInput = useRef();

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
            paddingTop: 20,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('AAAtur')} style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    width: 50,
                }}>
                    <Image source={require('../../assets/menu.png')} style={{
                        width: 18,
                        height: 18,
                    }} />
                </TouchableOpacity>
                <View style={{ flex: 1, }}>
                    <TextInput placeholder='Cari Produk' style={{
                        fontFamily: fonts.secondary[600],
                        backgroundColor: colors.white,
                        height: 40,
                        paddingLeft: 10,
                        borderRadius: 10,
                    }} value={key} onChangeText={x => {
                        setKey(x);
                        if (x.length == 0) {
                            setProduk(tmp)
                        } else {
                            const filtered = produk.filter(i => i.nama_produk.toLowerCase().indexOf(x.toLowerCase()) > -1);
                            setProduk(filtered);
                        }

                    }} />
                    {/* data barang */}

                </View>
                <TouchableOpacity onPress={() => {
                    ZavalabsScanner.showBarcodeReader(result => {

                        if (result !== null) {
                            const filtered = produk.filter(i => i.barcode.toLowerCase().indexOf(result.toLowerCase()) > -1);
                            // setProduk(filtered);
                            console.log(filtered[0]);
                            setPilih(filtered[0]);
                            setModalVisible(true);
                            // myInput.current.focus();
                            setTimeout(() => {
                                myInput.current.focus();
                            }, 800)
                        }

                    });
                }} style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    width: 50,
                }}>
                    <Image source={require('../../assets/barcode.png')} style={{
                        width: 35,
                        resizeMode: 'contain',
                        height: 40,
                    }} />
                </TouchableOpacity>
            </View>
            {
                key.length > 0 && produk.length > 0 && <View style={{
                    backgroundColor: colors.white,
                    marginHorizontal: 50,
                    padding: 10,
                    zIndex: 99,
                    marginTop: 5,
                    position: 'absolute',
                    // height: 200,
                    width: windowWidth / 1.2,
                    top: 60,
                    borderRadius: 10,
                }}>
                    {produk.slice(0,).map(i => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setPilih(i);
                                // setKey('');
                                setModalVisible(true);
                                // myInput.current.focus();
                                setTimeout(() => {
                                    myInput.current.focus();
                                }, 800)
                            }} style={{
                                marginVertical: 5,
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 1,
                                }}>{i.nama_produk}</Text>
                                <Text>Stok : {i.stok}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

            }

            <View style={{
                flex: 1,
                padding: 10,
            }}>
                {cart.map(c => {
                    return (
                        <View style={{
                            marginBottom: 10,
                            backgroundColor: colors.white,
                            borderRadius: 10,
                            overflow: 'hidden',
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                padding: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600]
                                }}>{c.nama_produk}</Text>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400]
                                        }}>Merek : {c.merek}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400]
                                        }}>Motor : {c.motor_lainnya}</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400]
                                        }}>@{new Intl.NumberFormat().format(c.harga)} x {c.qty}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 20,
                                        }}>{new Intl.NumberFormat().format(c.total)}</Text>
                                    </View>
                                </View>

                            </View>
                            <TouchableOpacity onPress={() => {
                                Alert.alert(MYAPP, 'Hapus item ini ?', [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            console.log(c.id)
                                            axios.post(apiURL + 'cart_hapus', {
                                                id: c.id
                                            }).then(r => {
                                                console.log(r.data)
                                                showMessage({
                                                    message: 'Item berhasil di hapus',
                                                    type: 'success'
                                                })
                                                __getCart();
                                            })
                                        }
                                    }
                                ])
                            }} style={{
                                flex: 1,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colors.danger,

                            }}>
                                <Icon type='ionicon' name='trash' color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    )

                })}
            </View>
            <View style={{
                flex: 0.2,
                backgroundColor: colors.white,
                borderRadius: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.primary,
                    }}>Total Belanja:</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 30,
                        color: colors.black,
                    }}>{new Intl.NumberFormat().format(trx.total)}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.secondary,
                    }}>Kembalian</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 30,
                        color: colors.black,
                    }}>{new Intl.NumberFormat().format(trx.kembalian)}</Text>
                </View>
            </View>
            <View style={{
                marginTop: 10,
                flex: 0.2,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <TextInput value={trx.bayar} onChangeText={x => {
                        setTrx({
                            ...trx,
                            bayar: x,
                            kembalian: x - trx.total
                        })
                    }} keyboardType='number-pad' style={{
                        borderRadius: 10,
                        paddingLeft: 10,
                        backgroundColor: colors.white,
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        height: 50,
                        color: colors.primary,
                    }} />
                </View>

                <TouchableOpacity style={{
                    marginLeft: 10,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    height: 50,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={require('../../assets/calc.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                </TouchableOpacity>

            </View>

            <View>
                {!loading && <MyButton onPress={simpanTransaksi} title="SIMPAN TRANSAKSI" Icons="save" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'center',
                    backgroundColor: '#000000BF'
                }}>
                    <View style={{
                        height: windowHeight / 2.5,
                        backgroundColor: colors.white,
                        // padding: 10
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            textAlign: 'center',
                            backgroundColor: colors.primary,
                            padding: 10,
                            color: colors.white,
                            marginBottom: 10,
                        }}>{MYAPP}</Text>
                        <View style={{
                            padding: 10,
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 20
                            }}>{pilih.nama_produk}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 20
                            }}>Stok : {pilih.stok}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 20,
                                color: colors.success
                            }}>Harga : {new Intl.NumberFormat().format(pilih.harga_jual)}</Text>

                            <MyGap jarak={10} />
                            <TextInput onChangeText={x => {
                                setPilih({
                                    ...pilih,
                                    qty: x
                                })
                            }} ref={myInput} keyboardType='number-pad' placeholder='Masukan Jumlah' style={{
                                backgroundColor: colors.zavalabs,
                                marginVertical: 10,
                                borderRadius: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: 20,
                            }} />
                        </View>
                        <View style={{
                            padding: 10,
                        }}>
                            <MyButton onPress={sendServer} warna={colors.secondary} title="OK" Icons="filter" />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})