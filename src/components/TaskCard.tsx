import { View, Text, StyleSheet, Pressable, Alert, useWindowDimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

interface TaskCardProps {
  task: Task;
  isDark: boolean;
  onPress: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, isDark, onPress, onDelete }: TaskCardProps) {
  const { width } = useWindowDimensions();

  const backgroundColor = isDark ? "#2a2a2a" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const descriptionColor = isDark ? "#b0b0b0" : "#666666";
  const borderColor = isDark ? "#444444" : "#e0e0e0";

  const cardStyle = StyleSheet.flatten([
    styles.card,
    { backgroundColor, borderColor, width: width - 40 },
  ]);

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel" },
      { text: "Delete", onPress: () => onDelete(task.id), style: "destructive" },
    ]);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Pressable style={cardStyle} onPress={() => onPress(task)}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={[styles.description, { color: descriptionColor }]} numberOfLines={2}>
          {task.description || "No content"}
        </Text>
        <Text style={[styles.date, { color: descriptionColor }]}>
          {formatDate(task.createdAt)}
        </Text>
      </View>
      <Pressable onPress={handleDelete} style={styles.deleteButton}>
        <MaterialCommunityIcons name="delete-outline" size={20} color="#ff6b6b" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  date: {
    fontSize: 11,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});