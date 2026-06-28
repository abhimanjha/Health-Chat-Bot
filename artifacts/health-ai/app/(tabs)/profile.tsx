import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, signOut, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [age, setAge] = useState(user?.age?.toString() ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");

  const styles = makeStyles(colors, insets);

  async function handleSave() {
    await updateUser({
      name: name.trim() || user?.name,
      age: age ? parseInt(age, 10) : undefined,
      gender: gender || undefined,
    });
    setEditing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  function handleSignOut() {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/sign-in");
          },
        },
      ]
    );
  }

  const initials = (user?.name ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const menuItems = [
    { icon: "heart" as const, label: "Health Tips", desc: "Daily wellness recommendations", color: "#EF4444", route: "/health-tips" as const },
    { icon: "bell" as const, label: "Reminders", desc: "Set daily check-in reminders", color: "#F59E0B", route: "/reminders" as const },
    { icon: "shield" as const, label: "Privacy", desc: "Your data stays on your device", color: "#6366F1", route: "/privacy" as const },
    { icon: "info" as const, label: "About HealthAI", desc: "v1.0 · AI-powered wellness", color: "#0D9488", route: "/about" as const },
  ];

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
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        {editing ? (
          <View style={styles.editForm}>
            <TextInput
              style={styles.editInput}
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor={colors.mutedForeground}
            />
            <View style={styles.editRow}>
              <TextInput
                style={[styles.editInput, { flex: 1 }]}
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                placeholderTextColor={colors.mutedForeground}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.editInput, { flex: 2 }]}
                value={gender}
                onChangeText={setGender}
                placeholder="Gender (optional)"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>
            <View style={styles.editActions}>
              <TouchableOpacity onPress={() => setEditing(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            {(user?.age || user?.gender) && (
              <Text style={styles.profileMeta}>
                {[user.age && `${user.age} years`, user.gender].filter(Boolean).join(" · ")}
              </Text>
            )}
            <Pressable onPress={() => setEditing(true)} style={styles.editBtn}>
              <Feather name="edit-2" size={14} color={colors.primary} />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Joined</Text>
        <Text style={styles.sectionValue}>
          {user?.joinedAt
            ? new Date(user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
            : "–"}
        </Text>
      </View>

      <View style={styles.menuCard}>
        {menuItems.map((item, idx) => (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route)}
            style={[styles.menuItem, idx < menuItems.length - 1 && styles.menuItemBorder]}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color + "18" }]}>
              <Feather name={item.icon} size={18} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuDesc}>{item.desc}</Text>
            </View>
            <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>

      <View style={styles.disclaimer}>
        <Feather name="alert-circle" size={14} color={colors.mutedForeground} />
        <Text style={styles.disclaimerText}>
          HealthAI provides general wellness guidance only. Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
        </Text>
      </View>

      <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
        <Feather name="log-out" size={18} color={colors.destructive} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>, insets: ReturnType<typeof useSafeAreaInsets>) {
  return StyleSheet.create({
    root: { flex: 1 },
    content: { paddingHorizontal: 20, gap: 0 },
    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      alignItems: "center",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatarCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    avatarText: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.primaryForeground,
      fontFamily: "Inter_700Bold",
    },
    profileName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
    },
    profileEmail: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 4,
      fontFamily: "Inter_400Regular",
    },
    profileMeta: {
      fontSize: 13,
      color: colors.mutedForeground,
      marginTop: 4,
      fontFamily: "Inter_400Regular",
    },
    editBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 14,
      backgroundColor: colors.primary + "15",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 10,
    },
    editBtnText: {
      color: colors.primary,
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
    },
    editForm: { width: "100%", gap: 10 },
    editInput: {
      backgroundColor: colors.muted,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.border,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
    },
    editRow: { flexDirection: "row", gap: 10 },
    editActions: { flexDirection: "row", gap: 10 },
    cancelBtn: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 11,
      alignItems: "center",
    },
    cancelBtnText: { color: colors.mutedForeground, fontFamily: "Inter_500Medium", fontSize: 14 },
    saveBtn: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 11,
      alignItems: "center",
    },
    saveBtnText: { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold", fontSize: 14 },
    section: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_500Medium", marginBottom: 4 },
    sectionValue: { fontSize: 15, color: colors.foreground, fontFamily: "Inter_500Medium" },
    menuCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 14,
    },
    menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
    menuIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    menuLabel: { fontSize: 15, fontWeight: "600", color: colors.foreground, fontFamily: "Inter_600SemiBold" },
    menuDesc: { fontSize: 12, color: colors.mutedForeground, marginTop: 1, fontFamily: "Inter_400Regular" },
    disclaimer: {
      flexDirection: "row",
      gap: 8,
      backgroundColor: colors.muted,
      borderRadius: 14,
      padding: 14,
      marginBottom: 16,
      alignItems: "flex-start",
    },
    disclaimerText: { flex: 1, fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular", lineHeight: 18 },
    signOutBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.destructive + "12",
      borderRadius: 16,
      height: 52,
      borderWidth: 1.5,
      borderColor: colors.destructive + "30",
    },
    signOutText: { color: colors.destructive, fontSize: 15, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  });
}
