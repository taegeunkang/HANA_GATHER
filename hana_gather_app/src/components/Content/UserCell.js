import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import SubmitButton3 from '../SubmitButton3';
const UserCell = ({ profileImage, name, onPress }) => {
  const { Images, Fonts, Colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FastImage
          source={{
            uri: API_URL + `/user/profile/image?watch=${profileImage}`,
            priority: FastImage.priority.normal,
          }}
          style={{
            width: responsiveWidth(35),
            height: responsiveWidth(35),
            borderRadius: responsiveWidth(100),
          }}
        />

        <Text
          style={[
            Fonts.contentMediumMedium,
            { color: Colors.textNormal, marginLeft: responsiveWidth(5) },
          ]}
        >
          {name}
        </Text>
      </View>

      <SubmitButton3 title={'선택'} width={35} height={35} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(370),
    height: responsiveHeight(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default UserCell;
