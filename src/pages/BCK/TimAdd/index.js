import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyGap, MyInput } from '../../components'
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function TimAdd({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [tim, setTim] = useState('');

    const _sendServer = async () => {
        setLoading(true);
        setTimeout(() => {

            console.log(tim);
            axios.post(apiURL + 'tim_add.php', {
                nama_tim: tim
            }).then(res => {
                setLoading(false);
                navigation.navigate('TimList')
                Alert.alert('ASPIVO', 'Berhasil buat tim baru ' + tim)
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
                <MyInput value={tim} onChangeText={x => setTim(x)} placeholder="tulis nama tim baru" />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={_sendServer} title="Buat Tim baru" />}
                {loading && <ActivityIndicator color={colors.secondary} size="large" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})