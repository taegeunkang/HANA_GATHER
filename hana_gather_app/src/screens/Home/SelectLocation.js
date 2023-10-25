import {
  ActivityIndicator,
  Animated as Ani,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import LocationName from '../../components/Content/LocationName';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const SelectLocation = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={true}
        />
      ),
    });
  });
  const { bandId, category, thumbnail, members, title } = route.params;
  const [latitude, setLatitude] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [permission, setPermission] = useState(true);
  const [detailPressed, setDetailPressed] = useState(false);
  const mapRef = useRef(null);
  const { Gutters, Images, Colors } = useTheme();
  const scaleValue = useState(new Ani.Value(1))[0];
  const [modalVisible, setModalVisible] = useState(false);

  const onButtonPressIn = () => {
    Ani.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true, // 원활한 성능을 위해 네이티브 드라이버 사용
    }).start();
  };

  const onButtonPressOut = () => {
    Ani.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true, // 원활한 성능을 위해 네이티브 드라이버 사용
    }).start();
  };

  const getCurrentLocation = async () => {
    const location = await check(PERMISSIONS.IOS.LOCATION_ALWAYS); // 혹은 LOCATION_ALWAYS
    const locationUsage = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (location == RESULTS.GRANTED || locationUsage == RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position['coords']['latitude']);
          setLongitude(position['coords']['longitude']);
        },
        error => {
          console.log(error['code']);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
  };

  const checkPermissions = async () => {
    if (Platform.OS == 'ios') {
      const photo = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const location = await check(PERMISSIONS.IOS.LOCATION_ALWAYS); // 혹은 LOCATION_ALWAYS
      const locationUsage = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      setPermission(
        // camera === RESULTS.GRANTED &&
        // microphone === RESULTS.GRANTED &&
        photo === RESULTS.GRANTED &&
          (location === RESULTS.GRANTED || locationUsage === RESULTS.GRANTED),
      );
    } else {
      const photo = await check(PERMISSIONS.ANDROID.PHOTO_LIBRARY);
      const location = await check(PERMISSIONS.ANDROID.LOCATION_ALWAYS); // 혹은 LOCATION_ALWAYS

      setPermission(
        // camera === RESULTS.GRANTED &&
        // microphone === RESULTS.GRANTED &&
        photo === RESULTS.GRANTED && location === RESULTS.GRANTED,
      );
    }
  };

  const updatePosition = async position => {
    setLatitude(position['latitude']);
    setLongitude(position['longitude']);
  };

  const returnCurrentLocation = () => {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0175,
      longitudeDelta: 0.0175,
    });
  };

  useEffect(() => {
    getCurrentLocation();
    checkPermissions();
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.contentBackground,
    },
    map: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <LocationName
          title={'선택한 곳의 장소명을 입력해주세요'}
          cancel={() => setModalVisible(false)}
          description={'예) 강남역 1번 출구, 교보타워 앞'}
          submit={locationName => {
            setModalVisible(false);
            navigation.navigate('CreateGroup', {
              bandId: bandId,
              category: category,
              thumbnail: thumbnail,
              members: members,
              title: title,
              lat: latitude,
              lon: longitude,
              locationName: locationName,
            });
          }}
        />
      </Modal>
      {!latitude && !longitude && (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.contentBackground,
          }}
        >
          <ActivityIndicator
            size={'large'}
            color={Colors.primary}
            style={[Gutters.largeVMargin]}
          />
        </View>
      )}
      {latitude && longitude && (
        <>
          <Ani.View
            style={{
              width: responsiveWidth(45),
              height: responsiveWidth(45),
              position: 'absolute',
              bottom: responsiveHeight(70),
              left: responsiveWidth(20),
              backgroundColor: Colors.buttonSecondBackground,
              borderRadius: responsiveWidth(100),
              zIndex: detailPressed ? 0 : 100,
              shadowOffset: { width: 0, height: responsiveHeight(3) },
              shadowOpacity: 0.25,
              shadowRadius: responsiveWidth(3),
              shadowColor: '#000000',
              elevation: 3,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ scale: scaleValue }],
            }}
          >
            <Pressable
              onPressIn={onButtonPressIn}
              onPressOut={onButtonPressOut}
              style={{}}
              onPress={returnCurrentLocation}
            >
              <Image
                source={Images.currentLocation}
                style={{
                  width: responsiveWidth(35),
                  height: responsiveWidth(35),
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
          </Ani.View>
          <View
            style={{
              zIndex: 100,
              position: 'absolute',
              bottom: responsiveHeight(10),
              left: responsiveWidth(10),
              right: responsiveWidth(10),
            }}
          >
            <SubmitButton
              title={'선택 완료'}
              onPress={() => setModalVisible(true)}
            />
          </View>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            userLocationUpdateInterval={1000}
            showsMyLocationButton={false}
            ref={mapRef}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0175,
              longitudeDelta: 0.0175,
            }}
            onRegionChange={updatePosition}
          >
            <Image
              source={Images.dot}
              style={{
                width: responsiveWidth(55),
                height: responsiveWidth(55),
                resizeMode: 'contain',
              }}
            />
          </MapView>
        </>
      )}
      {/*  GPS허용 모달*/}
    </View>
  );
};

export default SelectLocation;
