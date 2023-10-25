import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../hooks';
import { useEffect, useState, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { responsiveHeight } from '../../utils/utils';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';

const Account = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
    });
  });
  const { Colors, Fonts } = useTheme();
  const [loading, setLoading] = useState(true);

  const getAccount = async () => {
    const response = await fetch(API_URL + '/core/profile/account/create', {
      method: 'POST',
    });

    switch (response.status) {
      case 200:
        const r = await response.json();
        navigation.navigate('SelectAccount', {
          account: r.account,
          balance: r.balance,
        });
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getAccount();
            break;
        }
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getAccount();
    }, 1500); // 2초 후에 SelectAccount 화면으로 이동

    return () => clearTimeout(timeout);
  });
  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.contentBackground,
          }}
        >
          <Text
            style={[
              Fonts.contentLargeBold,
              { position: 'absolute', top: responsiveHeight(230) },
            ]}
          >
            계좌를 찾고 있습니다.
          </Text>
          <ActivityIndicator
            size={'large'}
            color={Colors.primary}
            style={{ marginTop: responsiveHeight(50) }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Account;
