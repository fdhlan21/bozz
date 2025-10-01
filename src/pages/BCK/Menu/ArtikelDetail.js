import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
export default function ArtikelDetail({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>

            <ScrollView showsVerticalScrollIndicator={false} style={{
            }}>
                <Image source={{
                    uri: item.image
                }} style={{
                    // flex: 1,
                    width: '100%',
                    height: 250,
                }} />
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.primary,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>


                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 3,
                        color: colors.black,
                        textAlign: 'center'
                    }}>{item.judul}</Text>
                </View>

                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.primary,
                        fontSize: MyDimensi / 4
                    }}>{moment(item.tanggal).format('dddd, DD MMM YYYY')}</Text>
                    <RenderHtml
                        contentWidth={windowWidth}
                        source={{
                            html: item.keterangan
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})