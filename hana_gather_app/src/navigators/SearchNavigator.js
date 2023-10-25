import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useTheme } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useFlipper } from '@react-navigation/devtools';
import HeaderLeftButton from '../components/HeaderLeftButton';
import Search from '../screens/Search/Search';

const Stack = createStackNavigator();
// @refresh reset
const SearchNavigator = props => {
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
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default SearchNavigator;
