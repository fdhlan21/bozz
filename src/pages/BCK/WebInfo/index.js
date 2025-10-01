import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
export default function WebInfo({ navigation, route }) {

    const web = route.params.web;
    const jsCode = `

    document.getElementsByClassName('section')[1].style.display = 'none';
    document.getElementsByClassName('section')[2].style.display = 'none';
        `;
    return (
        <WebView javaScriptEnabledAndroid={true}
            injectedJavaScript={jsCode} source={{ uri: web }} style={{ flex: 1 }} />
    )
}

const styles = StyleSheet.create({})