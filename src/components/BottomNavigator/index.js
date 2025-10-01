import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Color, colors} from '../../utils/colors';
import {useState, useEffect} from 'react';
import {getData, urlAPI} from '../../utils/localStorage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {fonts} from '../../utils';

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [cart, setCart] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Uncomment and implement cart fetching logic if needed
    // if (isFocused) {
    //   getData('user').then(users => {
    //     axios.post(urlAPI + '/1_cart.php', {
    //       fid_user: users.id
    //     }).then(res => {
    //       setCart(parseFloat(res.data));
    //     });
    //   });
    // }
  }, [isFocused]);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {key: 0});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        switch (label) {
          case 'Home':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-circle-outline';
            break;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderTopWidth:1,
                borderTopColor:'white'
              }}>
              <Icon
                type="ionicon"
                name={iconName}
                size={24}
                color={isFocused ? colors.white : colors.white}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
