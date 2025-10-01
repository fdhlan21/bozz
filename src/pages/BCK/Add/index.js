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
import RNFS from 'react-native-fs';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'


import ProgressCircle from 'react-native-progress-circle'
import { MyButton, MyGap, MyInput } from '../../components';

export default function Add({ navigation, route }) {

    const [data, setData] = useState([]);
    const [pilih, setPilih] = useState([]);
    const [berkas, setBerkas] = useState([]);
    const [kirim, setKirim] = useState({});
    const [user, setUser] = useState({
        nama: '',
        alamat: '',
        nomor_surat: ''
    });

    useEffect(() => {

        getData('user').then(uu => {
            setUser(uu)
        })

        axios.post(apiURL + 'persyaratan', {
            fid_materi: route.params.id
        }).then(res => {
            console.log(res.data);
            let arrTMp = [];
            if (res.data.length > 0) {
                res.data.map((i, index) => {
                    arrTMp.push({ id: index, cek: false, id_syarat: i.id });
                })
                setPilih(arrTMp);
            }
            setData(res.data)
        })
    }, []);

    const [loading, setLoading] = useState(false);

    const __sendServer = () => {
        setLoading(true);
        let CEK = [];

        const sendData = new FormData();

        pilih.filter(i => i.cek == true).map(p => {
            sendData.append('cek[]', p.id_syarat)
        });

        berkas.map(v => {
            sendData.append('berkas[]', {
                name: v.name,
                type: v.type,
                uri: v.uri
            })
        })

        sendData.append('fid_user', user.id);
        sendData.append('fid_materi', route.params.id);
        sendData.append('nama', kirim.nama);
        sendData.append('alamat', kirim.alamat);
        sendData.append('nomor_surat', kirim.nomor_surat);
        sendData.append('persen', route.params.kategori == 'Ahli Waris' || route.params.kategori == 'Riwayat Tanah' ? Math.round((pilih.filter(i => i.cek == true).length / data.length) * 100).toFixed(0) : berkas.length > 0 ? 100 : 0)
        sendData.append('fid_user', user.id)





        axios.post(apiURL + 'add_berkas', sendData).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false);
            Alert.alert(MYAPP, 'Data berhasil di simpan !');
            navigation.goBack();
        })





    }


    const __renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                let tmpCek = [...pilih];

                if (!pilih[index].cek) {

                    tmpCek[index].cek = true;

                } else {

                    tmpCek[index].cek = false;
                }
                setPilih(tmpCek);
            }}>
                <View style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'flex-start'
                }}>
                    <Icon type='ionicon' name={pilih[index].cek ? 'checkbox' : 'checkbox-outline'} />
                    <Text style={{
                        marginLeft: 10,
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black
                    }}>{item.nama_syarat}</Text>
                </View>
            </TouchableOpacity>
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
                backgroundColor: colors.secondary,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={{
                    uri: route.params.icon
                }} style={{
                    width: windowWidth / 5,
                    resizeMode: 'contain',
                    height: 50,
                }} />

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 18,

                }}>{route.params.kategori}</Text>

                {route.params.kategori == 'Ahli Waris' || route.params.kategori == 'Riwayat Tanah' ? <>

                    <ProgressCircle
                        percent={Math.round((pilih.filter(i => i.cek == true).length / data.length) * 100).toFixed(0)}
                        radius={40}
                        borderWidth={5}
                        color={colors.success}
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 20 }}>{`${Math.round((pilih.filter(i => i.cek == true).length / data.length) * 100).toFixed(0)}%`}</Text>
                    </ProgressCircle>
                </> : <>

                    <ProgressCircle
                        percent={berkas.length > 0 ? 100 : 0}
                        radius={40}
                        borderWidth={5}
                        color={colors.success}
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 20 }}>{`${berkas.length > 0 ? 100 : 0}%`}</Text>
                    </ProgressCircle>
                </>}

            </View>

            <ScrollView>
                <View style={{
                    flex: 1,
                }}>

                    {route.params.kategori == 'Ahli Waris' || route.params.kategori == 'Riwayat Tanah' ? <>

                        <View style={{
                            padding: 20,
                        }}>
                            <MyInput label="Nama" onChangeText={x => setKirim({
                                ...kirim,
                                nama: x
                            })} />
                            <MyGap jarak={10} />
                            <MyInput label="Alamat" onChangeText={x => setKirim({
                                ...kirim,
                                alamat: x
                            })} />
                            <MyGap jarak={10} />
                            <MyInput label="Nomor Surat" onChangeText={x => setKirim({
                                ...kirim,
                                nomor_surat: x
                            })} />
                        </View>

                    </> : <></>}
                    <FlatList data={data} numColumns={1} renderItem={__renderItem} />


                </View>

                <View style={{
                    padding: 20,
                }}>
                    <TouchableNativeFeedback onPress={async () => {

                        try {
                            const res = await DocumentPicker.pick({
                                allowMultiSelection: true,
                                // Provide which type of file you want user to pick
                                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
                                // There can me more options as well
                                // DocumentPicker.types.allFiles
                                // DocumentPicker.types.images
                                // DocumentPicker.types.plainText
                                // DocumentPicker.types.audio
                                // DocumentPicker.types.pdf
                            });
                            // Printing the log realted to the file

                            if (res.length > 0) {
                                let berkasTMP = [];
                                await Promise.all(res.map(async filed => {

                                    berkasTMP.push(filed);
                                }))


                                await setBerkas(berkasTMP);
                                console.log(berkasTMP);
                            }


                        } catch (err) {

                            // Handling any exception (If any)
                            if (DocumentPicker.isCancel(err)) {
                                // If user canceled the document selection
                                alert('Canceled');
                            } else {
                                // For Unknown Error
                                alert('Unknown Error: ' + JSON.stringify(err));
                                throw err;
                            }
                        }

                    }}>
                        <View style={{
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.primary
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary
                            }}>Upload File ( PDF / Gambar )</Text>
                        </View>
                    </TouchableNativeFeedback>
                    {berkas.length > 0 && <>

                        {berkas.map((i, index) => {
                            return (
                                <View style={{
                                    marginVertical: 5,
                                    marginHorizontal: 20,
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        color: colors.black
                                    }}>{index + 1}.</Text>
                                    <Text style={{
                                        left: 10,
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        color: colors.black
                                    }}>{i.name} - {i.type}</Text>
                                </View>
                            )
                        })}

                    </>}
                </View>
                <View style={{
                    padding: 20,
                }}>
                    {!loading && <MyButton title="Simpan Data" Icons="bookmark" onPress={__sendServer} />}

                    {loading && <ActivityIndicator size="large" color={colors.primary} />}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})