**1) Title \& Objective**

Tech: Flutter (Dart) + React Native (JavaScript/TypeScript)

&nbsp;Objective: Build foundational mobile apps with both frameworks to understand cross-platform development differences, strengths, weaknesses, and workflow.



**2) Quick Summary of the Technology**

Flutter

Language: Dart





Philosophy: UI rendering engine + widgets → consistent design across platforms





Strengths: Fast development (hot reload), smooth animations, pixel-perfect UI





Used by: Google, BMW, Alibaba, Nubank





Best for: Startups, custom UIs, apps needing identical look on iOS \& Android





React Native

Language: JavaScript/TypeScript





Philosophy: Uses native components + JavaScript bridge





Strengths: Huge ecosystem, reusable JS skills, tight integration with web tech





Used by: Facebook (Meta), Instagram, Bloomberg, Walmart





Best for: Teams familiar with JS, apps needing heavy native integration, rapid experimentation







**3) System Requirements**

General

OS: Windows/macOS/Linux





Editor: VS Code







Flutter Requirements

Flutter SDK (stable channel)





Dart SDK (included)





Android Studio (for emulators)





VS Code extensions:





Flutter





Dart







React Native Requirements

Node.js (18+ recommended)





npm or yarn





Expo CLI or React Native CLI





Android Studio (optional for Expo Go users)





VS Code extensions:





ES7 React Snippets





Prettier





TypeScript (optional but recommended)







**4) Installation \& Setup**

Flutter Setup

flutter --version

flutter doctor



Create a new Flutter project:

flutter create my\_flutter\_app

cd my\_flutter\_app

flutter run





React Native (Expo) Setup

Install Expo CLI:

npm install -g expo-cli



Create a project:

npx create-expo-app my\_rn\_app

cd my\_rn\_app

npm start



Open in Expo Go via QR code or press:

a → open Android emulator





w → open web







**5) Minimal Working Examples**

Flutter — “Hello World”

lib/main.dart

import 'package:flutter/material.dart';



void main() => runApp(const MyApp());



class MyApp extends StatelessWidget {

&nbsp; const MyApp({super.key});



&nbsp; @override

&nbsp; Widget build(BuildContext context) {

&nbsp;   return const MaterialApp(

&nbsp;     home: Scaffold(

&nbsp;       body: Center(

&nbsp;         child: Text("Hello World"),

&nbsp;       ),

&nbsp;     ),

&nbsp;   );

&nbsp; }

}



Run:

flutter run





React Native (Expo) — “Hello World”

Create /app/index.tsx:

import { View, Text } from "react-native";



export default function Index() {

&nbsp; return (

&nbsp;   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

&nbsp;     <Text>Hello World</Text>

&nbsp;   </View>

&nbsp; );

}



Run:

npx expo start



Expected: “Hello World” shows on your phone in Expo Go.



**6) AI Prompt Journal (with refined prompts)**

Step

Prompt Theme

Key Takeaways

1

Understanding the ecosystem (Flutter vs React Native)

Flutter draws everything itself; RN uses native components. Flutter = consistency; RN = native feel + large JS ecosystem.

2

Deep-dive concept (State Management)

Flutter: setState, Provider, Riverpod, Bloc. RN: Context API, Redux, Zustand, Recoil.

3

Guided implementation (simple screen)

Routing differences: Flutter uses Navigator; RN uses Expo Router or React Navigation.

4

Verification

Check rebuild performance (Flutter), check performance with lists and bridge usage (RN). Validate UI consistency and cross-device behavior.





**7) Common Issues \& Fixes**

Issue

Cause

Fix

Black screen in Expo

Wrong file location (index.tsx not in /app)

Move file to /app/index.tsx

Expo can't open on Android

No emulator / physical device connected

Use Expo Go app or set up Android Studio emulator

Flutter Hot Reload not working

Stateful widget lifecycle issue

Use Hot Restart or upgrade Flutter

Metro bundler stuck

Cache issues

npx expo start -c or npm start --reset-cache

“SDK path not found” (Flutter)

Missing Android Studio setup

Install Android Studio and set SDK path

JS errors like undefined is not an object

Using a component before import

Check imports / console logs

Flutter pub get fails

Missing dependencies

Run flutter pub get; check internet \& YAML formatting





**8) References**

Flutter Docs: https://docs.flutter.dev





Dart Language: https://dart.dev





React Native Docs: https://reactnative.dev





Expo: https://docs.expo.dev





React Navigation: https://reactnavigation.org

**9) Conclusion — Advantages, Disadvantages \& When to Pick Each Framework**

Flutter — Summary

&nbsp;Advantages

Consistent UI across all devices because Flutter renders everything itself.





Fast development with hot reload and strong tooling.





Excellent performance (60–120 FPS animations).





Great for custom, animated, and beautiful UIs.





Strong long-term support from Google and a rapidly growing ecosystem.





One codebase also produces desktop and web apps.





&nbsp;Disadvantages

App sizes are generally larger than React Native.





Flutter apps can feel less “native” because the framework controls all UI.





Smaller package ecosystem compared to JavaScript (still huge, but not JS-level).





iOS developers sometimes prefer native SwiftUI over Flutter.





&nbsp;Best When

You want pixel-perfect control over UI design.





You’re building a startup app that needs to look the same on both platforms.





You care about animation, speed, and smoothness (ex: fintech, e-commerce, dashboards).





You want your code to potentially run on mobile, desktop, and web using one framework.







React Native — Summary

&nbsp;Advantages

Uses JavaScript/TypeScript, the most popular dev language.





Integrates deeply with native components, giving a natural platform feel.





Massive community + libraries from the JavaScript ecosystem.





Easier for devs with web development background.





With Expo, development becomes extremely fast and convenient.





Disadvantages

Performance issues can appear in very UI-heavy apps if the JS–Native bridge is overloaded.





UI can behave slightly differently across devices due to native component differences.





Some libraries break after OS updates and require maintenance.





Setting up bare React Native (without Expo) can be harder.





&nbsp;Best When

Your team already knows JavaScript or TypeScript.





You need to integrate with native modules heavily (Bluetooth, sensors, hardware).





You’re building apps like chat apps, social platforms, dashboards, simple utilities, etc.





You want fast iteration and live reloading with Expo Go.





You prefer the “native look” of Android/iOS instead of Flutter’s uniform style.





&nbsp;



