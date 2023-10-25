import { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, Text, View } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkNotifications,
  request,
  requestNotifications,
} from 'react-native-permissions';
import ActiveButton from '../../components/Content/ActiveButton';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import InactiveButton from '../../components/InactiveButton';
import { useTheme } from '../../hooks';
import { responsiveHeight } from '../../utils/utils';
const Permission = ({ navigation, route }) => {
  const { before } = route.prams || { before: null };
  const { t } = useTranslation('content');
  const { Fonts, Images, Colors } = useTheme();
  const [permissions, setPermissions] = useState({
    photo: false,
    location: false,
    notification: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        before == 'StartUp' ? (
          <></>
        ) : (
          <HeaderLeftButton
            onPress={() => {
              navigation.pop();
            }}
          />
        ),
    });
  });

  // const getCameraPermission = async () => {
  //   if (Platform.OS == 'ios') {
  //     const result = await request(PERMISSIONS.IOS.CAMERA);
  //     setPermissions({...permissions, camera: result == RESULTS.GRANTED});
  //   } else {
  //     const result = await request(PERMISSIONS.ANDROID.CAMERA);
  //     setPermissions({...permissions, camera: result == RESULTS.GRANTED});
  //   }
  // };
  const getAlbumPermission = async () => {
    if (Platform.OS == 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      setPermissions({ ...permissions, photo: result == RESULTS.GRANTED });
    } else {
      const result = await request(PERMISSIONS.ANDROID.PHOTO_LIBRARY);
      setPermissions({ ...permissions, photo: result == RESULTS.GRANTED });
    }
    modalClose();
  };

  const getNotificationPermission = async () => {
    const { status } = await requestNotifications(['alert', 'sound']);
    setPermissions({ ...permissions, notification: status == 'granted' });
  };

  const getLocationPermission = async () => {
    if (Platform.OS == 'ios') {
      const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      setPermissions({ ...permissions, location: result == RESULTS.GRANTED });
    } else {
      const result = await request(PERMISSIONS.ANDROID.LOCATION_ALWAYS);
      setPermissions({ ...permissions, location: result == RESULTS.GRANTED });
    }
    modalClose();
  };

  const checkPermissions = async () => {
    if (Platform.OS == 'ios') {
      // const camera = await check(PERMISSIONS.IOS.CAMERA);
      // const microphone = await check(PERMISSIONS.IOS.MICROPHONE);
      const photo = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const location = await check(PERMISSIONS.IOS.LOCATION_ALWAYS); // 혹은 LOCATION_ALWAYS
      const { status } = await checkNotifications();
      setPermissions({
        // camera: camera === RESULTS.GRANTED,
        // microphone: microphone === RESULTS.GRANTED,
        photo: photo === RESULTS.GRANTED,
        location: location === RESULTS.GRANTED,
        notification: status === 'granted',
      });
      modalClose();
    } else {
      // const camera = await check(PERMISSIONS.ANDROID.CAMERA);
      // const microphone = await check(PERMISSIONS.ANDROID.MICROPHONE);
      const photo = await check(PERMISSIONS.ANDROID.PHOTO_LIBRARY);
      const location = await check(PERMISSIONS.ANDROID.LOCATION_ALWAYS); // 혹은 LOCATION_ALWAYS
      const { status } = await checkNotifications();
      setPermissions({
        // camera: camera === RESULTS.GRANTED,
        // microphone: microphone === RESULTS.GRANTED,
        photo: photo === RESULTS.GRANTED,
        location: location === RESULTS.GRANTED,
        notification: status === 'granted',
      });
      modalClose();
    }
  };

  const modalClose = async () => {
    const photo = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    const location = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    const locationUsage = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    const { status } = await checkNotifications();
    if (
      photo == RESULTS.GRANTED &&
      (location == RESULTS.GRANTED || locationUsage == RESULTS.GRANTED) &&
      status == 'granted'
    ) {
      navigation.navigate('ProfileInit', { previous: before });
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.contentBackground,
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={[Fonts.contentLargeBold, { color: Colors.textBold }]}>
          하나모여 이용에 필요한 기능을
        </Text>
        <Text style={[Fonts.contentLargeBold, { color: Colors.textBold }]}>
          허용해 주세요.
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          height: responsiveHeight(230),
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {permissions.notification == false ? (
          <ActiveButton
            title={'알림 허용'}
            onPress={getNotificationPermission}
            img={Images.notificationPermissionNotSelect}
          />
        ) : (
          <InactiveButton
            title={'알림 허용'}
            img={Images.notificationPermissionSelect}
          />
        )}
        <View style={{ marginTop: responsiveHeight(10) }} />

        {permissions.photo == false ? (
          <ActiveButton
            title={'앨범 읽기/쓰기 허용'}
            onPress={getAlbumPermission}
            img={Images.albumPermissionNotSelect}
          />
        ) : (
          <InactiveButton
            title={'앨범 읽기/쓰기 허용'}
            img={Images.albumPermissionSelect}
          />
        )}

        <View style={{ marginTop: responsiveHeight(10) }} />
        {permissions.location == false ? (
          <ActiveButton
            title={'GPS 엑세스 허용'}
            onPress={getLocationPermission}
            img={Images.locationPermissionNotSelect}
          />
        ) : (
          <InactiveButton
            title={'GPS 엑세스 허용'}
            img={Images.locationPermissionSelect}
          />
        )}
        <View style={{ marginTop: responsiveHeight(20) }} />
      </View>
    </SafeAreaView>
  );
};

export default Permission;
