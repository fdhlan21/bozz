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
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
import MyFooter from '../../components/MyFooter';
import CurrencyInput from 'react-native-currency-input';
export default function TargetAdd({ navigation, route }) {




    const [kirim, setKirim] = useState({
        kategori: 'Jayagiri',
        judul: '',
        keterangan: '',
        jenis: 'Rp',
        hijau_min: 0,
        hijau_max: 0,
        kuning_min: 0,
        kuning_max: 0,
        merah_min: 0,
        merah_max: 0,
        rumus: 'AVG'
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        // setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'target_add', kirim).then(res => {

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
            backgroundColor: colors.white,
        }}>
            <MyHeader />
            <View style={{
                flex: 1,
            }}>
                <ScrollView showsVerticalScrollIndicator={false} >


                    <View style={{
                        padding: 20,
                        backgroundColor: colors.white,

                    }}>

                        <MyPicker value={kirim.kategori} onValueChange={x => setKirim({
                            ...kirim,
                            kategori: x
                        })} iconname='grid' label="Kategori" data={[
                            { label: 'Jayagiri', value: 'Jayagiri' },
                            { label: 'Villa', value: 'Villa' },
                            { label: 'RnV', value: 'RnV' },
                            { label: 'Kebun', value: 'Kebun' },
                        ]} />
                        <MyGap jarak={10} />
                        <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Judul Target" iconname="ribbon" placeholder="Masukan judul target" value={kirim.judul} onChangeText={x => setKirim({ ...kirim, judul: x })} />
                        <MyGap jarak={10} />
                        <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Detail Target" iconname="list" placeholder="Masukan detail target" value={kirim.keterangan} onChangeText={x => setKirim({ ...kirim, keterangan: x })} />


                        <MyGap jarak={10} />
                        <MyPicker value={kirim.jenis} onValueChange={x => setKirim({
                            ...kirim,
                            jenis: x
                        })} iconname='options' label="Range" data={[
                            { label: 'Rp', value: 'Rp' },
                            { label: '%', value: '%' },
                            { label: 'Jumlah', value: 'Jumlah' },

                        ]} />
                        <MyGap jarak={10} />

                        <MyPicker value={kirim.rumus} onValueChange={x => setKirim({
                            ...kirim,
                            rumus: x
                        })} iconname='refresh' label="Rumus" data={[
                            { label: 'Rata-rata', value: 'AVG' },
                            { label: 'Minimal', value: 'MIN' },
                            { label: 'Maksimal', value: 'MAX' },
                            { label: 'Total', value: 'SUM' },

                        ]} />

                        <MyGap jarak={10} />


                        <Text style={{
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                            marginVertical: 5,
                            fontSize: 15
                        }}>{`Warna Target (Berupa ${kirim.jenis} )`}</Text>

                        {/* hijau */}
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: 80,
                                backgroundColor: colors.hijau,
                                padding: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: colors.white,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 11
                                }}>Hijau</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                            }}>
                                {kirim.jenis == 'Rp' &&
                                    <>
                                        <View
                                            style={{

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                            }}>
                                            <Icon type="ionicon" name="trending-down" color={colors.primary} size={16} />
                                            <Text style={{
                                                left: 10,
                                                color: colors.primary,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12
                                            }}>Minimal</Text>
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
                                            value={kirim.hijau_min}
                                            // onChangeValue={setValue}
                                            delimiter=","
                                            separator="."
                                            precision={0}
                                            minValue={0}

                                            onChangeValue={x => setKirim({
                                                ...kirim,
                                                hijau_min: x
                                            })}
                                        />
                                    </>}

                                {kirim.jenis != 'Rp' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Minimal" iconname="trending-down" keyboardType='number-pad' value={kirim.hijau_min} onChangeText={x => setKirim({ ...kirim, hijau_min: x })} />}

                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                            }}>
                                {kirim.jenis == 'Rp' &&
                                    <>
                                        <View
                                            style={{

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                            }}>
                                            <Icon type="ionicon" name="trending-up" color={colors.primary} size={16} />
                                            <Text style={{
                                                left: 10,
                                                color: colors.primary,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12
                                            }}>Maksimal</Text>
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
                                            value={kirim.hijau_max}
                                            // onChangeValue={setValue}
                                            delimiter=","
                                            separator="."
                                            precision={0}
                                            minValue={0}

                                            onChangeValue={x => setKirim({
                                                ...kirim,
                                                hijau_max: x
                                            })}
                                        />
                                    </>}

                                {kirim.jenis != 'Rp' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Maksimal" iconname="trending-up" keyboardType='number-pad' value={kirim.hijau_max} onChangeText={x => setKirim({ ...kirim, hijau_max: x })} />}

                            </View>
                        </View>

                        {/* kuning */}
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: 80,
                                backgroundColor: colors.kuning,
                                padding: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: colors.white,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 11
                                }}>Kuning</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                            }}>
                                {kirim.jenis == 'Rp' &&
                                    <>
                                        <View
                                            style={{

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                            }}>
                                            <Icon type="ionicon" name="trending-down" color={colors.primary} size={16} />
                                            <Text style={{
                                                left: 10,
                                                color: colors.primary,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12
                                            }}>Minimal</Text>
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
                                            value={kirim.kuning_min}
                                            // onChangeValue={setValue}
                                            delimiter=","
                                            separator="."
                                            precision={0}
                                            minValue={0}

                                            onChangeValue={x => setKirim({
                                                ...kirim,
                                                kuning_min: x
                                            })}
                                        />
                                    </>}

                                {kirim.jenis != 'Rp' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Minimal" iconname="trending-down" keyboardType='number-pad' value={kirim.kuning_min} onChangeText={x => setKirim({ ...kirim, kuning_min: x })} />}

                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                            }}>
                                {kirim.jenis == 'Rp' &&
                                    <>
                                        <View
                                            style={{

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                            }}>
                                            <Icon type="ionicon" name="trending-up" color={colors.primary} size={16} />
                                            <Text style={{
                                                left: 10,
                                                color: colors.primary,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12
                                            }}>Maksimal</Text>
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
                                            value={kirim.kuning_max}
                                            // onChangeValue={setValue}
                                            delimiter=","
                                            separator="."
                                            precision={0}
                                            minValue={0}

                                            onChangeValue={x => setKirim({
                                                ...kirim,
                                                kuning_max: x
                                            })}
                                        />
                                    </>}

                                {kirim.jenis != 'Rp' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Maksimal" iconname="trending-up" keyboardType='number-pad' value={kirim.kuning_max} onChangeText={x => setKirim({ ...kirim, kuning_max: x })} />}

                            </View>
                        </View>
                        {/* merah */}
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: 80,
                                backgroundColor: colors.merah,
                                padding: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: colors.white,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 11
                                }}>Merah</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                            }}>
                                {kirim.jenis == 'Rp' &&
                                    <>
                                        <View
                                            style={{

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                            }}>
                                            <Icon type="ionicon" name="trending-down" color={colors.primary} size={16} />
                                            <Text style={{
                                                left: 10,
                                                color: colors.primary,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12
                                            }}>Minimal</Text>
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
                                            value={kirim.merah_min}
                                            // onChangeValue={setValue}
                                            delimiter=","
                                            separator="."
                                            precision={0}
                                            minValue={0}

                                            onChangeValue={x => setKirim({
                                                ...kirim,
                                                merah_min: x
                                            })}
                                        />
                                    </>}

                                {kirim.jenis != 'Rp' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Minimal" iconname="trending-down" keyboardType='number-pad' value={kirim.merah_min} onChangeText={x => setKirim({ ...kirim, merah_min: x })} />}

                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                            }}>
                                {kirim.jenis == 'Rp' &&
                                    <>
                                        <View
                                            style={{

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                            }}>
                                            <Icon type="ionicon" name="trending-up" color={colors.primary} size={16} />
                                            <Text style={{
                                                left: 10,
                                                color: colors.primary,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12
                                            }}>Maksimal</Text>
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
                                            value={kirim.merah_max}
                                            // onChangeValue={setValue}
                                            delimiter=","
                                            separator="."
                                            precision={0}
                                            minValue={0}

                                            onChangeValue={x => setKirim({
                                                ...kirim,
                                                merah_max: x
                                            })}
                                        />
                                    </>}

                                {kirim.jenis != 'Rp' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Maksimal" iconname="trending-up" keyboardType='number-pad' value={kirim.merah_max} onChangeText={x => setKirim({ ...kirim, merah_max: x })} />}

                            </View>
                        </View>




                        <MyGap jarak={20} />
                        {loading && <ActivityIndicator color={colors.primary} size="large" />}

                        {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan" Icons="download-outline" />}


                    </View>


                </ScrollView>
            </View>
            <MyFooter />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})