import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AnimatedButton from '../../components/AnimatedButton';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const SelectCategory = ({ navigation, route }) => {
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

  const { Fonts, Colors, Images } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: responsiveHeight(100),
          justifyContent: 'flex-end',
          marginBottom: responsiveHeight(50),
        }}
      >
        <Text style={[Fonts.contentLargeBold, { color: Colors.textBold }]}>
          어떤 종류의 그룹을 만들고 싶으신가요?
        </Text>
      </View>
      <View>
        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(15),
          }}
        >
          <AnimatedButton
            width={110}
            height={110}
            title={'스터디'}
            image={Images.study}
            backgroundColor={Colors.contentBackground}
            textColor={Colors.buttonThirdContent}
            onPress={() =>
              navigation.navigate('BandTitle', { category: 'study' })
            }
          />
          <AnimatedButton
            width={110}
            height={110}
            title={'스포츠'}
            image={Images.sports}
            backgroundColor={Colors.contentBackground}
            textColor={Colors.buttonThirdContent}
            onPress={() =>
              navigation.navigate('BandTitle', { category: 'sports' })
            }
          />

          <AnimatedButton
            width={110}
            height={110}
            title={'학교, 동아리'}
            image={Images.school}
            backgroundColor={Colors.contentBackground}
            textColor={Colors.buttonThirdContent}
            onPress={() =>
              navigation.navigate('BandTitle', { category: 'school' })
            }
          />
        </View>
        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(15),
          }}
        >
          <AnimatedButton
            width={110}
            height={110}
            title={'취미'}
            image={Images.hobby}
            backgroundColor={Colors.contentBackground}
            textColor={Colors.buttonThirdContent}
            onPress={() =>
              navigation.navigate('BandTitle', { category: 'hobby' })
            }
          />
          <AnimatedButton
            width={110}
            height={110}
            title={'회사'}
            image={Images.company}
            backgroundColor={Colors.contentBackground}
            textColor={Colors.buttonThirdContent}
            onPress={() =>
              navigation.navigate('BandTitle', { category: 'company' })
            }
          />

          <AnimatedButton
            width={110}
            height={110}
            title={'기타'}
            image={Images.etcGroup}
            backgroundColor={Colors.contentBackground}
            textColor={Colors.buttonThirdContent}
            onPress={() =>
              navigation.navigate('BandTitle', { category: 'etc' })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SelectCategory;
