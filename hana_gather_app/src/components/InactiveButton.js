import { View, Text, TouchableOpacity, Image } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../utils/utils';
import { useTheme } from '../hooks';

const InactiveButton = ({ img, title, onPress }) => {
  const { Fonts, Colors } = useTheme();
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[
          { width: responsiveWidth(370), height: responsiveHeight(48) },
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.buttonThirdBackground,
            borderRadius: responsiveWidth(12),
            flexDirection: 'row',
            position: 'relative',
          },
          ,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            width: responsiveWidth(150),
          }}
        >
          <Image
            source={img}
            style={{
              width: responsiveWidth(25),
              height: responsiveWidth(25),
              resizeMode: 'contain',
              marginRight: responsiveWidth(15),
            }}
          />
          <Text
            style={[
              Fonts.contentMediumBold,
              {
                color: Colors.buttonThirdContent,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InactiveButton;
