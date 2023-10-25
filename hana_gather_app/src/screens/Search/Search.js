import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import BandCell from '../../components/Content/BandCell';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';

const Search = ({ navigation, route }) => {
  const { Colors, Fonts, Images } = useTheme();
  const [inpt, setInpt] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [bandList, setBandList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [searching, setSearching] = useState(false);

  const init = async () => {
    const response = await fetch(
      API_URL + `/core/band/search?word=${inpt}&page=${0}&size=${size}`,
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
        setBandList(r);
        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await init();
            break;
        }
        break;
    }
  };

  const searchBand = async () => {
    if (typing) return;

    setSearching(true);

    const response = await fetch(
      API_URL + `/core/band/search?word=${inpt}&page=${0}&size=${size}`,
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
        setBandList(r);
        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await searchBand();
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
      setTimeout(() => setTyping(false), 1000);
    }
  };

  const fetchData = async () => {
    if (inpt && inpt.trim().length > 0) {
      setLoading(true);
      const response = await fetch(
        API_URL +
          `/core/band/search?word=${inpt}&page=${page + 1}&size=${size}`,
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

        let a = bandList;
        a = a.concat(r);
        setBandList(a);
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
    }
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    searchBand();
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
          placeholder={'그룹 검색'}
          placeholderTextColor={Colors.inputPlaceHolder}
          onChangeText={e => WaitFortypingEnd(e)}
          value={inpt}
        />
      </View>

      <View style={{ marginTop: responsiveHeight(20) }} />
      {!typing && !searching && bandList && (
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
          {bandList.map((band, index) => (
            <BandCell key={index} {...band} />
          ))}
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

export default Search;
