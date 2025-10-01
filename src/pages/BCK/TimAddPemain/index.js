import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyGap, MyInput } from '../../components'
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function TimAddPemain({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        fid_tim: route.params.fid_tim,
        nama_pemain: '',
        nomor: '',
        posisi: '',
    });

    const _sendServer = async () => {
        setLoading(true);
        console.log(kirim)
        setTimeout(() => {


            axios.post(apiURL + 'tim_add_pemain.php', kirim).then(res => {
                console.log(res.data)
                setLoading(false);
                navigation.goBack();
                Alert.alert('ASPIVO', 'Berhasil tambah pemain baru ' + kirim.nama_pemain)
            })

        }, 800)

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MyInput label="Nama Pemain" value={kirim.nama_pemain} onChangeText={x => setKirim({
                    ...kirim,
                    nama_pemain: x
                })} placeholder="masukan nama pemain" />
                <MyGap jarak={10} />
                <MyInput label="Nomor Pemain" value={kirim.nomor} onChangeText={x => setKirim({
                    ...kirim,
                    nomor: x
                })} placeholder="masukan nomor pemain" />
                <MyGap jarak={10} />
                <MyInput label="Posisi Pemain" value={kirim.posisi} onChangeText={x => setKirim({
                    ...kirim,
                    posisi: x
                })} placeholder="masukan posisi pemain" />
                <MyGap jarak={20} />

                {!loading && <MyButton onPress={_sendServer} title="Tambah Pemain" />}
                {loading && <ActivityIndicator color={colors.secondary} size="large" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})