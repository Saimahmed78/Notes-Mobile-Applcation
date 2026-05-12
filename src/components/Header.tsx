import {
  View, Text, StyleSheet, Pressable, ImageBackground, useWindowDimensions, Animated
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useEffect } from "react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: (val: boolean) => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const { width } = useWindowDimensions();
  const animValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animValue, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
    }).start();
  }, [isDark]);

  // Slide the thumb left/right
  const thumbTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 34],
  });

  // Track background color
  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f59e0b", "#4c1d95"],
  });

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=800" }}
      style={[styles.header, { width }]}
      imageStyle={{ opacity: isDark ? 0.4 : 0.6 }}
    >
      <View style={[styles.overlay, { backgroundColor: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.35)" }]}>
        
        <View>
          <Text style={styles.appName}>Brain Dump</Text>
          <Text style={styles.subtitle}>Your thoughts, captured</Text>
        </View>

        {/* Custom Toggle */}
        <Pressable onPress={() => onToggleTheme(!isDark)}>
          <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
            <Animated.View style={[styles.thumb, { transform: [{ translateX: thumbTranslate }] }]}>
              <MaterialCommunityIcons
                name={isDark ? "moon-waning-crescent" : "white-balance-sunny"}
                size={18}
                color={isDark ? "#a78bfa" : "#f59e0b"}
              />
            </Animated.View>
          </Animated.View>
        </Pressable>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  overlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  track: {
    width: 64,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});