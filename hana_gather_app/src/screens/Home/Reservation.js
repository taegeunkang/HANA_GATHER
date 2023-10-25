import { useLayoutEffect } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { useTheme } from '../../hooks';
import {
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
const Reservation = ({ navigation }) => {
  const { Fonts, Colors, Images } = useTheme();

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
  return (
    <ScrollView style={{ backgroundColor: Colors.screenBackground }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: Colors.screenBackground,
        }}
      >
        <View
          style={{
            width: responsiveWidth(370),
            justifyContent: 'space-between',
            paddingVertical: responsiveHeight(10),
            flexDirection: 'row',
          }}
        >
          <Pressable onPress={() => navigation.navigate('ReservationDetail')}>
            <Image
              source={Images.sample}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              초심 스터디카페 강남점
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(5800)}원
            </Text>
          </Pressable>
          <View>
            <Image
              source={Images.sample1}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              에스랩 스터디카페
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(6000)}원
            </Text>
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            justifyContent: 'space-between',
            paddingVertical: responsiveHeight(10),
            flexDirection: 'row',
          }}
        >
          <View>
            <Image
              source={Images.sample2}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              AAA 스터디카페
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(4300)}원
            </Text>
          </View>
          <View>
            <Image
              source={Images.sample3}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              스터디수 스터디카페
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(6000)}원
            </Text>
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            justifyContent: 'space-between',
            paddingVertical: responsiveHeight(10),
            flexDirection: 'row',
          }}
        >
          <View>
            <Image
              source={Images.sample4}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              스터디카페 더 딩글 서초교대점
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(4300)}원
            </Text>
          </View>
          <View>
            <Image
              source={Images.sample5}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              sol 스터디카페
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(6000)}원
            </Text>
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            justifyContent: 'space-between',
            paddingVertical: responsiveHeight(10),
            flexDirection: 'row',
          }}
        >
          <View>
            <Image
              source={Images.sample6}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              프리즘 스터디센터
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(4300)}원
            </Text>
          </View>
          <View>
            <Image
              source={Images.sample7}
              style={{
                width: responsiveWidth(180),
                height: responsiveWidth(180),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
              }}
            />
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  marginTop: responsiveHeight(10),
                },
              ]}
            >
              토즈 역삼점
            </Text>
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  width: responsiveWidth(180),
                  color: Colors.warn,
                },
              ]}
            >
              1시간 {numberToWon(6000)}원
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Reservation;
