import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import SubmitButton from '../SubmitButton';
import SubmitButton2 from '../SubmitButton2';
const User = ({ memberId, nickname, profileImage, payed }) => {
  const { Fonts, Colors, Images } = useTheme();
  return (
    <View
      style={{
        width: responsiveWidth(350),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: responsiveHeight(10),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FastImage
          source={{
            uri: API_URL + `/user/profile/image?watch=${profileImage}`,
            priority: FastImage.priority.normal,
          }}
          style={{
            width: responsiveWidth(35),
            height: responsiveHeight(35),
            borderRadius: responsiveWidth(100),
            backgroundColor: Colors.screenBackground,
            marginRight: responsiveWidth(10),
          }}
        />

        <Text style={[Fonts.contentMediumBold, { color: Colors.textBold }]}>
          {nickname}
        </Text>
      </View>
      {payed ? (
        <SubmitButton
          title={'결제 완료'}
          width={responsiveWidth(70)}
          height={responsiveHeight(35)}
        />
      ) : (
        <SubmitButton2
          title={'미결제'}
          width={responsiveWidth(70)}
          height={responsiveHeight(35)}
        />
      )}
    </View>
  );
};

export default User;
