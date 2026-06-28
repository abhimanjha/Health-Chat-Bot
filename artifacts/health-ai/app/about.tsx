import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? insets.top + 20 : insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>About</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
          <Feather name="activity" size={48} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.appName, { color: colors.foreground }]}>HealthAI</Text>
        <Text style={[styles.version, { color: colors.mutedForeground }]}>Version 1.0.0</Text>
        
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardText, { color: colors.foreground }]}>
            HealthAI is your intelligent wellness companion. Our mission is to make mental health check-ins, mood tracking, and healthy habit building accessible to everyone through the power of AI.
          </Text>
        </View>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text>
          <Feather name="external-link" size={16} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={[styles.linkText, { color: colors.primary }]}>Open Source Licenses</Text>
          <Feather name="external-link" size={16} color={colors.primary} />
        </TouchableOpacity>
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
  logoContainer: { width: 100, height: 100, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  appName: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter_700Bold', marginBottom: 4 },
  version: { fontSize: 14, fontFamily: 'Inter_400Regular', marginBottom: 32 },
  card: { padding: 20, borderRadius: 16, borderWidth: 1, width: '100%', marginBottom: 32 },
  cardText: { fontSize: 15, lineHeight: 24, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  linkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12 },
  linkText: { fontSize: 16, fontFamily: 'Inter_500Medium' },
});
