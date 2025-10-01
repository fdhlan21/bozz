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
export default function PJListAdd({ navigation, route }) {




    const [kirim, setKirim] = useState({
        jenis: 'Tanggung Jawab',
        judul: '',
        bobot: '',
        fid_user: '',
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        console.log(kirim);

        setLoading(true);
        axios.post(apiURL + 'pjlist_add', kirim).then(res => {

            console.log(res.data)
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

    const [pengguna, setPengguna] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'pengguna_list').then(res => {
            console.log(res.data);
            setPengguna(res.data);
            setKirim({
                ...kirim,
                fid_user: res.data[0].value
            })
        })
    }, []);

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
                        <MyPicker value={kirim.fid_user} onValueChange={x => setKirim({
                            ...kirim,
                            fid_user: x
                        })} iconname='person' label="Pengguna / Level / Kategori" data={pengguna} />
                        <MyGap jarak={10} />
                        <MyPicker value={kirim.jenis} onValueChange={x => setKirim({
                            ...kirim,
                            jenis: x
                        })} iconname='grid' label="Jenis PJ" data={[
                            { label: 'Tanggung Jawab', value: 'Tanggung Jawab' },
                            { label: 'Amanah', value: 'Amanah' },
                        ]} />
                        <MyGap jarak={10} />
                        <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Judul" iconname="ribbon" placeholder="Masukan judul" value={kirim.judul} onChangeText={x => setKirim({ ...kirim, judul: x })} />
                        <MyGap jarak={10} />

                        {kirim.jenis !== 'Amanah' && <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Nilai Bobot (Berupa %)" iconname="create" keyboardType='number-pad' placeholder="Masukan detail target" value={kirim.bobot} onChangeText={x => setKirim({ ...kirim, bobot: x })} />}


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