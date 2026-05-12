import {
  View, Text, StyleSheet, Pressable, Modal, TextInput,
  ScrollView, KeyboardAvoidingView, Platform, ImageBackground,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

interface TaskModalProps {
  visible: boolean;
  isDark: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
}

export default function TaskModal({
  visible,
  isDark,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  isEditing = false,
}: TaskModalProps) {
  const { width } = useWindowDimensions();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription, visible]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, description);
      setTitle("");
      setDescription("");
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  const backgroundColor = isDark ? "#2a2a2a" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const inputBg = isDark ? "#1a1a1a" : "#f5f5f5";
  const borderColor = isDark ? "#444444" : "#d0d0d0";

  const inputStyle = StyleSheet.compose(styles.input, {
    backgroundColor: inputBg,
    color: textColor,
    borderColor,
  });

  const textareaStyle = StyleSheet.compose(styles.textarea, {
    backgroundColor: inputBg,
    color: textColor,
    borderColor,
  });

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <View style={[styles.container, { backgroundColor }]}>

            {/* ImageBackground Header */}
            <ImageBackground
              source={{ uri: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800" }}
              style={styles.headerBg}
              imageStyle={{ opacity: 0.35, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>
                  {isEditing ? "Edit Note" : "New Note"}
                </Text>
                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={22} color="#ffffff" />
                </Pressable>
              </View>
            </ImageBackground>

            {/* Form */}
            <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: textColor }]}>Title</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="Enter note title"
                  placeholderTextColor={isDark ? "#666666" : "#999999"}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: textColor }]}>Content</Text>
                <TextInput
                  style={textareaStyle}
                  placeholder="Write your note..."
                  placeholderTextColor={isDark ? "#666666" : "#999999"}
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={6}
                />
              </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={handleClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{isEditing ? "Update" : "Save"}</Text>
              </Pressable>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  keyboardAvoid: {
    justifyContent: "flex-end",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    paddingBottom: 24,
  },
  headerBg: {
    backgroundColor: "#2c3e50",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    textAlignVertical: "top",
    minHeight: 120,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#808080",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});