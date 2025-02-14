# 🌍 Country Info App 👋

A **React Native Expo** mobile app that displays a list of countries with detailed information. It includes **light/dark mode theme switching** for better user experience. This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

![App Preview](./assets//images//simulator_screenshot_E1293650-EAD8-4A7D-82A8-C7E2C9B61F07.png) *(Replace with an actual screenshot)*

---

## 📌 Features

✅ Fetches a list of **countries** from [REST Countries API](https://restcountries.com/v3.1/all)
✅ Displays **country details** (name, flag, capital, population, etc.)
✅ **Search bar** to filter countries by name
✅ **Light/Dark theme toggle** for UI customization
✅ **Persistent theme storage** using AsyncStorage
✅ Responsive layout for mobile devices
✅ Deployed on **Appetize.io** for online testing

## 📦 Dependencies

1. [React Native Bottom Sheet](https://www.npmjs.com/package/@gorhom/bottom-sheet) for bottom sheets
2. [React Native Async Storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) to store data on the user's device's physical memory

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
