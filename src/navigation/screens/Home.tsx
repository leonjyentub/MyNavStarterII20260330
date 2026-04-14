import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Profile" params={{ user: 'jane' }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // gap: 設定容器內所有子元件之間的間距（單位：像素）
    // 由於預設 flexDirection 是 'column'（垂直排列），gap 會讓每個子元素之間有 10px 的間距
    // 效果：Home Screen、說明文字、Go to Profile、Go to Settings 之間各隔 10px
    // 沒有 gap → 元素會緊貼在一起 gap: 10 → 元素之間有清晰的呼吸感
    gap: 10,
  },

  /*
┌─────────────────────┐
│   Home Screen       │ ← Text
│                     │ ← gap: 10
│ Open up 'src/App... │ ← Text
│                     │ ← gap: 10
│  Go to Profile      │ ← Button
│                     │ ← gap: 10
│  Go to Settings     │ ← Button
└─────────────────────┘
  */
});
