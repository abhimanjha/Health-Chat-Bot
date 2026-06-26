import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const FEATURES = [
  { icon: "message-circle" as const, label: "AI Health Chat" },
  { icon: "bar-chart-2" as const, label: "Daily Dashboard" },
  { icon: "heart" as const, label: "Mood Tracking" },
];

export default function Index() {
  const { user, isLoading } = useAuth();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      router.replace("/(tabs)/chat");
      return;
    }
    const useNative = Platform.OS !== "web";
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: useNative,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: useNative,
      }),
    ]).start();
  }, [isLoading, user]);

  if (isLoading || user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
        <View style={[styles.splashLogo, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
          <Feather name="activity" size={48} color="#fff" />
        </View>
        <Text style={styles.splashText}>HealthAI</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.inner,
          {
            minHeight: screenHeight,
            paddingTop: insets.top + 24,
            paddingBottom: insets.bottom + 24,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Hero section */}
        <View style={styles.hero}>
          <View style={[styles.logoRing, { borderColor: colors.primary + "30" }]}>
            <View style={[styles.logoBox, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
              <Feather name="activity" size={44} color={colors.primaryForeground} />
            </View>
          </View>

          <Text style={[styles.appName, { color: colors.foreground }]}>HealthAI</Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            Your personal AI-powered{"\n"}mental health companion
          </Text>
        </View>

        {/* Feature pills */}
        <View style={styles.featureRow}>
          {FEATURES.map((f) => (
            <View
              key={f.label}
              style={[styles.featurePill, { backgroundColor: colors.primary + "12", borderColor: colors.primary + "25" }]}
            >
              <Feather name={f.icon} size={15} color={colors.primary} />
              <Text style={[styles.featureLabel, { color: colors.primary }]}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={[styles.descCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.descText, { color: colors.mutedForeground }]}>
            Chat with your health AI, track your mood and sleep, and build healthy daily habits — all in one place.
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* CTA buttons */}
        <View style={styles.ctas}>
          <TouchableOpacity
            style={[styles.btnPrimary, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
            onPress={() => router.push("/sign-up")}
            activeOpacity={0.85}
          >
            <Text style={[styles.btnPrimaryText, { color: colors.primaryForeground }]}>Get Started</Text>
            <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnSecondary, { borderColor: colors.border }]}
            onPress={() => router.push("/sign-in")}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnSecondaryText, { color: colors.foreground }]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.legal, { color: colors.mutedForeground }]}>
          Free forever · No account required to explore
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    justifyContent: "flex-start",
  },
  splashLogo: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  splashText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  hero: { alignItems: "center", marginTop: 32, marginBottom: 32 },
  logoRing: {
    width: 120,
    height: 120,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  appName: {
    fontSize: 34,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  featureRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 24,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
  },
  featureLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold", fontWeight: "600" },
  descCard: {
    borderRadius: 20,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 8,
  },
  descText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  ctas: { width: "100%", gap: 12, marginBottom: 16 },
  btnPrimary: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  btnPrimaryText: { fontSize: 17, fontWeight: "700", fontFamily: "Inter_700Bold" },
  btnSecondary: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: { fontSize: 16, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  legal: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center" },
});
