import React from 'react';
import { Animated, SafeAreaView, StatusBar, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from '../screens';
import { useTheme } from '../hooks';
import Login from '../screens/Login/Login';
import Register from '../screens/Login/Register';
import { useTranslation } from 'react-i18next';
import { useFlipper } from '@react-navigation/devtools';
import Congraturation from '../screens/Login/Congraturation';
import ProfileInit from '../screens/Login/ProfileInit';
import Permission from '../screens/Login/Permission';
import PhoneVerification from '../screens/Login/PhoneVerification';
import MainNavigator from './MainNavigator';
import Account from '../screens/Login/Account';
import SelectAccount from '../screens/Login/SelectAccount';
import HeaderLeftButton from '../components/HeaderLeftButton';
import MyPageNavigator from './MyPageNavigator';
import Payment from '../screens/Payment/Payment';
import SearchUser1 from '../screens/Payment/SearchUser1';
import MeetingLocation from '../screens/Home/MeetingLocation';
import DutchPayStatus from '../screens/Payment/DutchPayStatus';
const Stack = createStackNavigator();
// @refresh reset
const ApplicationNavigator = props => {
  const { Layout, darkMode, NavigationTheme, Fonts, Colors } = useTheme();
  const { t } = useTranslation(['login']);
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  return (
    <View style={[Layout.fill]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={'dark-content'} />
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTintColor: Colors.headerTitle,
            headerTitleStyle: {
              color: Colors.headerTitle,
              ...Fonts.contentMediumBold,
            },
            headerStyle: { backgroundColor: Colors.contentBackground },
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <HeaderLeftButton onPress={() => props.navigation.pop()} />
            ),
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen
            name="Startup"
            component={Startup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: t('login:header.register'),
            }}
          />
          <Stack.Screen
            name="Congraturation"
            component={Congraturation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Permission"
            component={Permission}
            options={{
              headerShown: false,
              headerTitleStyle: { display: 'none' },
            }}
          />
          <Stack.Screen
            name="ProfileInit"
            component={ProfileInit}
            options={{ headerShown: true, headerTitle: '프로필 설정' }}
          />
          <Stack.Screen
            name="PhoneVerification"
            component={PhoneVerification}
            options={{ headerShown: true, headerTitle: '본인 인증' }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: true, headerTitle: '계좌 연동' }}
          />
          <Stack.Screen
            name="SelectAccount"
            component={SelectAccount}
            options={{ headerShown: true, headerTitle: '계좌 연동' }}
          />

          <Stack.Screen
            name="MainNavigator"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="PaymentNavigator"
            component={PaymentNavigator}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="MyPageNavigator"
            component={MyPageNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: true,
              headerTitle: '1/N 정산',
              presentation: 'transparentModal',
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateY: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.height, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          />
          <Stack.Screen
            name="SearchUser1"
            component={SearchUser1}
            options={{ headerShown: true, headerTitle: '인원 선택' }}
          />
          <Stack.Screen
            name="DutchPayStatus"
            component={DutchPayStatus}
            options={{
              headerShown: true,
              headerTitle: '정산 현황',
              presentation: 'transparentModal',
              cardStyleInterpolator: ({ current, closing, layouts }) => {
                const isClosing = closing.__getValue() === 1;
                if (isClosing) {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                          }),
                        },
                      ],
                    },
                  };
                } else {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                }
              },
            }}
          />

          <Stack.Screen
            name="MeetingLocation"
            component={MeetingLocation}
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              headerTitleStyle: { display: 'none' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default ApplicationNavigator;
