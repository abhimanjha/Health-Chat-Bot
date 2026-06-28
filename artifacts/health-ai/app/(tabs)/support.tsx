import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function SupportScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  
  const sections = [
    {
      title: "Emergency Contacts",
      icon: "phone-call" as const,
      color: "#EF4444",
      items: [
        { label: "National Emergency", value: "911", action: () => Linking.openURL("tel:911") },
        { label: "Poison Control", value: "1-800-222-1222", action: () => Linking.openURL("tel:18002221222") },
      ]
    },
    {
      title: "Crisis Resources",
      icon: "heart" as const,
      color: "#F43F5E",
      items: [
        { label: "Suicide & Crisis Lifeline", value: "988", action: () => Linking.openURL("tel:988") },
        { label: "Crisis Text Line", value: "Text HOME", action: () => Linking.openURL("sms:741741") },
      ]
    },
    {
      title: "Mental Health Education",
      icon: "book-open" as const,
      color: "#3B82F6",
      items: [
        { label: "Understanding Anxiety", value: "Read", action: () => {} },
        { label: "Coping with Stress", value: "Read", action: () => {} },
      ]
    },
    {
      title: "FAQ",
      icon: "help-circle" as const,
      color: "#10B981",
      items: [
        { label: "How is my data protected?", value: "View", action: () => {} },
        { label: "How to use the mood tracker?", value: "View", action: () => {} },
      ]
    },
  ];

  return (
    <ScrollView 
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { 
        paddingTop: Platform.OS === 'web' ? insets.top + 67 : insets.top + 20, 
        paddingBottom: insets.bottom + 100 
      }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
          <Feather name="life-buoy" size={32} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Support & Resources</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>We're here to help. Find the resources you need below.</Text>
      </View>

      {sections.map((section) => (
        <View key={section.title} style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Feather name={section.icon} size={20} color={section.color} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.title}</Text>
          </View>
          {section.items.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.itemRow, index < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
              onPress={item.action}
            >
              <Text style={[styles.itemLabel, { color: colors.foreground }]}>{item.label}</Text>
              <Text style={[styles.itemValue, { color: colors.primary }]}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={[styles.contactBtn, { backgroundColor: colors.primary }]}>
        <Feather name="mail" size={20} color={colors.primaryForeground} />
        <Text style={[styles.contactBtnText, { color: colors.primaryForeground }]}>Contact Support Team</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 20, gap: 16 },
  header: { alignItems: 'center', marginBottom: 10 },
  iconContainer: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter_700Bold', marginBottom: 8 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', paddingHorizontal: 20 },
  section: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, backgroundColor: 'rgba(0,0,0,0.02)' },
  sectionTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  itemLabel: { fontSize: 15, fontFamily: 'Inter_500Medium', flex: 1 },
  itemValue: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  contactBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 16, marginTop: 10 },
  contactBtnText: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold' }
});
