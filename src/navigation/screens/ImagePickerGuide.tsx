import { Button, Text } from '@react-navigation/elements';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ImagePickerGuide() {
  const [selectedImageUri, setSelectedImageUri] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState('尚未選擇圖片');

  const pickImage = React.useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setStatusMessage('未取得媒體庫權限，無法選取圖片。');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) {
      setStatusMessage('使用者取消了選圖流程。');
      return;
    }

    const imageUri = result.assets[0]?.uri ?? null;
    setSelectedImageUri(imageUri);
    setStatusMessage(imageUri ? '已成功選擇圖片。' : '沒有取得可用的圖片路徑。');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Expo ImagePicker 說明</Text>

        <Section title="ImagePicker 是什麼？">
          用來讓使用者從相簿挑選照片，或直接開啟相機拍照並取得圖片資訊。
        </Section>

        <Section title="常見流程">
          1. 安裝套件：expo-image-picker
        </Section>
        <Section title="">
          2. 先請求權限（媒體庫或相機）
        </Section>
        <Section title="">
          3. 呼叫 launchImageLibraryAsync 或 launchCameraAsync
        </Section>
        <Section title="">
          4. 檢查使用者是否取消，成功後讀取 assets[0].uri 顯示圖片
        </Section>

        <Section title="範例程式（精簡版）">
          {`import * as ImagePicker from 'expo-image-picker';

const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
if (!permission.granted) return;

const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'],
  allowsEditing: true,
  quality: 1,
});

if (!result.canceled) {
  const uri = result.assets[0].uri;
  // 使用 uri 顯示圖片
}`}
        </Section>

        <Section title="互動範例">
          <View style={styles.demoCard}>
            <Text style={styles.body}>按下按鈕後會請求媒體庫權限，成功後可從相簿選圖並立即顯示預覽。</Text>
            <Button onPress={pickImage}>選擇圖片</Button>
            <Text style={styles.statusText}>{statusMessage}</Text>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderBox}>
                <Text style={styles.placeholderText}>尚未選擇任何圖片</Text>
              </View>
            )}
          </View>
        </Section>

        <Section title="注意事項">
          iOS 需在 app 設定中加入相機與相簿權限描述；Android 也需要相關權限設定。
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  const isPlainText = typeof children === 'string';

  return (
    <View style={styles.section}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {isPlainText ? <Text style={styles.body}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
  demoCard: {
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    backgroundColor: '#fafaf9',
  },
  statusText: {
    fontSize: 13,
    color: '#52525b',
  },
  previewImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    backgroundColor: '#e4e4e7',
  },
  placeholderBox: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f5',
  },
  placeholderText: {
    fontSize: 13,
    color: '#71717a',
  },
});
