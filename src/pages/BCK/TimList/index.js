import { Alert, StyleSheet, Text, View, Image, FlatList, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';


export default function TimList({ navigation }) {
    const [data, setData] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();

        }

    }, [isFocused]);


    const __getTransaction = () => {
        axios.post(apiURL + 'slider_data.php').then(rz => {
            setData(rz.data);
            console.log(rz.data)
        })
    }



    const __getTransactionKey = (x) => {
        axios.post(apiURL + 'slider_data.php', {
            key: x
        }).then(rz => {
            setData(rz.data);
            console.log(rz.data)
        })
    }



    const __renderItem = ({ item }) => {
        return (
            <View style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                marginVertical: 5,
                flex: 1,
                backgroundColor: colors.white,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{

                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.primary,
                    }}>{item.name}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 35,
                        backgroundColor: colors.danger,
                        color: colors.white,
                        width: 45,
                        borderRadius: 10,
                        height: 15,
                        textAlign: 'center',
                    }}>{item.exe}</Text>
                </View>

                <View style={{
                    flexDirection: 'row'
                }}>


                    <TouchableOpacity onPress={() => {

                        PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                            {
                                title: 'storage title',
                                message: 'storage_permission',
                            },
                        ).then(granted => {
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                //Once user grant the permission start downloading
                                console.log('Storage Permission Granted.');
                                downloadHistory(item.image, item.name, item.exe);
                                // Linking.openURL(i.url)
                            } else {
                                //If permission denied then show alert 'Storage Permission 
                                Alert.alert('storage_permission');
                            }
                        });


                    }}>
                        <Icon type='ionicon' size={windowWidth / 15} name='download-outline' color={colors.secondary} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



    const downloadHistory = async (url, nama_file, exe) => {

        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.DownloadDir;
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/' + nama_file + '.' + exe,
                description: nama_file,
            },
        };
        config(options)
            .fetch('GET', url)
            .then((res) => {
                // success
                Share.open({
                    url: 'file://' + PictureDir +
                        '/' + nama_file
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
                showMessage({
                    message: 'File berhasil di unduh',
                    type: 'success'
                })
            })
            .catch((error) => {
                // error
                console.warn(error)
            });

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            <FlatList data={data} renderItem={__renderItem} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})