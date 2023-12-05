import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { Link } from "expo-router";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.menu}>
        <View style={styles.loggedIn}>
          <Text style={styles.title}>Workout Tracker</Text>
        </View>
        <Link style={styles.logout} href="/">
          Log Out
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#1663be",
    padding: 15,
    height: 75,
    marginBottom: 25,
    justifyContent: "flex-end",
  },
  menu: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  loggedIn: {
    flexDirection: "row",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  logout: {
    alignSelf: "flex-end",
    fontSize: 16,
    color: "white",
  },
});

export default Header;
