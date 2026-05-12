# Brain Dump - Notes Application

A simple, elegant, and user-friendly notes application built with React Native and Expo. Manage your thoughts and ideas with ease!

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Video Demo](#video-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Dark/Light Theme Toggle** - Switch between dark and light themes with a single tap
- **Create Notes** - Add new notes with title and description
- **Edit Notes** - Tap on any note to edit its title and description
- **Delete Notes** - Remove notes with a confirmation dialog
- **Search Functionality** - Filter notes by title in real-time
- **Responsive Design** - Optimized for various screen sizes
- **Smooth Animations** - Modal slide animations for better UX
- **Keyboard Management** - Automatic keyboard avoidance for input fields
- **Accessible Components** - Built with Pressable components for better accessibility

## 📸 Screenshots

### Light Mode
![Light Mode - Home Screen](../Notes-Application/assets/images/Light%20Mode.jpeg)

### Dark Mode
![Dark Mode - Home Screen](../Notes-Application/assets/images/Dark%20Mode.jpeg)



### Full Feature Walkthrough
[Watch Full Demo Video](./assets/Demo%20Video.mp4)

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saimahmed78/Notes-Mobile-Applcation.git
   cd Notes-Mobile-Applcation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build native modules** (for Android/iOS)
   ```bash
   npx expo prebuild --clean
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on Android or iOS**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web

## 📱 Usage

### Creating a Note
1. Tap the **"New Note"** button
2. Enter the note title (required)
3. Add a description (optional)
4. Tap **"Create"** to save

### Editing a Note
1. Tap on any note card
2. Modify the title or description
3. Tap **"Update"** to save changes

### Deleting a Note
1. Tap the delete icon (🗑️) on the note card
2. Confirm deletion in the dialog

### Searching Notes
1. Use the search bar at the top
2. Type keywords to filter notes by title
3. Clear the search to see all notes

### Toggling Theme
1. Tap the theme icon in the header (☀️ for light mode, 🌙 for dark mode)
2. The entire app theme will switch instantly

## 📁 Project Structure

```
Notes-Application/
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Root layout and navigation
│   │   └── index.tsx            # Main notes screen
│   ├── components/
│   │   ├── Header.tsx           # App header with theme toggle
│   │   ├── TaskCard.tsx         # Individual note card
│   │   └── TaskModal.tsx        # Create/Edit note modal
│   └── utils/
│       └── taskStorage.ts       # Task interface definitions
├── assets/
│   ├── images/
│   │   ├── screenshots/         # App screenshots
│   │   └── tabIcons/           # Tab icons
│   ├── videos/
│   │   └── demos/              # Demo videos
│   └── expo.icon/              # App icon
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── app.json                    # Expo configuration
└── README.md                   # Project documentation
```

## 🛠️ Technologies Used

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo Router** - Navigation and routing
- **TypeScript** - Type-safe JavaScript
- **Expo Icons** - Material Community Icons

### Styling
- **StyleSheet** - React Native styling API
- **Responsive Design** - Uses `useWindowDimensions` for dynamic layouts

### State Management
- **React Hooks** - useState, useEffect, useColorScheme

### Components
- **Pressable** - Accessible button component
- **TextInput** - Input fields for notes
- **FlatList** - Optimized list rendering
- **Modal** - Slide-up modal for creating/editing
- **KeyboardAvoidingView** - Keyboard management

## 🚀 Future Enhancements

### 1. **Local Storage/Database**
- [ ] Implement AsyncStorage for persistent data storage
- [ ] Add SQLite for more advanced database features
- [ ] Cloud sync with Firebase Firestore

### 2. **Rich Text Editing**
- [ ] Add rich text editor with formatting options
- [ ] Support for bold, italic, underline text
- [ ] Text color and background color options
- [ ] Code block support

### 3. **Categories & Tags**
- [ ] Organize notes into categories
- [ ] Add tags for better organization
- [ ] Filter notes by category or tag
- [ ] Color-coded categories

### 4. **Advanced Search**
- [ ] Full-text search across all notes
- [ ] Search filters by date range
- [ ] Search by tags or categories
- [ ] Search history

### 5. **User Authentication**
- [ ] User registration and login
- [ ] Firebase Authentication integration
- [ ] Password recovery
- [ ] Social login options

### 6. **Cloud Backup & Sync**
- [ ] Cloud storage integration (Google Drive, Dropbox)
- [ ] Automatic backup feature
- [ ] Multi-device synchronization
- [ ] Backup versioning and restore

### 7. **Media Support**
- [ ] Add images to notes
- [ ] Record voice notes
- [ ] Video attachments
- [ ] Drawing/sketching in notes

### 8. **Collaboration Features**
- [ ] Share notes with other users
- [ ] Real-time collaborative editing
- [ ] Comments and mentions
- [ ] Permission management

### 9. **Reminders & Notifications**
- [ ] Set reminders for notes
- [ ] Push notifications
- [ ] Due date tracking
- [ ] Priority levels

### 10. **Customization**
- [ ] Custom app themes
- [ ] Font size adjustment
- [ ] Line height customization
- [ ] Custom color schemes

### 11. **Performance Improvements**
- [ ] Virtual scrolling for large lists
- [ ] Lazy loading
- [ ] Caching strategies
- [ ] Optimization for older devices

### 12. **UI/UX Enhancements**
- [ ] Swipe gestures for note actions
- [ ] Drag and drop to reorder notes
- [ ] Floating action button improvements
- [ ] Haptic feedback
- [ ] Animations and transitions

### 13. **Export Features**
- [ ] Export notes as PDF
- [ ] Export as Markdown
- [ ] Export to email
- [ ] Share as text

### 14. **Offline Support**
- [ ] Work offline with local storage
- [ ] Sync when online
- [ ] Conflict resolution

## 📝 Component Documentation

### Header.tsx
Displays the app name "Brain Dump" with a dark/light theme toggle button.

**Props:**
- `isDark: boolean` - Current theme state
- `onToggleTheme: (isDark: boolean) => void` - Theme toggle callback

### TaskCard.tsx
Displays individual note cards with title, description, creation date, and delete button.

**Props:**
- `task: Task` - Note data
- `isDark: boolean` - Current theme
- `onPress: (task: Task) => void` - Edit callback
- `onDelete: (taskId: string) => void` - Delete callback

### TaskModal.tsx
Modal for creating and editing notes with keyboard management.

**Props:**
- `visible: boolean` - Modal visibility
- `isDark: boolean` - Current theme
- `onClose: () => void` - Close callback
- `onSubmit: (title: string, description: string) => void` - Submit callback
- `initialTitle?: string` - Initial title for editing
- `initialDescription?: string` - Initial description for editing
- `isEditing?: boolean` - Edit mode flag

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Saim Ahmed**
- GitHub: [@Saimahmed78](https://github.com/Saimahmed78)
- LinkedIn: (https://www.linkedin.com/in/saim-ahmed-722b802ba/)
- Course: Android Development Course - Week 3

## 📞 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.


**Last Updated:** May 12, 2026
**Version:** 1.0.0
