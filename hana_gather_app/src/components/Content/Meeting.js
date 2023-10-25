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
const Meeting = ({
  title,
  amount,
  locationName,
  meetingDate,
  meetingId,
  members,
  onPress,
  titleVisible,
}) => {
  const { Fonts, Colors, Images } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: responsiveHeight(150),
        backgroundColor: Colors.contentBackground,
        borderRadius: responsiveWidth(16),
        borderWidth: responsiveWidth(3),
        borderColor: Colors.screenBackground,
        paddingHorizontal: responsiveWidth(20),
        paddingVertical: responsiveHeight(10),
        justifyContent: 'center',
      }}
    >
      {titleVisible && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              { marginRight: responsiveWidth(10), color: Colors.textBold },
              Fonts.contentLargeBold,
            ]}
          >
            {title}
          </Text>
        </View>
      )}

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
          {formatDate(meetingDate)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            { marginRight: responsiveWidth(10), color: Colors.textBold },
            Fonts.contentMediumBold,
          ]}
        >
          장소
        </Text>
        <Text style={[Fonts.contentMeidumMedium, { color: Colors.textNormal }]}>
          {locationName}
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
          {members &&
            members.map((member, index) => {
              if (index > 2) return;
              return (
                <FastImage
                  source={{
                    uri:
                      API_URL +
                      `/user/profile/image?watch=${member.profileImage}`,
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
            })}
          {members && members.length - 3 > 0 && (
            <More count={members.length - 3} />
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
          회비
        </Text>
        <Text style={[Fonts.contentMeidumMedium, { color: Colors.textNormal }]}>
          {numberToWon(amount)}원
        </Text>
      </View>
    </Pressable>
  );
};
export default Meeting;
