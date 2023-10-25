import { useLayoutEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { useTheme } from '../../hooks';
import {
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
const ReservationDetail = ({ navigation }) => {
  const { Fonts, Colors, Images } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={false}
        />
      ),
    });
  });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.contentBackground }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: Colors.contentBackground,
        }}
      >
        <Image
          source={Images.sample}
          style={{ width: '100%', height: responsiveHeight(200) }}
        />
        <View
          style={{
            width: responsiveWidth(370),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: responsiveHeight(10),
          }}
        >
          <Text style={[Fonts.contentLargeBold, { color: Colors.textBold }]}>
            초심 스터디카페 강남점
          </Text>
          <View
            style={{
              width: '100%',
              height: responsiveHeight(45),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Text
              style={[Fonts.contentMediumMedium, { color: Colors.textNormal }]}
            >
              위치보기
            </Text>
            <Image
              source={Images.rightChevron}
              style={{
                width: responsiveWidth(10),
                height: responsiveWidth(10),
              }}
            />
          </View>
        </View>

        {/* 상품 목록 */}

        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            borderBottomColor: Colors.screenBackground,
            borderBottomWidth: responsiveHeight(5),
            // backgroundColor: 'black',
          }}
        >
          <View style={{ width: '70%', justifyContent: 'flex-start' }}>
            <Text style={[Fonts.contentLargeBold, { color: Colors.primary }]}>
              자유석
            </Text>
            <Text style={[Fonts.contentMediumBold, { color: Colors.warn }]}>
              {numberToWon(5800)}원
            </Text>
            <Text>시간제 자유석 입니다.</Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={Images.sample4}
              style={{
                width: responsiveWidth(95),
                height: responsiveWidth(95),
                borderRadius: responsiveWidth(12),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            borderBottomColor: Colors.screenBackground,
            borderBottomWidth: responsiveHeight(5),
            // backgroundColor: 'black',
          }}
        >
          <View style={{ width: '70%', justifyContent: 'flex-start' }}>
            <Text style={[Fonts.contentLargeBold, { color: Colors.primary }]}>
              스터디룸1 (4인)
            </Text>
            <Text style={[Fonts.contentMediumBold, { color: Colors.warn }]}>
              {numberToWon(3000)}원
            </Text>
            <Text>
              각종 스터디 모임, 조별과제, 회의 또는 여럿이 공부하기에 적합한
              공간입니다.
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={Images.sample4}
              style={{
                width: responsiveWidth(95),
                height: responsiveWidth(95),
                borderRadius: responsiveWidth(12),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            borderBottomColor: Colors.screenBackground,
            borderBottomWidth: responsiveHeight(5),
            // backgroundColor: 'black',
          }}
        >
          <View style={{ width: '70%', justifyContent: 'flex-start' }}>
            <Text style={[Fonts.contentLargeBold, { color: Colors.primary }]}>
              스터디룸2 (4인)
            </Text>
            <Text style={[Fonts.contentMediumBold, { color: Colors.warn }]}>
              {numberToWon(3000)}원
            </Text>
            <Text>
              각종 스터디 모임, 조별과제, 회의 또는 여럿이 공부하기에 적합한
              공간입니다.
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={Images.sample4}
              style={{
                width: responsiveWidth(95),
                height: responsiveWidth(95),
                borderRadius: responsiveWidth(12),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            borderBottomColor: Colors.screenBackground,
            borderBottomWidth: responsiveHeight(5),
            // backgroundColor: 'black',
          }}
        >
          <View style={{ width: '70%', justifyContent: 'flex-start' }}>
            <Text style={[Fonts.contentLargeBold, { color: Colors.primary }]}>
              스터디룸3 (6인)
            </Text>
            <Text style={[Fonts.contentMediumBold, { color: Colors.warn }]}>
              {numberToWon(3000)}원
            </Text>
            <Text>
              각종 스터디 모임, 조별과제, 회의 또는 여럿이 공부하기에 적합한
              공간입니다.
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={Images.sample4}
              style={{
                width: responsiveWidth(95),
                height: responsiveWidth(95),
                borderRadius: responsiveWidth(12),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(120),
            flexDirection: 'row',
            borderBottomColor: Colors.screenBackground,
            borderBottomWidth: responsiveHeight(5),
            // backgroundColor: 'black',
          }}
        >
          <View style={{ width: '70%', justifyContent: 'flex-start' }}>
            <Text style={[Fonts.contentLargeBold, { color: Colors.primary }]}>
              스터디룸4 (6인)
            </Text>
            <Text style={[Fonts.contentMediumBold, { color: Colors.warn }]}>
              {numberToWon(3000)}원
            </Text>
            <Text>
              각종 스터디 모임, 조별과제, 회의 또는 여럿이 공부하기에 적합한
              공간입니다.
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={Images.sample4}
              style={{
                width: responsiveWidth(95),
                height: responsiveWidth(95),
                borderRadius: responsiveWidth(12),
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReservationDetail;
