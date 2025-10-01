import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function MyHeader({
  onPress,
  color = colors.white,
  title,
  icon = false,
  iconname = 'search',
}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
      }}>

      {/* Tombol Back */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon type="ionicon" name="arrow-back-outline" size={22} color={color} />
      </TouchableOpacity>

      {/* Judul */}
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text
          style={{
            ...fonts.headline5,
            color: color,
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
          numberOfLines={2}
          ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {/* Icon kanan opsional */}
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon && <Icon name={iconname} size={22} color={color} />}
      </TouchableOpacity>
    </View>
  );
}
