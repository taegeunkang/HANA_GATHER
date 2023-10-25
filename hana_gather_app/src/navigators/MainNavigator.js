import React from 'react';

import Home from '../screens/Home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks';
import { Image } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../utils/utils';
import MyPageNavigator from './MyPageNavigator';
import PaymentNavigator from './PaymentNavigator';
import HomeNavigator from './HomeNavigator';
import NotificationNavigator from './NotificationNavigator';
import SearchNavigator from './SearchNavigator';
const Tab = createBottomTabNavigator();
// @refresh reset
const MainNavigator = ({ route }) => {
  const { Images, Fonts, Colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.contentBackground,
        },
        tabBarLabelStyle: {
          color: Colors.navSelect,
          ...Fonts.contentRegularBold,
        },
        tabBarIconStyle: {
          marginTop: responsiveHeight(10),
        },
        tabBarIcon: ({ focused }) => {
          if (route.name == 'HomeNavigator') {
            return focused ? (
              <Image
                source={Images.homeSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={Images.homeNotSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            );
          } else if (route.name == 'SearchNavigator') {
            return focused ? (
              <Image
                source={Images.searchSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={Images.searchNotSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            );
          } else if (route.name == 'PaymentNavigator') {
            return focused ? (
              <Image
                source={Images.createSelect}
                style={{
                  width: responsiveWidth(35),
                  height: responsiveHeight(35),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={Images.createNotSelect}
                style={{
                  width: responsiveWidth(35),
                  height: responsiveHeight(35),
                  resizeMode: 'contain',
                }}
              />
            );
          } else if (route.name == 'MyPage') {
            return focused ? (
              <Image
                source={Images.userSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={Images.userNotSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            );
          } else if (route.name == 'NotificationNavigator') {
            return focused ? (
              <Image
                source={Images.bellSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={Images.bellNotSelect}
                style={{
                  width: responsiveWidth(28),
                  height: responsiveHeight(28),
                  resizeMode: 'contain',
                }}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{ unmountOnBlur: false }}
      />
      <Tab.Screen
        name="PaymentNavigator"
        component={PaymentNavigator}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.push('Payment');
          },
        })}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="NotificationNavigator"
        component={NotificationNavigator}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
