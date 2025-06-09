import React, { useRef, useEffect, useState } from 'react';
import { View, Button, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraScreen({ onVideoCaptured }) {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission !== 'authorized') {
        Alert.alert('Quyền truy cập bị từ chối');
      }
    })();
  }, []);

  const startRecording = async () => {
    if (camera.current) {
      setRecording(true);
      const video = await camera.current.startRecording({
        onRecordingFinished: video => {
          setRecording(false);
          onVideoCaptured(video.path);
        },
        onRecordingError: error => {
          console.error(error);
          setRecording(false);
        },
      });
    }
  };

  const stopRecording = () => {
    camera.current?.stopRecording();
  };

  if (device == null) return null;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        video={true}
      />
      <Button title={recording ? "Dừng quay" : "Bắt đầu quay"} onPress={recording ? stopRecording : startRecording} />
    </View>
  );
}
