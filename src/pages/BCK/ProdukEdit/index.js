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
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ZavalabsScanner from 'react-native-zavalabs-scanner'


export default function ProdukEdit({ navigation, route }) {

    const options = {
        includeBase64: true,
        quality: 1,
    };

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            // console.log('All Response = ', response);

            // console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 2000000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setKirim({
                                ...kirim,
                                foto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                        case 2:
                            setKirim({
                                ...kirim,
                                foto_profile: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'produk_edit', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data);

                navigation.goBack();
            } else {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            }
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
            paddingTop: 20,
        }}>
            <ScrollView showsVerticalScrollIndicator={false} >


                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 20,
                    borderRadius: 10,
                }}>
                    <MyInput label="Nama Produk" iconname="cube" placeholder="Masukan nama produk" value={kirim.nama_produk} onChangeText={x => setKirim({ ...kirim, nama_produk: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Harga Modal" keyboardType='number-pad' iconname="pricetag" placeholder="Masukan harga modal" value={kirim.harga_modal} onChangeText={x => setKirim({ ...kirim, harga_modal: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Merek" iconname="bookmark" placeholder="Masukan merek" value={kirim.merek} onChangeText={x => setKirim({ ...kirim, merek: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Harga Jual" keyboardType='number-pad' iconname="pricetag" placeholder="Masukan harga jual" value={kirim.harga_jual} onChangeText={x => setKirim({ ...kirim, harga_jual: x })} />

                    <MyGap jarak={10} />
                    <MyInput label="Nama Persamaan Motor Lainnya" iconname="pricetag" placeholder="Masukan harga jual" value={kirim.motor_lainnya} onChangeText={x => setKirim({ ...kirim, motor_lainnya: x })} />

                </View>

                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 20,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginBottom: 10,
                    }}>Harga Partai</Text>
                    <MyInput label="Harga Partai Silver" keyboardType='number-pad' iconname="pricetag" placeholder="Masukan partai silver" value={kirim.harga_silver} onChangeText={x => setKirim({ ...kirim, harga_silver: x })} />
                    <MyGap jarak={10} />

                    <MyInput label="Harga Partai Gold" keyboardType='number-pad' iconname="pricetag" placeholder="Masukan partai gold" value={kirim.harga_gold} onChangeText={x => setKirim({ ...kirim, harga_gold: x })} />
                    <MyGap jarak={10} />

                    <MyInput label="Harga Partai Platinum" keyboardType='number-pad' iconname="pricetag" placeholder="Masukan partai platinum" value={kirim.harga_platinum} onChangeText={x => setKirim({ ...kirim, harga_platinum: x })} />
                    <MyGap jarak={10} />

                </View>
                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 20,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginBottom: 10,
                    }}>Barcode</Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyInput nolabel label="Kode Produk / Barcode" iconname="barcode-outline" placeholder="Masukan kode produk / barcode" value={kirim.barcode} onChangeText={x => setKirim({ ...kirim, barcode: x })} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            ZavalabsScanner.showBarcodeReader(result => {

                                if (result !== null) {
                                    setKirim({
                                        ...kirim,
                                        barcode: result
                                    })
                                }

                            });
                        }} style={{
                            padding: 10,
                            width: 80,
                            marginLeft: 5,
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor: colors.primary,
                            // flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon type='ionicon' name='barcode-outline' color={colors.white} size={25} />
                        </TouchableOpacity>
                    </View>


                </View>

                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 20,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginBottom: 10,
                    }}>Atur Stok</Text>
                    <MyInput label="Stok Toko Sekarang" keyboardType='number-pad' iconname="documents" placeholder="Masukan stok toko sekarang" value={kirim.stok} onChangeText={x => setKirim({ ...kirim, stok: x })} />
                    <MyGap jarak={10} />

                    <MyPicker label="Satuan" iconname="cog" value={kirim.satuan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            satuan: x
                        })
                    }} data={[
                        { label: 'Pcs', value: 'Pcs' },
                        { label: 'Liter', value: 'Liter' },
                    ]} />
                    <MyGap jarak={10} />

                    <MyInput label="Minimum Stok" keyboardType='number-pad' iconname="download" placeholder="Masukan minimum stok" value={kirim.minimal} onChangeText={x => setKirim({ ...kirim, minimal: x })} />
                    <MyGap jarak={10} />

                </View>

                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})