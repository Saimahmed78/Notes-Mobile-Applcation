import {
  Text, View, StyleSheet, FlatList, TextInput,
  Pressable, useColorScheme, useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

export default function Index() {
  const systemScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsDark(systemScheme === "dark");
  }, [systemScheme]);

  const handleOpenModal = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingTask(null);
  };

  const handleSubmitTask = (title: string, description: string) => {
    if (editingTask) {
      setTasks(tasks.map((t) =>
        t.id === editingTask.id ? { ...t, title, description } : t
      ));
    } else {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title,
        description,
        createdAt: Date.now(),
      }]);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const backgroundColor = isDark ? "#1a1a1a" : "#f5f5f5";
  const textColor = isDark ? "#ffffff" : "#000000";
  const inputBg = isDark ? "#2a2a2a" : "#ffffff";
  const borderColor = isDark ? "#444" : "#e0e0e0";

  const searchStyle = StyleSheet.flatten([
    styles.searchInput,
    { backgroundColor: inputBg, color: textColor, borderColor, width: width - 40 },
  ]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header isDark={isDark} onToggleTheme={setIsDark} />

      <View style={styles.content}>
        {/* Search */}
        <TextInput
          style={searchStyle}
          placeholder="Search notes..."
          placeholderTextColor={isDark ? "#666" : "#999"}
          value={search}
          onChangeText={setSearch}
        />

        {/* Create Button */}
        <Pressable
          style={styles.createButton}
          onPress={handleOpenModal}
        >
          <MaterialCommunityIcons name="plus" size={22} color="#ffffff" />
          <Text style={styles.createButtonText}>New Note</Text>
        </Pressable>

        {/* Notes FlatList */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="notebook-outline"
                size={52}
                color={isDark ? "#555555" : "#cccccc"}
              />
              <Text style={[styles.emptyText, { color: textColor }]}>
                No notes yet
              </Text>
              <Text style={[styles.emptySubtext, { color: isDark ? "#666" : "#999" }]}>
                Tap "New Note" to get started
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              isDark={isDark}
              onPress={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        />
      </View>

      <TaskModal
        visible={modalVisible}
        isDark={isDark}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
        initialTitle={editingTask?.title || ""}
        initialDescription={editingTask?.description || ""}
        isEditing={!!editingTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 14,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 20,
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 14,
  },
  emptySubtext: {
    fontSize: 13,
    marginTop: 6,
  },
});