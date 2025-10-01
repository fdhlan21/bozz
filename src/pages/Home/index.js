import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar hidden={true} />
      <WebView
        source={{uri: 'https://app.bozzparfum.my.id/'}}
        style={styles.webview}
        startInLoadingState={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 0,
    padding: 0,
  },
  webview: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});