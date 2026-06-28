import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function HealthTipsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? insets.top + 20 : insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Health Tips</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="droplet" size={24} color="#3B82F6" style={{ marginBottom: 12 }} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Stay Hydrated</Text>
          <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>Aim for at least 8 glasses of water today. Proper hydration improves mood and cognition.</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="moon" size={24} color="#8B5CF6" style={{ marginBottom: 12 }} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Prioritize Sleep</Text>
          <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>Try to get 7-9 hours of quality sleep. Stick to a consistent bedtime schedule.</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="sun" size={24} color="#F59E0B" style={{ marginBottom: 12 }} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Get Sunlight</Text>
          <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>Spend 15-30 minutes outdoors each morning to help regulate your circadian rhythm.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  content: { padding: 20, gap: 16 },
  card: { padding: 20, borderRadius: 16, borderWidth: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold', marginBottom: 6 },
  cardDesc: { fontSize: 14, lineHeight: 20, fontFamily: 'Inter_400Regular' },
});
