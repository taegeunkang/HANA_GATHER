import { useTheme } from '../hooks';
import { Image, TouchableOpacity, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../utils/utils';
const HeaderLeftButton = ({ onPress, close }) => {
  const { Images } = useTheme();
  return (
    <TouchableOpacity
      style={{
        width: responsiveWidth(35),
        height: responsiveHeight(25),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: responsiveWidth(10),
      }}
      onPress={onPress}
    >
      <Image
        source={close ? Images.close : Images.leftChevron}
        style={{ width: responsiveWidth(15), height: responsiveHeight(15) }}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeftButton;
