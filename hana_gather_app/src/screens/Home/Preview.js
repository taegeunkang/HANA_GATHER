import { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Video from 'react-native-video';
import Square from './Square';
const Preview = ({ route }) => {
  const item = route.params.item;
  const [scale, setScale] = useState(1);
  const [paused, setPaused] = useState(false);

  const handleSingleTap = () => {
    setPaused(prevPaused => !prevPaused); // 동영상의 정지/재생 상태를 전환
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {item && item.substring(item.length - 3) === 'mp4' && (
        <TouchableWithoutFeedback onPress={handleSingleTap}>
          <Video
            source={{ uri: item }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            resizeMode="contain"
            paused={paused} // 비디오의 정지/재생 상태를 제어
          />
        </TouchableWithoutFeedback>
      )}
      {item && item.substring(item.length - 3) === 'png' && (
        <Square image={item} scale={scale} setScale={setScale} />
      )}
    </View>
  );
};

export default Preview;
