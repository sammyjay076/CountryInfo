import { StyleSheet } from "react-native";

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
  },
  border: {
    borderColor: "#CCCCCC",
  },
  button: {
    // backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  icon: {
    color: "#000000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 8,
    color: "#000000",
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000000",
  },
  text: {
    color: "#FFFFFF",
  },
  border: {
    borderColor: "#666666",
  },
  button: {
    // backgroundColor: "#444444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#DDDDDD",
    fontSize: 16,
  },
  icon: {
    color: "#FFD700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#666666",
    padding: 10,
    borderRadius: 8,
    color: "#FFFFFF",
  },
});

export const getThemeStyles = (theme: string) =>
  theme === "dark" ? darkTheme : lightTheme;
