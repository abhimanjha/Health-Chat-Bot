import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";
import { type Message, WELCOME_MESSAGE, createMessage, getHealthAIResponse } from "@/lib/healthAI";

const CHAT_STORAGE_KEY = "@health_ai_chat_";
const TYPING_DELAY_MS = 900;

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  const storageKey = CHAT_STORAGE_KEY + (user?.id ?? "guest");

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        const parsed: Message[] = JSON.parse(stored).map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(parsed);
      }
    } catch {}
  }

  async function saveMessages(msgs: Message[]) {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(msgs));
    } catch {}
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || isTyping) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInput("");
    const userMsg = createMessage("user", text);
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    setIsTyping(true);
    setTimeout(async () => {
      const response = getHealthAIResponse(text);
      const botMsg = createMessage("assistant", response);
      const finalMessages = [...newMessages, botMsg];
      setMessages(finalMessages);
      saveMessages(finalMessages);
      setIsTyping(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, TYPING_DELAY_MS);

    inputRef.current?.focus();
  }

  async function clearChat() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const fresh = [WELCOME_MESSAGE];
    setMessages(fresh);
    await AsyncStorage.removeItem(storageKey);
  }

  const styles = makeStyles(colors, insets);

  function renderItem({ item }: { item: Message }) {
    const isUser = item.role === "user";
    return (
      <View style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
        {!isUser && (
          <View style={styles.avatar}>
            <Feather name="activity" size={14} color={colors.primaryForeground} />
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
          <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextBot]}>
            {item.content}
          </Text>
          <Text style={[styles.bubbleTime, isUser && styles.bubbleTimeUser]}>
            {item.timestamp instanceof Date
              ? item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : ""}
          </Text>
        </View>
      </View>
    );
  }

  function TypingIndicator() {
    return (
      <View style={[styles.bubbleRow]}>
        <View style={styles.avatar}>
          <Feather name="activity" size={14} color={colors.primaryForeground} />
        </View>
        <View style={[styles.bubble, styles.bubbleBot, styles.typingBubble]}>
          <View style={styles.typingDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.dot, { opacity: 0.4 + i * 0.2 }]} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? insets.top + 67 : insets.top + 8 }]}>
        <View>
          <Text style={styles.headerTitle}>Health AI</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online · Always here for you</Text>
          </View>
        </View>
        <Pressable onPress={clearChat} style={styles.clearBtn}>
          <Feather name="rotate-ccw" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
          showsVerticalScrollIndicator={false}
        />

        <View style={[styles.inputBar, { paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 10 }]}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Ask me about your health..."
              placeholderTextColor={colors.mutedForeground}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={Platform.OS !== "web" ? sendMessage : undefined}
            />
            <Pressable
              onPress={sendMessage}
              style={[styles.sendBtn, (!input.trim() || isTyping) && styles.sendBtnDisabled]}
              disabled={!input.trim() || isTyping}
            >
              <Feather name="send" size={18} color={colors.primaryForeground} />
            </Pressable>
          </View>

          <View style={styles.quickChips}>
            {["I feel anxious", "Sleep issues", "Nutrition tips", "Exercise advice"].map((chip) => (
              <Pressable
                key={chip}
                style={styles.chip}
                onPress={() => {
                  setInput(chip);
                  setTimeout(() => sendMessage(), 100);
                }}
              >
                <Text style={styles.chipText}>{chip}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>, insets: ReturnType<typeof useSafeAreaInsets>) {
  return StyleSheet.create({
    container: { flex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 14,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
    },
    statusRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.success,
    },
    statusText: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
    clearBtn: { padding: 8 },
    messagesList: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingBottom: 8,
    },
    bubbleRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 12,
      gap: 8,
    },
    bubbleRowUser: { flexDirection: "row-reverse" },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    bubble: {
      maxWidth: "78%",
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    bubbleUser: {
      backgroundColor: colors.chatBubbleUser,
      borderBottomRightRadius: 4,
    },
    bubbleBot: {
      backgroundColor: colors.chatBubbleBot,
      borderBottomLeftRadius: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 1,
    },
    bubbleText: { fontSize: 15, lineHeight: 22 },
    bubbleTextUser: {
      color: colors.chatBubbleUserText,
      fontFamily: "Inter_400Regular",
    },
    bubbleTextBot: {
      color: colors.chatBubbleBotText,
      fontFamily: "Inter_400Regular",
    },
    bubbleTime: {
      fontSize: 10,
      color: colors.mutedForeground,
      marginTop: 4,
      fontFamily: "Inter_400Regular",
      alignSelf: "flex-end",
    },
    bubbleTimeUser: { color: colors.chatBubbleUserText + "AA" },
    typingBubble: { paddingVertical: 14, paddingHorizontal: 16 },
    typingDots: { flexDirection: "row", gap: 5, alignItems: "center" },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.mutedForeground,
    },
    inputBar: {
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
      paddingHorizontal: 16,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "flex-end",
      backgroundColor: colors.muted,
      borderRadius: 24,
      borderWidth: 1.5,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 6,
      gap: 10,
    },
    textInput: {
      flex: 1,
      fontSize: 15,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
      maxHeight: 100,
      paddingVertical: 6,
    },
    sendBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4,
    },
    sendBtnDisabled: { opacity: 0.5, shadowOpacity: 0 },
    quickChips: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingTop: 10,
    },
    chip: {
      backgroundColor: colors.primary + "18",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: colors.primary + "30",
    },
    chipText: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: "Inter_500Medium",
    },
  });
}
