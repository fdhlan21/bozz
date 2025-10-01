import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
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
import { MyInput, MyGap, MyButton } from '../../components';

export default function Diary({ navigation }) {

    const [comp, setComp] = useState({});
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});



    useEffect(() => {
        __getTransaction();

    }, []);

    const __getTransaction = () => {
        getData('user').then(uu => {
            setUser(uu);
            axios.post(apiURL + 'catatan', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            })
        })
    }

    const [catatan, setCatatan] = useState('');


    const MyMenuFeature = ({ value, label, onPress }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{
                    flex: 1,
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        marginVertical: 5,
                        color: colors.primary
                    }}>{label}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        marginVertical: 5,
                        color: colors.primary
                    }}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>

            <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 0
            }}>
                <Image source={require('../../assets/top2.png')} style={{
                    width: 100,
                    height: 140,
                }} />
            </View>
            <View style={{
                height: 120,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 24,
                    marginBottom: 5,

                }}>Diary</Text>
                <View style={{
                    borderBottomWidth: 1,
                    width: windowWidth / 2,
                    borderColor: colors.border

                }}></View>
            </View>

            <View style={{
                flex: 4,
                // justifyContent: 'center',
                padding: 20,
            }}>
                <FlatList data={data} numColumns={2} renderItem={({ item }) => {
                    return (
                        <View style={{
                            flex: 1,
                            position: 'relative',
                            borderWidth: 1,
                            margin: 10,
                            borderRadius: 10,
                            padding: 10,
                            borderColor: colors.border
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 15,
                                color: colors.black
                            }}>{item.catatan}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.primary
                            }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')} Pukul {item.jam}</Text>

                            <TouchableNativeFeedback onPress={() => {
                                Alert.alert(MYAPP, 'Apakah kamu mau hapus ini ?', [
                                    { text: "BATAL" },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            getData('user').then(u => {
                                                axios.post(apiURL + 'catatan_delete', {
                                                    id: item.id,

                                                }).then(res => {
                                                    console.log(res.data);
                                                    __getTransaction()
                                                })
                                            })
                                        }
                                    }
                                ])
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    top: -10,
                                    right: -10,
                                    zIndex: 99
                                }}>
                                    <Icon type='ionicon' name='trash' color={colors.danger} size={30} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )
                }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 10,
                }}>
                    <MyInput value={catatan} label="Tuliskan Diary" onChangeText={x => {
                        setCatatan(x)
                    }} multiline iconname="create" />
                    <MyGap jarak={10} />
                    <MyButton title="Simpan Diary" onPress={() => {
                        if (catatan.length == 0) {
                            Alert.alert(MYAPP, 'Tulisan tidak boleh kosong !')
                        } else {
                            getData('user').then(u => {
                                axios.post(apiURL + 'catatan_add', {
                                    fid_user: u.id,
                                    catatan: catatan
                                }).then(res => {
                                    setCatatan('');
                                    console.log(res.data);
                                    __getTransaction()
                                })
                            })
                        }
                    }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})