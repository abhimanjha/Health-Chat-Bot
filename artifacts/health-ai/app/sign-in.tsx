import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function SignInScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isWeb = Platform.OS === "web";

  async function handleSignIn() {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace("/(tabs)/chat");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "stretch",
          paddingHorizontal: 24,
          paddingTop: isWeb ? 67 : insets.top + 16,
          paddingBottom: isWeb ? 67 : insets.bottom + 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + Branding */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
            <Feather name="activity" size={36} color={colors.primaryForeground} />
          </View>
          <Text style={[styles.appName, { color: colors.foreground }]}>HealthAI</Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>Your personal health companion</Text>
        </View>

        {/* Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.foreground }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Sign in to continue your health journey</Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Feather name="mail" size={18} color={colors.mutedForeground} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="you@example.com"
                placeholderTextColor={colors.mutedForeground}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Feather name="lock" size={18} color={colors.mutedForeground} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.foreground, paddingRight: 8 }]}
                placeholder="Your password"
                placeholderTextColor={colors.mutedForeground}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
              </Pressable>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <View style={[styles.errorBox, { backgroundColor: colors.destructive + "15" }]}>
              <Feather name="alert-circle" size={14} color={colors.destructive} />
              <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
            </View>
          ) : null}

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary, shadowColor: colors.primary }, loading && styles.btnDisabled]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={colors.primaryForeground} />
            ) : (
              <Text style={[styles.btnText, { color: colors.primaryForeground }]}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Sign Up */}
          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: colors.primary }]}
            onPress={() => router.push("/sign-up")}
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryBtnText, { color: colors.primary }]}>Create a new account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", marginBottom: 28 },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: { fontSize: 28, fontWeight: "700", fontFamily: "Inter_700Bold" },
  tagline: { fontSize: 14, marginTop: 4, fontFamily: "Inter_400Regular" },
  card: {
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  title: { fontSize: 22, fontWeight: "700", fontFamily: "Inter_700Bold", marginBottom: 4 },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", marginBottom: 24 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: "600", fontFamily: "Inter_600SemiBold", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular", height: "100%" },
  eyeBtn: { padding: 4 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorText: { fontSize: 13, fontFamily: "Inter_400Regular", flex: 1 },
  btn: {
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: { opacity: 0.7 },
  btnText: { fontSize: 16, fontWeight: "700", fontFamily: "Inter_700Bold" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 20, gap: 10 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13, fontFamily: "Inter_400Regular" },
  secondaryBtn: {
    borderWidth: 1.5,
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: { fontSize: 15, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
});
