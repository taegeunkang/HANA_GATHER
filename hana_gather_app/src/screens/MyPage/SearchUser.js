import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import UserCell from '../../components/Content/UserCell';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
// 첫 화면 -> 검색기록 없을 때, 있을 때,
// 검색 후 -> 결과 잇을 때, 없을 때

const SearchUser = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={true}
        />
      ),
    });
  });

  const { Colors, Fonts, Images } = useTheme();
  const { t } = useTranslation('content');
  const [inpt, setInpt] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchUser = async () => {
    if (typing) return;
    setSearching(true);

    const response = await fetch(
      API_URL + `/user/search?word=${inpt}&page=${0}&size=${size}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    switch (response.status) {
      case 200:
        const r = await response.json();
        setUserList(r);
        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await searchUser();
            break;
        }
        break;
    }
    setPage(0);
    setSearching(false);
  };

  const WaitFortypingEnd = async e => {
    setTyping(true);
    setInpt(e);
    if (e == '') setTyping(false);
    else {
      setTimeout(() => setTyping(false), 1500);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      API_URL + `/user/search?word=${inpt}&page=${page + 1}&size=${size}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    if (response.status == 200) {
      const r = await response.json();

      if (r.length > 0) setPage(page + 1);

      let a = userList;
      a = a.concat(r);
      setUserList(a);
    } else if (response.status == 400) {
      const k = await response.json();

      switch (k['code']) {
        case 'U08':
          await reIssue();
          await fetchData();
          break;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    searchUser();
  }, [typing]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
      paddingVertical: responsiveHeight(20),
    },
    loginInput: {
      height: responsiveHeight(48),
      width: responsiveWidth(370),
      borderRadius: responsiveWidth(12),
      backgroundColor: Colors.screenBackground,
      paddingHorizontal: responsiveWidth(10),
      color: Colors.textNormal,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginInput}>
        <Image
          source={Images.searchNotSelect}
          style={{ width: responsiveWidth(25), height: responsiveHeight(25) }}
        />

        <TextInput
          style={{
            flex: 1,
            textAlign: 'left',
            marginLeft: responsiveWidth(10),
            color: Colors.inputContent,
          }}
          placeholder={t('search.user')}
          placeholderTextColor={Colors.inputPlaceHolder}
          onChangeText={e => WaitFortypingEnd(e)}
          value={inpt}
        />
      </View>

      <View style={{ marginTop: responsiveHeight(20) }} />
      {!typing && !searching && userList && (
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (loading) return;

            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - responsiveHeight(70);
            if (isCloseToBottom && !loading) {
              fetchData();
            }
          }}
          scrollEventThrottle={400}
        >
          <View
            style={{
              width: Dimensions.get('screen').width,
              alignItems: 'center',
            }}
          >
            {userList.map((user, index) => (
              <UserCell
                key={index}
                name={user.nickname}
                profileImage={user.profileImage}
                closeAvailable={true}
                onPress={() => navigation.navigate('InputAmount', { ...user })}
                // onClose={() => removeHistory(history)}
              />
            ))}
          </View>
        </ScrollView>
      )}
      {typing && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchUser;
