import {StyleSheet, View, StatusBar, BackHandler} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

export default function Home({navigation}) {
  const webViewRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      // Selalu coba goBack dulu, biar WebView yang handle
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Selalu prevent default behavior
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleNavigationStateChange = (navState) => {
    // Jika sudah di halaman pertama dan user back lagi, keluar dari app
    if (!navState.canGoBack && navState.url === 'https://app.bozzparfum.my.id/') {
      // Optional: Bisa tambahin logic untuk keluar app di sini
      // BackHandler.exitApp();
    }
  };

  // Untuk iOS: Handle link yang coba buka di browser eksternal
  const onShouldStartLoadWithRequest = (request) => {
    const {url, navigationType} = request;
    
    // Jika link external, load di WebView yang sama
    if (navigationType === 'click' || navigationType === 'other') {
      if (webViewRef.current && url !== webViewRef.current.url) {
        webViewRef.current.injectJavaScript(`window.location.href = "${url}"; true;`);
        return false; // Cegah loading default
      }
    }
    
    return true; // Izinkan request lainnya
  };

  // Untuk Android: Handle window.open() atau target="_blank"
  const onOpenWindow = (syntheticEvent) => {
    const {nativeEvent} = syntheticEvent;
    const {targetUrl} = nativeEvent;
    
    if (targetUrl && webViewRef.current) {
      // Load URL di WebView yang sama
      webViewRef.current.injectJavaScript(`window.location.href = "${targetUrl}";`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar hidden={true} />
      <WebView
        ref={webViewRef}
        source={{uri: 'https://app.bozzparfum.my.id/'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures={true}
        incognito={false}
        cacheEnabled={true}
        mediaPlaybackRequiresUserAction={false}
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