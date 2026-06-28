import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function PrivacyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? insets.top + 20 : insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
          <Feather name="shield" size={40} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Your Data is Yours</Text>
        <Text style={[styles.paragraph, { color: colors.mutedForeground }]}>
          At HealthAI, we prioritize your privacy and data security. All of your personal data, mood logs, and chat history are processed locally on your device where possible. 
        </Text>
        <Text style={[styles.paragraph, { color: colors.mutedForeground }]}>
          Any data sent to our AI models is anonymized and transmitted over secure, encrypted channels. We do not sell your personal information to third parties, nor do we use your private data for advertising purposes.
        </Text>
        <Text style={[styles.paragraph, { color: colors.mutedForeground }]}>
          By using HealthAI, you agree to these privacy principles. You can request to delete your account and all associated data at any time from your settings.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  content: { padding: 24, alignItems: 'center' },
  iconContainer: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter_700Bold', marginBottom: 16 },
  paragraph: { fontSize: 15, lineHeight: 24, fontFamily: 'Inter_400Regular', textAlign: 'center', marginBottom: 20 },
});
