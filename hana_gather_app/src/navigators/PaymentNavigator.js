import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useTheme } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useFlipper } from '@react-navigation/devtools';
import HeaderLeftButton from '../components/HeaderLeftButton';
import Payment from '../screens/Payment/Payment';
import SearchUser1 from '../screens/Payment/SearchUser1';
import DutchPayStatus from '../screens/Payment/DutchPayStatus';
const Stack = createStackNavigator();
// @refresh reset
const PaymentNavigator = props => {
  const { Layout, darkMode, NavigationTheme, Fonts, Colors } = useTheme();
  const { t } = useTranslation(['login']);
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors.headerTitle,
        headerTitleStyle: {
          color: Colors.headerTitle,
          ...Fonts.contentMediumBold,
        },
        headerStyle: { backgroundColor: Colors.contentBackground },
        headerBackTitleVisible: false,
        presentation: 'transparentModal',
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
        name="Payment"
        component={Payment}
        options={{
          headerShown: true,
          headerTitle: '1/N 정산',
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
        options={{ headerShown: true, headerTitle: '정산 현황' }}
      />
    </Stack.Navigator>
  );
};
export default PaymentNavigator;
