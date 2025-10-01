import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Rating } from 'react-native-ratings';

export default function Ulasan({ navigation, route }) {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [rating, setRating] = useState(3)
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');


    const [open, setOpen] = useState(false);

    const [kirim, setKirim] = useState({
        pesan: '',
        rating: 3,

    });

    const sendServer = () => {





        axios.post(apiURL + 'testimoni_add', {
            ...kirim,
            rating: rating
        }).then(res => {
            console.log(res.data);
            __getTransaction();
            Alert.alert(MYAPP, 'Testimoni berhasil di kirim !');
            setKirim({
                ...kirim,
                pesan: '',
                rating: 0,
            })
        })
    }

    const __getTransaction = () => {
        axios.post(apiURL + 'testimoni').then(res => {
            console.log(res.data);
            setData(res.data);

        })
    }


    useEffect(() => {


        if (isFocused) {
            __getTransaction();
            getData('user').then(res => {

                setOpen(true);
                setKirim({
                    ...kirim,
                    fid_user: res.id
                })
                setUser(res);

            });
        }




    }, [isFocused]);





    const Bintang = ({ nilai }) => {

        var myBintang = [];

        for (let i = 0; i < nilai; i++) {
            myBintang.push(
                <Icon type='ionicon' name='star' color={colors.secondary} size={10} />
            );
        }

        return <>{myBintang}</>;
    }




    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 5,
                height: 80,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 5,
                }}>
                    <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,

                    color: colors.black
                }}>Testimoni</Text>
            </View>

            {open &&
                <ScrollView>


                    <View style={{
                        margin: 10,
                    }}>

                        <View style={{
                            borderRadius: 20,
                            padding: 10,
                        }}>

                            {data.map(i => {

                                console.log(i.rating)


                                return (
                                    <View style={{
                                        backgroundColor: colors.white,
                                        borderRadius: 10,

                                        flexDirection: 'row',
                                        marginVertical: 5,
                                        borderBottomWidth: 1,
                                        padding: 10,
                                        borderBottomColor: colors.border,
                                        alignItems: 'center'
                                    }}>
                                        <View>
                                            <Image style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 25,
                                            }} source={{
                                                uri: i.avatar
                                            }} />
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            padding: 10,
                                        }}>
                                            <Text style={{
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 14
                                            }}>{i.nama_lengkap}</Text>
                                            <Text style={{
                                                fontFamily: fonts.secondary[200],
                                                fontSize: 14
                                            }}>{i.pesan}</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                marginVertical: 5,
                                            }}>

                                                <Bintang nilai={i.rating} />

                                            </View>
                                        </View>
                                        {user.id == i.fid_user && <TouchableOpacity onPress={() => {
                                            axios.post(apiURL + 'testimoni_delete', {
                                                id: i.id
                                            }).then(res => {
                                                __getTransaction();
                                            })
                                        }} style={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon type='ionicon' name='trash' color={colors.danger} />
                                        </TouchableOpacity>}
                                    </View>
                                )
                            })}

                        </View>
                        {/* data detail */}
                    </View>
                    <View style={{
                        padding: 20,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: colors.white,
                    }}>
                        <Rating
                            ratingTextColor={colors.primary}
                            showRating
                            ratingColor={colors.primary}
                            ratingBackgroundColor={colors.primary}
                            ratingCount={5}
                            startingValue={rating}
                            imageSize={40}
                            onFinishRating={x => {
                                console.log('rating', x);
                                setRating(x)
                            }}
                            style={{ paddingVertical: 0, marginBottom: 10, }}
                        />
                        <MyInput textColor={colors.primary} colorIcon={colors.primary} value={kirim.pesan} onChangeText={x => setKirim({
                            ...kirim,
                            pesan: x
                        })} label="Masukan Testimoni" iconname="create" placeholder="Silahkan masukan testimoni" />
                        <MyGap jarak={10} />
                        <MyButton title="Kirim Testimoni" Icons="push" onPress={sendServer} />
                    </View>
                </ScrollView>
            }

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
