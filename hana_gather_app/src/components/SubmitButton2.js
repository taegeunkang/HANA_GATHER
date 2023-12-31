import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../hooks';
import { responsiveHeight, responsiveWidth } from '../utils/utils';

const SubmitButton2 = ({onPress, title, width, height, loading}) => {
  const {Fonts, Gutters, Colors} = useTheme();
  const scaleValue = useState(new Animated.Value(1))[0];

  const onButtonPressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true, // 원활한 성능을 위해 네이티브 드라이버 사용
    }).start();
  };

  const onButtonPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true, // 원활한 성능을 위해 네이티브 드라이버 사용
    }).start();
  };

  const styles = StyleSheet.create({
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.buttonSecondBackground,
      borderRadius: responsiveWidth(12),
      flexDirection: 'row',
      position: 'relative',
    },
  });

  return (
    <View>
      <Animated.View style={{transform: [{scale: scaleValue}]}}>
        <TouchableOpacity
          onPressIn={onButtonPressIn}
          onPressOut={onButtonPressOut}
          onPress={onPress}
          activeOpacity={1}
          style={[
            !width
              ? {width: responsiveWidth(370)}
              : {width: responsiveWidth(width)},
            !height
              ? {height: responsiveHeight(48)}
              : {height: responsiveHeight(height)},
            styles.btn,
          ]}>
          <Text
            style={[
              Fonts.contentMediumBold,
              {color: Colors.buttonSecondContent},
            ]}>
            {title}
          </Text>
          {loading && (
            <ActivityIndicator
              size={'small'}
              style={[
                Gutters.largeVMargin,
                {
                  width: responsiveWidth(25),
                  height: responsiveHeight(25),
                  marginLeft: responsiveWidth(5),
                  position: 'absolute',
                  right: responsiveWidth(10),
                },
              ]}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SubmitButton2;
