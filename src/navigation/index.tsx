import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import { ImagePickerGuide } from './screens/ImagePickerGuide';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    ImagePicker: {
      screen: ImagePickerGuide,
      options: {
        title: 'ImagePicker',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="images-outline" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        // URL pattern for this screen: /@username
        // :user is the route param name, and the regex enforces '@' + [a-zA-Z0-9-_]
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          // URL -> route param: convert '@jane' to 'jane'
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          // Route param -> URL: convert 'jane' back to '@jane'
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

// RootStackParamList 是全域的導航參數類型定義
// StaticParamList<typeof RootStack> 會自動掃描 RootStack 的所有畫面
// 並提取每個畫面的參數類型（例如 Profile 的 user 參數、Settings 無參數等）
// 作用：提供類型安全的導航，讓 TypeScript 檢查頁面名稱和參數是否正確
type RootStackParamList = StaticParamList<typeof RootStack>;

// 將 RootStackParamList 掛載到全域，讓整個 App 都能使用這份類型定義
// 這樣在任何地方使用 useNavigation() 時，TypeScript 都會正確檢查導航參數
// 例如：navigation.navigate('Profile', { user: 'jane' }) ✓ 正確
//      navigation.navigate('Profile', { userId: 'jane' }) ✗ TypeScript 警告
//      navigation.navigate('InvalidScreen') ✗ TypeScript 警告（頁面不存在）
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
