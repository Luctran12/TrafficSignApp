import React from 'react';
import { View, Text } from 'react-native';
import CameraScreen from './components/CameraScreen';
import { detectFromImage } from './tfliteHelper';
import { extractFrame } from './frameExtractor';

export default function App() {
  const handleVideoCaptured = async (videoPath: any) => {
    const framePath = await extractFrame(videoPath);
    if (framePath) {
      detectFromImage(framePath, (results: any) => {
        console.log("Kết quả nhận diện:", results);
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraScreen onVideoCaptured={handleVideoCaptured} />
    </View>
  );
}
