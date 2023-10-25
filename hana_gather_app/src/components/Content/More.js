import { Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { responsiveWidth } from '../../utils/utils';
const More = ({ count }) => {
  const { Colors, Fonts } = useTheme();
  return (
    <View
      style={{
        width: responsiveWidth(35),
        height: responsiveWidth(35),
        borderRadius: responsiveWidth(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.buttonThirdBackground,
        marginRight: responsiveWidth(5),
      }}
    >
      <Text style={[Fonts.contentMediumBold, { color: Colors.textBold }]}>
        {'+' + count}
      </Text>
    </View>
  );
};

export default More;
