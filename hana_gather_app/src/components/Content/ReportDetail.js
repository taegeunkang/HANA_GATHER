import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { useState } from 'react';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const ReportDetail = ({ cancel, onPress }) => {
  const { t } = useTranslation('register');
  const { Fonts, Colors, Images } = useTheme();

  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: responsiveWidth(370),
      borderRadius: responsiveWidth(12),
      backgroundColor: Colors.contentBackground,
    },
    btn: {
      width: responsiveWidth(370),
      height: responsiveHeight(70),
      alignItems: 'center',
      justifyContent: 'center',
    },

    last: {
      marginVertical: responsiveHeight(10),
      backgroundColor: Colors.contentBackground,
      borderRadius: responsiveWidth(12),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: responsiveWidth(370),
          // height: responsiveHeight(300),
          backgroundColor: Colors.contentBackground,
        }}
      >
        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(50),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: responsiveWidth(10),
            paddingVertical: responsiveHeight(10),
          }}
        >
          <TouchableOpacity onPress={cancel}>
            <Image
              source={Images.close}
              style={{
                width: responsiveWidth(20),
                height: responsiveWidth(20),
              }}
            />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={[
                Fonts.contentMediumBold,
                { marginRight: responsiveWidth(20), color: Colors.textBold },
              ]}
            >
              신고사유
            </Text>
          </View>
        </View>

        {/* 신고 사유 선택*/}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSelectedReason('지속적인 미참여');
            setSelectedType(1);
          }}
        >
          <Text
            style={[Fonts.contentMediumMedim, { color: Colors.textNormal }]}
          >
            {selectedReason === '지속적인 미참여' ? '✔️ ' : ''}
            {'지속적인 미참여'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {
            setSelectedReason('상습적인 회비 미결제');
            setSelectedType(2);
          }}
        >
          <Text
            style={[Fonts.contentMediumMedim, { color: Colors.textNormal }]}
          >
            {selectedReason === '상습적인 회비 미결제' ? '✔️ ' : ''}
            {'상습적인 회비 미결제'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => onPress(selectedReason, selectedType)}
        >
          <Text style={[Fonts.contentMediumBold, { color: Colors.primary }]}>
            제출
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReportDetail;
