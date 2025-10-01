import { Alert, StyleSheet, Text, View, Image, FlatList, Modal, ActivityIndicator, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Minimal({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();



    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [filter, setFilter] = useState({
        key: 'nama_produk',
    })
    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'produk_minimal').then(res => {
            console.log(res.data);
            setData(res.data);
            setTemp(res.data);
        })
    }

    const filterData = () => {



        setModalVisible(false);

    }


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProdukDetail', item)} style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginVertical: 5,
                flexDirection: 'row',
                overflow: 'hidden'
            }}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',

                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            color: colors.black
                        }}>{item.nama_produk}</Text>



                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            backgroundColor: colors.success,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: 12
                            }}>Stock Toko Saat ini : {item.stok}</Text>
                        </View>
                        <View style={{
                            left: 10,
                            backgroundColor: colors.warning,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: 12
                            }}>Minimal : {item.minimal}</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <View style={{
                                marginTop: 5,
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.4,
                                }}>Merek</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.2,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.foourty
                                }}>{item.merek}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.4,
                                }}>Harga</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.2,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.foourty
                                }}>{new Intl.NumberFormat().format(item.harga_jual)}</Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            padding: 5,
                        }}>

                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.4,
                            }}>Motor Lainnya</Text>

                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                color: colors.primary
                            }}>{item.motor_lainnya}</Text>

                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor: colors.secondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                }}>
                    <Icon color={colors.white} type='ionicon' name='chevron-forward' />
                </View>

            </TouchableOpacity >
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
            position: 'relative'
        }}>



            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',

                    borderRadius: 10,
                    marginBottom: 10,
                }}>
                    <View style={{
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: colors.white,
                    }}>
                        <Icon type='ionicon' color={colors.border} size={20} name='search' />
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: colors.white,
                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,
                    }}>
                        <TextInput placeholder='Cari Produk . . .' style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 18,
                        }} onChangeText={x => {

                            if (x.length == 0) {
                                setData(tmp)
                            } else {
                                if (filter.key == 'nama_produk') {
                                    const filtered = data.filter(i => i.nama_produk.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                } else if (filter.key == 'merek') {
                                    console.log('merek')
                                    const filtered = data.filter(i => i.merek.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                } else if (filter.key == 'motor_lainnya') {
                                    const filtered = data.filter(i => i.motor_lainnya.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                }

                            }



                        }} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                    }} style={{
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <Image source={require('../../assets/filter.png')} style={{
                            width: 30,
                            height: 30,
                        }} />
                    </TouchableOpacity>
                </View>
                <FlatList data={data} renderItem={__renderItem} />
            </View>



            <View style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('ProdukAdd')} style={{
                    width: 60,
                    height: 60,
                    elevation: 4,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                }}>
                    <Icon color={colors.white} type='ionicon' name='add' size={30} />
                </TouchableOpacity>
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
                        height: windowHeight / 3,
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
                            <MyPicker label="Cari Berdasarkan Field" value={filter.key} iconname='ribbon' onValueChange={x => setFilter({ ...filter, key: x })} data={[
                                { value: 'nama_produk', label: 'Nama Produk' },
                                { value: 'merek', label: 'Merek' },
                                { value: 'motor_lainnya', label: 'Motor Lainnya' },


                            ]} />
                            <MyGap jarak={10} />
                        </View>
                        <View style={{
                            padding: 10,
                        }}>
                            <MyButton onPress={filterData} warna={colors.secondary} title="Filter Pencarian" Icons="filter" />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})