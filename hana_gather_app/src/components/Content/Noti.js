import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const Noti = ({ id, message, profileImage, onPress }) => {
  const { Fonts, Colors } = useTheme();
  const [p, setP] = useState(false);

  const pressed = async () => {
    if (isPressed()) {
      onPress();
      return;
    }

    let a = JSON.parse(await AsyncStorage.getItem('pressedNotification'));
    if (a == null) a = [];
    a.push(id);
    await AsyncStorage.setItem('pressedNotification', JSON.stringify(a));
    setP(true);
    onPress();
  };

  const isPressed = async () => {
    let b = JSON.parse(await AsyncStorage.getItem('pressedNotification'));
    if (b == null) return;
    for (let i = 0; i < b.length; i++) {
      if (b[i] == id) {
        setP(true);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    isPressed();
  }, [p]);

  return (
    <Pressable
      onPress={pressed}
      style={{
        width: '100%',
        height: responsiveHeight(55),
        backgroundColor: p ? Colors.screenBackground : Colors.contentBackground,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: responsiveWidth(370),
          height: responsiveHeight(55),
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: Colors.screenBackground,
          borderBottomWidth: responsiveHeight(1),
        }}
      >
        <FastImage
          source={{
            uri: API_URL + `/user/profile/image?watch=${profileImage}`,
            priority: FastImage.priority.normal,
          }}
          style={{
            width: responsiveWidth(35),
            height: responsiveWidth(35),
            borderRadius: responsiveWidth(100),
            marginRight: responsiveWidth(10),
          }}
        />

        <Text
          style={[
            Fonts.contentMediumMedium,
            { color: Colors.textNormal, width: responsiveWidth(300) },
          ]}
        >
          {message}
        </Text>
      </View>
    </Pressable>
  );
};

export default Noti;
