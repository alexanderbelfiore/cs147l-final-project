import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { supabase } from "./env";

export default function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const getUser = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["username"] === username) {
        return i + 1;
      }
    }
    addData();
    return users.length + 1;
  };

  const locateUser = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["username"] === username) {
        return i + 1;
      }
    }
    return users.length + 1;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.from("users").select("*");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const addData = async () => {
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: users.length + 1,
        username: username,
      })
      .select();
    if (error) console.error(error);
    setUsers((oldUsers) => [...oldUsers, data[0]]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.header}>Please Log In</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Link
          style={styles.login}
          href={{
            pathname: "/user/workouts",
            params: {
              id: locateUser(),
              username: username,
            },
          }}
          onPress={getUser}
          asChild
        >
          <Pressable>
            <View style={styles.loginButton}>
              <Text style={styles.login}>Login</Text>
            </View>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    backgroundColor: "#89CFF0",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 240,
    margin: 10,
    borderWidth: 2,
    backgroundColor: "white",
  },
  loginButton: {
    marginTop: 10,
    width: 180,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#1663be",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
