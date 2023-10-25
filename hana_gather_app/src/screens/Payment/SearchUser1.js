import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { API_URL } from '../../utils/constants';
import { useTheme } from '../../hooks';
import UserCell1 from '../../components/Content/UserCell1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reIssue } from '../../utils/login';
// 첫 화면 -> 검색기록 없을 때, 있을 때,
// 검색 후 -> 결과 잇을 때, 없을 때

const SearchUser1 = ({ navigation, route }) => {
  const { bandId, before } = route.params || {
    bandId: null,
    before: 'Payment',
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={before == 'GroupDetail'}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={
            before == 'GroupDetail'
              ? submit
              : () => navigation.navigate(before, { friends: friends })
          }
          style={{
            backgroundColor: Colors.transparent,
            width: responsiveWidth(60),
            height: responsiveHeight(30),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              Fonts.contentMediumBold,
              {
                color: Colors.primary,
              },
            ]}
          >
            완료
          </Text>
        </TouchableOpacity>
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
  const [friends, setFriends] = useState([]);

  const submit = async () => {
    const response = await fetch(API_URL + `/core/band/invitation`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bandId: bandId,
        members: friends.map((friend, index) => friend.email),
      }),
    });

    switch (response.status) {
      case 200:
        navigation.pop();
        break;
    }
  };

  const searchUser = async () => {
    if (typing) return;

    setSearching(true);
    if (before == 'GroupDetail') {
      const response = await fetch(
        API_URL +
          `/core/band/search/user?bandId=${bandId}&word=${inpt}&page=${0}&size=${size}`,
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
          }
          break;
      }
    } else if (before == 'CreateGroup') {
      const response = await fetch(
        API_URL +
          `/core/band/search/user/participating?bandId=${bandId}&word=${inpt}&page=${0}&size=${size}`,
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
    } else {
      const response = await fetch(
        API_URL + `/user/search?word=${inpt}&page=${0}&size=${size}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
        },
      );
      console.log(response.status);

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
    }

    setPage(0);
    setSearching(false);
  };

  const WaitFortypingEnd = async e => {
    setTyping(true);
    setInpt(e);
    if (e == '') setTyping(false);
    else {
      setTimeout(() => setTyping(false), 1000);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    if (before == 'GroupDetail') {
      const response = await fetch(
        API_URL +
          `/core/band/search/user?bandId=${bandId}&word=${inpt}&page=${
            page + 1
          }&size=${size}`,
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
    } else if (before == 'CreateGroup') {
      const response = await fetch(
        API_URL +
          `/core/band/search/user/participating?bandId=${bandId}&word=${inpt}&page=${
            page + 1
          }&size=${size}`,
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
    } else {
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
    }
    setLoading(false);
  };

  const addFriends = async user => {
    let a = friends;
    a = a.concat(user);
    setFriends(a);
  };

  const subFriends = async user => {
    let a = [];
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].email == user.email) {
        continue;
      }
      a.push(friends[i]);
    }
    setFriends(a);
  };

  const isAdded = user => {
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].email == user.email) {
        return true;
      }
    }
    return false;
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
              <UserCell1
                key={index}
                nickname={user.nickname}
                profileImage={user.profileImage}
                closeAvailable={true}
                onAdd={() => addFriends(user)}
                onSub={() => subFriends(user)}
                isAdded={isAdded(user)}
                isContained={before == 'CreateGroup' ? 0 : user.status}
              />
            ))}
          </View>
        </ScrollView>
      )}
      {(typing || searching) && (
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

export default SearchUser1;
