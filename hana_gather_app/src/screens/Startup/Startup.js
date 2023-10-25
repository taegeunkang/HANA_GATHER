import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useTheme } from '../../hooks';
import { setDefaultTheme } from '../../store/theme';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const Startup = ({ navigation }) => {
  const { Layout, Gutters, Colors, Images } = useTheme();
  setDefaultTheme({ theme: 'default', darkMode: false });
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );
    const token = await AsyncStorage.getItem('token');
    if (token == null) {
      navigation.reset({ routes: [{ name: 'Login' }] });
      return;
    }

    let response = await fetch(API_URL + '/user/login/check', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    switch (response.status) {
      case 200:
        response = await response.json();
        switch (response) {
          case 1:
            navigation.navigate('Permission', { before: 'StartUp' });
            break;
          case 2:
            navigation.navigate('PhoneVerification', { before: 'StartUp' });
            break;
          case 3:
            navigation.reset({ routes: [{ name: 'MainNavigator' }] });
            break;
        }
        break;
      case 400:
        response = await response.json();
        switch (response.code) {
          case 'U08':
            await reIssue();
            await init();
        }
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: Colors.contentBackground,
      }}
    >
      <Image
        source={Images.splash}
        style={{ width: responsiveWidth(100), height: responsiveWidth(100) }}
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: responsiveHeight(250),
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};
export default Startup;
