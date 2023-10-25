import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useTheme } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useFlipper } from '@react-navigation/devtools';
import HeaderLeftButton from '../components/HeaderLeftButton';
import TransferConfirm from '../screens/MyPage/TransferConfirm';
import Home from '../screens/Home/Home';
import DutchPayList from '../screens/Home/DutchPayList';
import GroupDetail from '../screens/Home/GroupDetail';
import MeetingDetail from '../screens/Home/MeetingDetail';
import CreateGroup from '../screens/Home/CreateGroup';
import FindingLocation from '../screens/Home/FindingLocation';
import SearchUser1 from '../screens/Payment/SearchUser1';
import MeetingList from '../screens/Home/MeetingList';
import Announcement from '../screens/Home/Announcement';
import ChoosePic from '../screens/Home/ChoosePic';
import Preview from '../screens/Home/Preview';
import WriteContent from '../screens/Home/WriteContent';
import Detail from '../screens/Home/Detail';
import BandTitle from '../screens/Home/BandTitle';
import Reservation from '../screens/Home/Reservation';
import ReservationDetail from '../screens/Home/ReservationDetail';
import SelectLocation from '../screens/Home/SelectLocation';
import SelectCategory from '../screens/Home/SelectCategory';
import DutchPayStatus from '../screens/Payment/DutchPayStatus';
const Stack = createStackNavigator();
// @refresh reset
const HomeNavigator = props => {
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
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DutchPayList"
        component={DutchPayList}
        options={{ headerShown: true, headerTitle: '1/N 정산 목록' }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{
          headerShown: true,
          headerTitle: '그룹',
        }}
      />
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{ headerShown: true, headerTitle: '그룹 게시글' }}
      />
      <Stack.Screen
        name="ChoosePic"
        component={ChoosePic}
        options={{
          headerShown: true,
          headerTitle: '미디어 선택',
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
        name="Preview"
        component={Preview}
        options={{ headerShown: true, headerTitle: '미리보기' }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: true, headerTitle: '게시글' }}
      />
      <Stack.Screen
        name="WriteContent"
        component={WriteContent}
        options={{
          headerShown: true,
          headerTitle: '게시글 작성',
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
        name="HomeMeetingDetail"
        component={MeetingDetail}
        options={{
          headerShown: true,
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
        name="MeetingDetail"
        component={MeetingDetail}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="MeetingList"
        component={MeetingList}
        options={{
          headerShown: true,
          headerTitle: '미팅 목록',
        }}
      />
      <Stack.Screen
        name="HomeDutchPayStatus"
        component={DutchPayStatus}
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
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          headerShown: true,
          // headerTitle: '일정 생성',
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
        name="Reservation"
        component={Reservation}
        options={{
          headerShown: true,
          headerTitle: '간편예약',
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
        name="ReservationDetail"
        component={ReservationDetail}
        options={{
          headerShown: true,
          headerTitle: '간편예약',
        }}
      />
      <Stack.Screen
        name="SelectCategory"
        component={SelectCategory}
        options={{
          headerShown: true,
          headerTitle: '그룹 생성',
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
        name="BandTitle"
        component={BandTitle}
        options={{
          headerShown: true,
          headerTitle: '그룹 생성',
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
        name="FindingLocation"
        component={FindingLocation}
        options={{
          headerShown: true,
          headerTitle: '위치 검색',
          presentation: 'transparentModal',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
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
        name="SelectLocation"
        component={SelectLocation}
        options={{
          headerShown: true,
          headerTitle: '위치 선택',
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
        name="HomeSearchUser"
        component={SearchUser1}
        options={{
          headerShown: true,
          headerTitle: '사용자 검색',
          presentation: 'transparentModal',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
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
        name="FindingUser"
        component={SearchUser1}
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
    </Stack.Navigator>
  );
};
export default HomeNavigator;
