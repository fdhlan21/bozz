import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Color, colors, fonts} from '../../utils';
import {MyButton, MyHeader} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {apiURL, MYAPP} from '../../utils/localStorage';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {Alert} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';

export default function PelangganDetail({navigation, route}) {
  const ITEM = route.params;
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const formatPhoneForWA = phoneNumber => {
    if (!phoneNumber) return '';

    // Remove all non-numeric characters
    let cleaned = phoneNumber.replace(/\D/g, '');

    // If starts with 0, replace with 62
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    }
    // If starts with +62, remove the +
    else if (cleaned.startsWith('62')) {
      cleaned = cleaned;
    }
    // If starts with 8 (without 0), add 62
    else if (cleaned.startsWith('8')) {
      cleaned = '62' + cleaned;
    }

    return cleaned;
  };

  const MyList = ({label, value}) => {
    return (
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.black,
          }}>
          {label}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            fontSize: 14,
            color: colors.black,
          }}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary + '33',
      }}>
      <MyHeader title="Customer" />

      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
        }}>
        <MyList label="Nama Customer" value={ITEM.nama_customer} />
        <MyList label="Telepon Customer" value={ITEM.telepon_customer} />
        <MyList label="Alamat Customer" value={ITEM.alamat_customer} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 4,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PelangganEdit', ITEM)}
          style={{
            flexDirection: 'row',
            backgroundColor: colors.primary,
            padding: 10,
            marginRight: 4,
            flex: 1,
            alignItems: 'center',
          }}>
          <Icon
            type="ionicon"
            name="create-outline"
            size={16}
            color={colors.white}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: 12,
            }}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(MYAPP, 'Yakin akan hapus ini ?', [
              {text: 'TIDAK'},
              {
                text: 'HAPUS',
                onPress: () => {
                  axios
                    .post(apiURL + 'delete', {
                      id: ITEM.id_customer,
                      modul: 'customer',
                    })
                    .then(res => {
                      if (res.data.status == 200) {
                        toast.show(res.data.message, {
                          type: 'success',
                        });
                        navigation.goBack();
                      } else {
                        toast.show(res.data.message, {
                          type: 'danger',
                        });
                      }
                    });
                },
              },
            ]);
          }}
          style={{
            marginLeft: 4,
            flexDirection: 'row',
            backgroundColor: colors.danger,
            padding: 10,
            flex: 1,
            alignItems: 'center',
          }}>
          <Icon
            type="ionicon"
            name="trash-outline"
            size={16}
            color={colors.white}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: 12,
            }}>
            Hapus
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
