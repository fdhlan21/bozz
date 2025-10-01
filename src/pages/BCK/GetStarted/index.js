import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
export default function GetStarted({ navigation }) {


    const masuk = () => {

        getData('user').then(res => {
            if (!res) {
                navigation.replace('Login')
            } else {
                navigation.replace('Home')

            }
        })
    }





    return (
        <ImageBackground
            // source={require('../../assets/splash.png')}
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                // alignItems: 'center'
            }}>


            <View style={{
                // flexDirection: 'row',
                paddingBottom: 20,
                marginHorizontal: 10,
            }}>
                <MyButton onPress={() => navigation.navigate('Login')} warna={colors.primary} colorText={colors.black} title="LOGIN" />
                <MyGap jarak={10} />
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{
                        margin: 10,
                        fontFamily: fonts.secondary[400],
                        textAlign: 'center',
                        color: colors.black
                    }}>Belum memilik akun ? <Text style={{
                        fontFamily: fonts.secondary[600],
                    }}>daftar disini</Text></Text>
                </TouchableOpacity>



            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({});
