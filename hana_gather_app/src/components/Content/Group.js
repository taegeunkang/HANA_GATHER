import { Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import More from './More';
const Group = ({ bandId, category, thumbnail, members, title, onPress }) => {
  const { Fonts, Colors, Images } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: responsiveHeight(100),
        backgroundColor: Colors.contentBackground,
        borderRadius: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(10),
        paddingVertical: responsiveHeight(10),
        alignItems: 'center',
        marginBottom: responsiveHeight(5),
        flexDirection: 'row',
      }}
    >
      <FastImage
        source={{
          uri: API_URL + `/core/image?watch=${thumbnail}`,
          priority: FastImage.priority.normal,
        }}
        style={[
          {
            width: responsiveWidth(70),
            height: responsiveWidth(70),
            borderRadius: responsiveWidth(12),
            marginRight: responsiveWidth(20),
            resizeMode: 'cover',
          },
        ]}
      />

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: responsiveHeight(24),
                marginBottom: responsiveHeight(10),
              }}
            >
              <Text
                style={[
                  { marginRight: responsiveWidth(5), color: Colors.textBold },
                  Fonts.contentLargeBold,
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  Fonts.contentRegularMedium,
                  { color: Colors.textNormal },
                ]}
              >
                {category}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: responsiveHeight(10),
          }}
        >
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
      </View>
    </Pressable>
  );
};
export default Group;
