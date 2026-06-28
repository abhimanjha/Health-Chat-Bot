import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Switch } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useState } from "react";

export default function RemindersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  
  const [dailyCheckIn, setDailyCheckIn] = useState(true);
  const [waterReminder, setWaterReminder] = useState(false);
  const [sleepReminder, setSleepReminder] = useState(true);

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? insets.top + 20 : insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Reminders</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: colors.foreground }]}>Daily Check-in</Text>
            <Text style={[styles.settingDesc, { color: colors.mutedForeground }]}>Remind me to log my mood every evening.</Text>
          </View>
          <Switch value={dailyCheckIn} onValueChange={setDailyCheckIn} trackColor={{ true: colors.primary }} />
        </View>

        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: colors.foreground }]}>Water Hydration</Text>
            <Text style={[styles.settingDesc, { color: colors.mutedForeground }]}>Send me notifications to drink water during the day.</Text>
          </View>
          <Switch value={waterReminder} onValueChange={setWaterReminder} trackColor={{ true: colors.primary }} />
        </View>

        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: colors.foreground }]}>Sleep Schedule</Text>
            <Text style={[styles.settingDesc, { color: colors.mutedForeground }]}>Remind me 30 minutes before my bedtime.</Text>
          </View>
          <Switch value={sleepReminder} onValueChange={setSleepReminder} trackColor={{ true: colors.primary }} />
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
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 16, borderWidth: 1, gap: 16 },
  settingText: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold', marginBottom: 4 },
  settingDesc: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});
