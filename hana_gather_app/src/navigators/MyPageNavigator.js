import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useTheme } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useFlipper } from '@react-navigation/devtools';
import HeaderLeftButton from '../components/HeaderLeftButton';
import CreateGroup from '../screens/Payment/Payment';
import MyPage from '../screens/MyPage/MyPage';
import SearchUser from '../screens/MyPage/SearchUser';
import InputAmount from '../screens/MyPage/InputAmount';
import TransferConfirm from '../screens/MyPage/TransferConfirm';
import TransferInform from '../screens/MyPage/TransferInform';
const Stack = createStackNavigator();
// @refresh reset
const CreateNavigator = props => {
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
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchUser"
        component={SearchUser}
        options={{
          headerShown: true,
          headerTitle: '사용자 검색',
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
        name="TransferInform"
        component={TransferInform}
        options={{
          headerShown: true,
          headerTitle:'송금',
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
        name="InputAmount"
        component={InputAmount}
        options={{ headerShown: true, headerTitle: '송금' }}
      />
      <Stack.Screen
        name="TransferConfirm"
        component={TransferConfirm}
        options={{
          headerShown: true,
          headerTitleStyle: { display: 'none' },
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
    </Stack.Navigator>
  );
};
export default CreateNavigator;
