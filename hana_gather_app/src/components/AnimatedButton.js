import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useTheme } from '../hooks';
import { responsiveHeight, responsiveWidth } from '../utils/utils';
const AnimatedButton = ({
  onPress,
  title,
  width,
  height,
  loading,
  backgroundColor,
  textColor,
  image,
}) => {
  const { Fonts, Gutters, Colors } = useTheme();
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
    loginButtonText: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor
        ? backgroundColor
        : Colors.buttonFirstBackground,
      borderRadius: responsiveWidth(18),
      borderWidth: responsiveWidth(5),
      borderColor: Colors.screenBackground,
      shadowColor: '#171717',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });

  return (
    <View>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          onPressIn={onButtonPressIn}
          onPressOut={onButtonPressOut}
          onPress={onPress}
          activeOpacity={1}
          style={[
            !width
              ? { width: responsiveWidth(370) }
              : { width: responsiveWidth(width) },
            !height
              ? { height: responsiveHeight(48) }
              : { height: responsiveHeight(height) },
            styles.loginButtonText,
          ]}
        >
          {loading ? (
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
              color={Colors.buttonFirstContent}
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={image}
                style={{
                  width: responsiveWidth(50),
                  height: responsiveWidth(50),

                  marginBottom: responsiveHeight(5),
                }}
              />
              <Text
                style={[
                  Fonts.contentMediumBold,
                  { color: textColor ? textColor : Colors.buttonFirstContent },
                ]}
              >
                {title}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AnimatedButton;
