import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Navigation } from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

// 生成 Deep Link 的 URL 前綴，用來告訴應用應該監聽哪些 URL 進入點
// createURL('/') 會根據環境自動產生不同格式：
//   - 開發環境（simulator）: exp://192.168.1.100:8081/
//   - 生產環境: app.json 裡定義的 scheme，例如 myapp://
// 這個 prefix 會被傳給 linking.prefixes，讓 Navigation 監聽相符的 URL
// 例如：exp://192.168.1.100:8081/@jane 會自動導航到 Profile 並帶入 user 參數
const prefix = createURL('/');

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    // SafeAreaProvider 作為根層級容器，讀取並提供裝置的安全區域資訊（瀏海、status bar、home indicator 等）
    // 這是必需的基礎層，讓整個導覽樹都能存取安全區域資訊
    <SafeAreaProvider>
      {/* SafeAreaView 使用 SafeAreaProvider 提供的資訊，自動套用 padding 讓內容避開危險區域 */}
      {/* 結合 SafeAreaProvider + SafeAreaView，內容不會被瀏海遮蓋 */}
      <SafeAreaView style={{ flex: 1 }}> 
      <Navigation
        theme={theme}
        linking={{
          enabled: 'auto',
          prefixes: [prefix],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
