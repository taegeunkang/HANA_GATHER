import { Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import {
  formatDate,
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import More from './More';
const OngoingPayout = ({
  createdDate,
  profileImages,
  totalAmount,
  onPress,
}) => {
  const { Fonts, Colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: responsiveHeight(100),
        backgroundColor: Colors.contentBackground,
        borderRadius: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(20),
        paddingVertical: responsiveHeight(10),
        justifyContent: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            { marginRight: responsiveWidth(10), color: Colors.textBold },
            Fonts.contentMediumBold,
          ]}
        >
          날짜
        </Text>
        <Text style={[Fonts.contentMeidumMedium, { color: Colors.textNormal }]}>
          {formatDate(createdDate)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            { marginRight: responsiveWidth(10), color: Colors.textBold },
            Fonts.contentMediumBold,
          ]}
        >
          인원
        </Text>

        <View style={{ flexDirection: 'row' }}>
          {profileImages.map((profileImage, index) => {
            if (index < 3) {
              return (
                <FastImage
                  source={{
                    uri: API_URL + `/user/profile/image?watch=${profileImage}`,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    width: responsiveWidth(35),
                    height: responsiveWidth(35),
                    borderRadius: responsiveWidth(100),
                    backgroundColor: Colors.screenBackground,
                    marginRight: responsiveWidth(5),
                    resizeMode: 'cover',
                  }}
                />
              );
            }
          })}
          {profileImages.length - 3 > 0 && (
            <More count={profileImages.length - 3} />
          )}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            { marginRight: responsiveWidth(10), color: Colors.textBold },
            Fonts.contentMediumBold,
          ]}
        >
          총 금액
        </Text>
        <Text style={[Fonts.contentMeidumMedium, { color: Colors.textNormal }]}>
          {numberToWon(totalAmount)}원
        </Text>
      </View>
    </Pressable>
  );
};
export default OngoingPayout;
