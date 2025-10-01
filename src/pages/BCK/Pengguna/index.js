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

export default function Pengguna({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();



    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [filter, setFilter] = useState({
        level: 'Semua',
    })
    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'pengguna').then(res => {
            console.log(res.data);
            setData(res.data);
            setTemp(res.data);
        })
    }

    const filterData = () => {

        if (filter.level == 'Semua') {
            setData(tmp);
        } else {
            const filtered = tmp.filter(i => i.level.toLowerCase().indexOf(filter.level.toLowerCase()) > -1);
            console.log(filtered);
            setData(filtered)
        }

        setModalVisible(false);

    }


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('PenggunaDetail', item)} style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginVertical: 5,
                flexDirection: 'row',
                overflow: 'hidden'
            }}>

                <View style={{
                    padding: 10,
                }}>
                    <Image style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,

                    }} source={{
                        uri: item.foto_user
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 14,
                        color: colors.black
                    }}>{item.nama_lengkap}</Text>
                    <Text style={{
                        fontFamily: fonts.primary[800],
                        fontSize: 15,
                        color: colors.secondary
                    }}>{item.kategori}</Text>

                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 12,
                        color: colors.primary
                    }}>{item.level}</Text>
                </View>
                <View style={{
                    backgroundColor: colors.success,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                }}>
                    <Icon color={colors.white} type='ionicon' name='chevron-forward' />
                </View>

            </TouchableOpacity>
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
                        <TextInput placeholder='Cari Pegawai . . .' style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 18,
                        }} onChangeText={x => {

                            if (x.length == 0) {
                                setData(tmp)
                            } else {
                                const filtered = data.filter(i => i.nama_lengkap.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                setData(filtered);
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
                <TouchableOpacity onPress={() => navigation.navigate('PenggunaAdd')} style={{
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
                            <MyPicker label="Level" value={filter.level} iconname='ribbon' onValueChange={x => setFilter({ ...filter, level: x })} data={[
                                {
                                    value: 'Semua',
                                    label: 'Semua'
                                },
                                {
                                    value: 'User',
                                    label: 'User'
                                },
                                {
                                    value: 'Auditor',
                                    label: 'Auditor'
                                },
                                {
                                    value: 'Admin',
                                    label: 'Admin'
                                },

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