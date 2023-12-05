import { StyleSheet, Text, SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import Header from "../../components/header.js";

export default function HomeLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
