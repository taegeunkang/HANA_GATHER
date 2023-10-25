import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Invitation from '../../components/Content/Invitation';
import Noti from '../../components/Content/Noti';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const Notification = ({ navigation }) => {
  const { Fonts, Colors, Images } = useTheme();
  const [notifications, setNotifications] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [modlaVisible, setModalVisible] = useState(false);
  const [selected, setSelcted] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={{
            width: responsiveWidth(45),
            height: responsiveWidth(35),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={Images.detail}
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      ),
    });
  });
  const init = async () => {
    await getNotification();
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      API_URL + `/core/notification?page=${page + 1}&size=${size}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    if (response.status == 200) {
      const r = await response.json();
      if (r.length > 0) setPage(page + 1);
      let a = notifications;
      a = a.concat(r);
      setNotifications(a);
    } else if (response.status == 400) {
      const k = await response.json();
      switch (k.code) {
        case 'U08':
          await reIssue();
          await fetchData();
          break;
      }
    }
    setLoading(false);
  };

  const getNotification = async () => {
    const response = await fetch(
      API_URL + `/core/notification?page=${0}&size=${size}`,
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

        setNotifications(r);
        break;

      case 400:
        break;
    }
  };

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    getNotification();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  useEffect(() => {
    init();
  }, []);
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.contentBackground },
  });
  return (
    <>
      <Modal visible={modlaVisible} animationType={'fade'} transparent={true}>
        <Invitation bandId={selected} onCancle={() => setModalVisible(false)} />
      </Modal>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            style={{ backgroundColor: Colors.contentBackground }}
          />
        }
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
          {notifications &&
            notifications.map((notification, index) => (
              <Noti
                key={index}
                id={notification.id}
                message={notification.message}
                profileImage={notification.profileImage}
                onPress={() => {
                  if (notification.dutchPayId != null) {
                    navigation.navigate('PayoutStatus', {
                      dutchPayId: notification.dutchPayId,
                      before: 'Notification',
                    });
                  } else if (notification.bandId != null) {
                    if (notification.invitation) {
                      setSelcted(notification.bandId);
                      setModalVisible(true);
                    } else {
                      navigation.navigate('ApplyList', {
                        bandId: notification.bandId,
                      });
                    }
                  }
                }}
              />
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Notification;
