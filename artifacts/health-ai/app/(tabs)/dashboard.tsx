import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";

interface DailyLog {
  date: string;
  mood: number;
  sleep: number;
  water: number;
  exercise: boolean;
}

const DASHBOARD_KEY = "@health_ai_dashboard_";

const MOODS = [
  { score: 1, label: "Awful", icon: "frown" as const, color: "#EF4444" },
  { score: 2, label: "Bad", icon: "frown" as const, color: "#F97316" },
  { score: 3, label: "Okay", icon: "meh" as const, color: "#EAB308" },
  { score: 4, label: "Good", icon: "smile" as const, color: "#22C55E" },
  { score: 5, label: "Great", icon: "smile" as const, color: "#10B981" },
];

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const storageKey = DASHBOARD_KEY + (user?.id ?? "guest");
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const today = todayKey();
  const todayLog = logs.find((l) => l.date === today);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) setLogs(JSON.parse(stored));
    } catch {}
  }

  async function saveLogs(newLogs: DailyLog[]) {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newLogs));
    } catch {}
  }

  function upsertToday(updates: Partial<DailyLog>) {
    const base: DailyLog = todayLog ?? { date: today, mood: 0, sleep: 0, water: 0, exercise: false };
    const updated = { ...base, ...updates };
    const filtered = logs.filter((l) => l.date !== today);
    const newLogs = [updated, ...filtered].slice(0, 30);
    setLogs(newLogs);
    saveLogs(newLogs);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  const styles = makeStyles(colors, insets);

  const streak = (() => {
    if (logs.length === 0) return 0;
    let count = 0;
    const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    for (const log of sorted) {
      if (log.mood > 0 || log.sleep > 0 || log.water > 0) count++;
      else break;
    }
    return count;
  })();

  const avgMood = logs.length > 0
    ? (logs.reduce((s, l) => s + (l.mood || 0), 0) / logs.filter((l) => l.mood > 0).length || 0).toFixed(1)
    : "–";

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Platform.OS === "web" ? insets.top + 67 : insets.top + 8,
          paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Good {getGreeting()}, {user?.name?.split(" ")[0] ?? "there"} 👋</Text>
          <Text style={styles.dateText}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30" }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{streak}</Text>
          <Text style={styles.statLabel}>Day streak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.accent + "15", borderColor: colors.accent + "30" }]}>
          <Text style={[styles.statValue, { color: colors.accent }]}>{avgMood}</Text>
          <Text style={styles.statLabel}>Avg mood</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.success + "15", borderColor: colors.success + "30" }]}>
          <Text style={[styles.statValue, { color: colors.success }]}>{logs.filter((l) => l.exercise).length}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <Pressable
            key={m.score}
            style={[
              styles.moodBtn,
              todayLog?.mood === m.score && { backgroundColor: m.color + "20", borderColor: m.color },
            ]}
            onPress={() => upsertToday({ mood: m.score })}
          >
            <Feather name={m.icon} size={24} color={todayLog?.mood === m.score ? m.color : colors.mutedForeground} />
            <Text style={[styles.moodLabel, todayLog?.mood === m.score && { color: m.color }]}>{m.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Today's Tracking</Text>

      <View style={styles.trackCard}>
        <View style={styles.trackHeader}>
          <View style={[styles.trackIcon, { backgroundColor: colors.accent + "20" }]}>
            <Feather name="moon" size={18} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle}>Sleep</Text>
            <Text style={styles.trackSubtitle}>{todayLog?.sleep ? `${todayLog.sleep} hours` : "Not logged"}</Text>
          </View>
        </View>
        <View style={styles.sleepBtns}>
          {[5, 6, 7, 8, 9, 10].map((h) => (
            <Pressable
              key={h}
              style={[
                styles.sleepBtn,
                todayLog?.sleep === h && { backgroundColor: colors.accent, borderColor: colors.accent },
              ]}
              onPress={() => upsertToday({ sleep: h })}
            >
              <Text style={[styles.sleepBtnText, todayLog?.sleep === h && { color: "#fff" }]}>{h}h</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.trackCard}>
        <View style={styles.trackHeader}>
          <View style={[styles.trackIcon, { backgroundColor: "#0EA5E920" }]}>
            <Feather name="droplet" size={18} color="#0EA5E9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle}>Water Intake</Text>
            <Text style={styles.trackSubtitle}>{todayLog?.water ? `${todayLog.water} glasses` : "Not logged"} · Goal: 8</Text>
          </View>
        </View>
        <View style={styles.waterBtns}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <Pressable
              key={n}
              onPress={() => upsertToday({ water: n })}
              style={[styles.waterDrop, (todayLog?.water ?? 0) >= n && { backgroundColor: "#0EA5E9" }]}
            >
              <Feather name="droplet" size={14} color={(todayLog?.water ?? 0) >= n ? "#fff" : colors.border} />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.trackCard}>
        <View style={styles.trackHeader}>
          <View style={[styles.trackIcon, { backgroundColor: colors.success + "20" }]}>
            <Feather name="zap" size={18} color={colors.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle}>Exercise</Text>
            <Text style={styles.trackSubtitle}>{todayLog?.exercise ? "Completed today!" : "Not done yet"}</Text>
          </View>
          <TouchableOpacity
            onPress={() => upsertToday({ exercise: !todayLog?.exercise })}
            style={[
              styles.exerciseToggle,
              todayLog?.exercise
                ? { backgroundColor: colors.success }
                : { backgroundColor: colors.muted, borderColor: colors.border, borderWidth: 1.5 },
            ]}
          >
            <Feather name={todayLog?.exercise ? "check" : "plus"} size={18} color={todayLog?.exercise ? "#fff" : colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>

      {logs.length > 1 && (
        <>
          <Text style={styles.sectionTitle}>Recent History</Text>
          {logs.slice(0, 7).map((log) => (
            <View key={log.date} style={styles.historyRow}>
              <Text style={styles.historyDate}>{new Date(log.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</Text>
              <View style={styles.historyMeta}>
                {log.mood > 0 && (
                  <View style={[styles.historyChip, { backgroundColor: MOODS[log.mood - 1].color + "20" }]}>
                    <Text style={[styles.historyChipText, { color: MOODS[log.mood - 1].color }]}>{MOODS[log.mood - 1].label}</Text>
                  </View>
                )}
                {log.sleep > 0 && (
                  <View style={styles.historyChip}>
                    <Feather name="moon" size={11} color={colors.mutedForeground} />
                    <Text style={styles.historyChipText}>{log.sleep}h</Text>
                  </View>
                )}
                {log.exercise && (
                  <View style={[styles.historyChip, { backgroundColor: colors.success + "20" }]}>
                    <Feather name="zap" size={11} color={colors.success} />
                  </View>
                )}
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

function makeStyles(colors: ReturnType<typeof useColors>, insets: ReturnType<typeof useSafeAreaInsets>) {
  return StyleSheet.create({
    root: { flex: 1 },
    content: { paddingHorizontal: 20, gap: 0 },
    topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
    greeting: { fontSize: 20, fontWeight: "700", color: colors.foreground, fontFamily: "Inter_700Bold" },
    dateText: { fontSize: 13, color: colors.mutedForeground, marginTop: 2, fontFamily: "Inter_400Regular" },
    statsRow: { flexDirection: "row", gap: 10, marginBottom: 28 },
    statCard: {
      flex: 1,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      alignItems: "center",
    },
    statValue: { fontSize: 24, fontWeight: "700", fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 11, color: colors.mutedForeground, marginTop: 2, fontFamily: "Inter_400Regular" },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      marginBottom: 12,
      marginTop: 8,
    },
    moodRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24, gap: 6 },
    moodBtn: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: colors.border,
      gap: 4,
      backgroundColor: colors.card,
    },
    moodLabel: { fontSize: 10, color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
    trackCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    trackHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
    trackIcon: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    trackTitle: { fontSize: 15, fontWeight: "600", color: colors.foreground, fontFamily: "Inter_600SemiBold" },
    trackSubtitle: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 1 },
    sleepBtns: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
    sleepBtn: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.muted,
    },
    sleepBtnText: { fontSize: 13, color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
    waterBtns: { flexDirection: "row", gap: 8 },
    waterDrop: {
      width: 34,
      height: 34,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.muted,
    },
    exerciseToggle: {
      width: 42,
      height: 42,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    historyRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
    },
    historyDate: { fontSize: 13, color: colors.mutedForeground, fontFamily: "Inter_500Medium", width: 50 },
    historyMeta: { flexDirection: "row", gap: 6, flexWrap: "wrap", flex: 1 },
    historyChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.muted,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    historyChipText: { fontSize: 11, color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
  });
}
