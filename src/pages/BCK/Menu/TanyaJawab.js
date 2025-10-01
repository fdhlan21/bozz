import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader, MyInput } from '../../components';
export default function TanyaJawab({ navigation, route }) {

    const [user, setUser] = useState({});
    const inputRef = useRef();

    const sendServer = () => {
        console.log({
            fid_user: user.id,
            pesan: key
        });
        setKey('');
    }

    useEffect(() => {
        getData('user').then(uu => {
            setUser(uu)
        })
    }, [])

    const [key, setKey] = useState('');
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.border,
        }}>
            <MyHeader judul="Tanya Jawab" onPress={() => navigation.goBack()} />
            <View style={{
                flex: 1,
            }}>

            </View>
            <View style={{
                marginBottom: 10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextInput ref={inputRef} value={key} onEndEditing={sendServer} onChangeText={x => {
                    setKey(x)
                }} laceholder='Pencarian . . .' style={{
                    height: 50,
                    flex: 1,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    paddingLeft: 20,
                    borderColor: colors.primary,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                }} />

                <TouchableWithoutFeedback onPress={sendServer}>
                    <View style={{
                        justifyContent: 'center',
                        marginLeft: 5,
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                    }}>
                        <Icon type='ionicon' name='send' color={colors.white} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})