import { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { BASE_HEIGHT } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import SubmitButton from '../SubmitButton';
const LocationName = ({ cancel, title, description, submit }) => {
  const { Fonts, Colors } = useTheme();
  const [inpt, setInpt] = useState('');

  const calcKeyboardHeight = height => {
    return height / BASE_HEIGHT;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.transparent,
      justifyContent: 'flex-end',
    },
    popUp: {
      width: '100%',
      height: '28%',
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    content: {
      width: responsiveWidth(370),
      backgroundColor: Colors.contentBackground,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        width: Dimensions.get('screen').width,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={calcKeyboardHeight(
        Dimensions.get('screen').height,
      )}
    >
      <Pressable style={styles.container} onPress={cancel}>
        <SafeAreaView style={styles.popUp}>
          <View
            style={{
              width: '100%',
              backgroundColor: Colors.contentBackground,
              alignItems: 'center',
            }}
          >
            <View style={styles.content}>
              <Text
                style={[
                  Fonts.contentLargeBold,
                  {
                    marginBottom: responsiveHeight(5),
                    color: Colors.textBold,
                    marginTop: responsiveHeight(10),
                  },
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  Fonts.contentMediumMedium,
                  {
                    color: Colors.textNormal,
                  },
                ]}
              >
                {description}
              </Text>

              <TextInput
                value={inpt}
                onChangeText={e => setInpt(e)}
                style={{
                  width: responsiveWidth(370),
                  height: responsiveHeight(50),
                  borderRadius: responsiveWidth(12),
                  borderColor: Colors.primary,
                  borderWidth: responsiveWidth(1),
                  marginTop: responsiveHeight(15),
                  paddingHorizontal: responsiveWidth(5),
                }}
                maxLength={20}
              />
            </View>
            <View
              style={{
                height: responsiveHeight(75),
                justifyContent: 'center',
              }}
            >
              <SubmitButton onPress={() => submit(inpt)} title={'다음'} />
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default LocationName;
