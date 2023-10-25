import { useRef } from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';

const MeetingLocation = ({ navigation, route }) => {
  const { latitude, longitude } = route.params;
  const { Images, Fonts, Colors } = useTheme();
  const mapRef = useRef(null);

  return (
    <>
      <View
        style={{
          zIndex: 100,
          position: 'absolute',
          top: responsiveHeight(51.5),
          left: responsiveWidth(10),
          width: responsiveWidth(35),
          height: responsiveWidth(35),
          borderRadius: responsiveWidth(200),
          backgroundColor: Colors.contentBackground,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HeaderLeftButton onPress={() => navigation.pop()} />
      </View>
      <MapView
        style={{
          flex: 1,
        }}
        showsUserLocation={false}
        userLocationUpdateInterval={1000}
        showsMyLocationButton={false}
        ref={mapRef}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0175,
          longitudeDelta: 0.0175,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        >
          <Image
            source={Images.dot}
            style={{
              width: responsiveWidth(40),
              height: responsiveWidth(40),
              resizeMode: 'contain',
            }}
          />
        </Marker>
      </MapView>
    </>
  );
};

export default MeetingLocation;
