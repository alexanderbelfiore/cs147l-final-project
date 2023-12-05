import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../env";
import { AntDesign } from "@expo/vector-icons";
import Workout from "../../components/workout";

export default function Workouts() {
  const [workoutData, setWorkoutData] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);

  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.from("workouts").select("*");
      setAllWorkouts(response.data);
    };
    fetchData();

    const fetchYourData = async () => {
      const response = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", params["id"]);
      if (response.error) console.error(response.error);
      setWorkoutData(response.data);
    };
    fetchYourData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.intro}>Hello {params["username"]}</Text>
        {workoutData.map((element, index) => (
          <Workout key={index} data={element} />
        ))}
      </ScrollView>

      <View style={styles.newWorkoutBtn}>
        <Link
          href={{
            pathname: "/user/new_workout",
            params: {
              id: params["id"],
              username: params["username"],
              dbSize: allWorkouts.length,
            },
          }}
          asChild
        >
          <Pressable>
            <View style={styles.newWorkout}>
              <AntDesign name="plus" size={35} color="white" />
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
    padding: 20,
  },
  intro: {
    fontSize: 30,
  },
  newWorkoutBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  newWorkout: {
    backgroundColor: "#1663be",
    height: 60,
    borderRadius: 30,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
