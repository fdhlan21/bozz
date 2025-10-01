import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './routes';
import {LogBox, StatusBar, View, Text} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Color, colors, fonts} from './utils';
import {ToastProvider} from 'react-native-toast-notifications';
import {Icon} from 'react-native-elements';
import {Pressable} from 'react-native';
export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <StatusBar
        hidden
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <ToastProvider
        duration={2000}
        placement="bottom"
        offsetBottom={70}
        animationDuration={250}
        animationType="zoom-in"
        successColor={Color.blueGray[50]}
        successIcon={
          <Icon
            type="ionicon"
            name="checkmark-circle"
            color={Color.tealGreen[500]}
            size={24}
          />
        }
        dangerColor={
          <Icon
            type="ionicon"
            name="close-circle"
            color={Color.tealGreen[500]}
            size={24}
          />
        }
        renderToast={toast => {
          return (
            <View
              style={{
                backgroundColor: Color.blueGray[50],
                padding: 10,
                width: '90%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Color.blueGray[100],
                flexDirection: 'row',
              }}>
              {toast.type == 'success' ? (
                <Icon
                  type="ionicon"
                  name="checkmark-circle"
                  color={Color.tealGreen[500]}
                  size={24}
                />
              ) : toast.type == 'warning' ? (
                <Icon
                  type="ionicon"
                  name="information-circle"
                  color={Color.blueGray[400]}
                  size={24}
                />
              ) : (
                <Icon
                  type="ionicon"
                  name="close-circle"
                  color={Color.red[500]}
                  size={24}
                />
              )}
              <Text
                style={{
                  left: 10,
                  flex: 1,
                  ...fonts.body3,
                  color: colors.black,
                }}>
                {toast.message}
              </Text>
              {/* <Pressable>
                <Icon type="ionicon" name="close" color={Color.blueGray[400]} />
              </Pressable> */}
            </View>
          );
        }}>
        <Router />
      </ToastProvider>

      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}
