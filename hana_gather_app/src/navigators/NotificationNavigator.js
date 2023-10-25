import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useTheme } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useFlipper } from '@react-navigation/devtools';
import HeaderLeftButton from '../components/HeaderLeftButton';
import Notification from '../screens/Notification/Notification';
import PayoutStatus from '../screens/Payment/DutchPayStatus';
import Setting from '../screens/Notification/Setting';
import TransferConfirm from '../screens/MyPage/TransferConfirm';
import ApplyList from '../screens/Notification/ApplyList';
const Stack = createStackNavigator();
// @refresh reset
const NotificationNavigator = props => {
  const { Layout, darkMode, NavigationTheme, Fonts, Colors } = useTheme();
  const { t } = useTranslation(['login']);
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  return (
    <Stack.Navigator
      screenOptions={{
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
        name="Notification"
        component={Notification}
        options={{ headerShown: true, headerTitle: '알림' }}
      />
      <Stack.Screen
        name="PayoutStatus"
        component={PayoutStatus}
        options={{
          headerShown: true,
          headerTitle: '정산 현황',
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
        name="HomeTransferConfirm"
        component={TransferConfirm}
        options={{
          headerShown: true,
          presentation: 'transparentModal',
          headerBackTitleVisible: false,
          headerTitleStyle: { display: 'none' },
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
        name="Setting"
        component={Setting}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '설정',
        }}
      />

      <Stack.Screen
        name="ApplyList"
        component={ApplyList}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '가입 신청 목록',
        }}
      />
    </Stack.Navigator>
  );
};
export default NotificationNavigator;
