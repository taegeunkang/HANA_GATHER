import { useTheme } from '../../hooks';
import {
  formatDate,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import { View, Text } from 'react-native';
import { addCommasToNumber } from '../../utils/utils';
const Transaction = ({ from, amount, balance, date, isWithdraw }) => {
  const { Fonts, Colors, Images } = useTheme();
  return (
    <View
      style={{
        width: responsiveWidth(370),
        height: responsiveHeight(92),
        borderBottomWidth: responsiveWidth(3),
        borderColor: Colors.screenBackground,
        backgroundColor: Colors.contentBackground,
      }}
    >
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: responsiveHeight(5),
        }}
      >
        <Text
          style={[{ color: Colors.textNormal }, Fonts.contentRegularRegualr]}
        >
          {formatDate(date)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: responsiveHeight(50),
        }}
      >
        <View style={{ height: responsiveHeight(40) }}>
          <Text
            style={[
              { color: Colors.textBold, marginRight: responsiveWidth(5) },
              Fonts.contentMediumBold,
            ]}
          >
            {from}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            // backgroundColor: Colors.black,
            height: responsiveHeight(50),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: responsiveWidth(100),
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={[
                {
                  color: isWithdraw ? Colors.withdraw : Colors.deposit,
                  marginRight: responsiveWidth(5),
                },
                Fonts.contentMediumBold,
              ]}
            >
              {isWithdraw ? '출금' : '입금'}
            </Text>
            <Text style={Fonts.contentMediumRegualr}>
              {addCommasToNumber(amount)}원
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: responsiveWidth(100),
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={[
                {
                  color: Colors.textBold,
                },
                Fonts.contentMediumBold,
              ]}
            >
              잔액
            </Text>
            <Text>{addCommasToNumber(balance)}원</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Transaction;
