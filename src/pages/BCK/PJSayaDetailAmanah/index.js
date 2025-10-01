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


export default function PJSayaDetailAmanah({ navigation, route }) {


    const [modalVisible, setModalVisible] = useState(false);
    const [header, setHeader] = useState(route.params);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);







    useEffect(() => {

        if (isFocused) {

            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'pj_amanah_detail', {
                fid_user: uu.id,
                fid_pjdaftar: route.params.id
            }).then(res => {
                console.log('target', res.data);
                setData(res.data);



            })
        });

    }



    return (






        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>





            {/* header */}
            <MyHeader />
            <View style={{
                marginHorizontal: '7%'
            }}>
                <Text style={{

                    fontFamily: fonts.primary.normal,
                    color: colors.primary,
                    fontSize: 20,
                    marginBottom: 10,
                }}>{header.judul}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('PJSayaAddAmanah', header)} style={{
                    borderWidth: 1,
                    borderColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='add-circle' color={colors.primary} />
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        color: colors.primary,
                        fontSize: 15,
                        left: 10,
                    }}>Penyelesaian Amanah</Text>
                </TouchableOpacity>
                <Text style={{
                    marginVertical: 20,
                    fontFamily: fonts.primary.normal,
                    color: colors.primary,
                    fontSize: 20,
                    marginBottom: 10,
                }}>Data</Text>


                {data.map((item, index) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: colors.primary,
                            padding: 5,
                            marginVertical: 3,
                            alignItems: 'center'
                        }}>
                            <View>
                                <Image style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 5,
                                }} source={{
                                    uri: item.foto_amanah
                                }} />
                            </View>
                            <View style={{
                                paddingHorizontal: 10,
                            }}>

                                <Text style={{
                                    fontFamily: fonts.primary.normal,
                                    color: colors.placeholder,
                                    fontSize: 25
                                }}>{item.persentase.toString().replace(".", ",")}%</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                paddingHorizontal: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary.normal,
                                    color: colors.primary,
                                    fontSize: 18
                                }}>{item.deskripsi}</Text>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    color: colors.primary,
                                    fontSize: 12
                                }}>{moment(item.tanggal_detail).format('dddd, DD MMMM YYYY')}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {
                                Alert.alert(MYAPP, 'Apakah mau hapus ini ?', [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            axios.post(apiURL + 'pj_amanah_detail_delete', {
                                                id: item.id
                                            }).then(r => {
                                                showMessage({
                                                    message: 'Berhasil dihapus !',
                                                    type: 'success'
                                                });
                                                __getTransaction();
                                            })
                                        }
                                    }
                                ])
                            }} style={{
                                paddingHorizontal: 10,
                            }}>
                                <Icon type='ionicon' name='close-circle' color={colors.merah} size={30} />
                            </TouchableOpacity>
                        </View>
                    )
                })}


            </View>



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