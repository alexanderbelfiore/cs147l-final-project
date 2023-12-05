import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { supabase } from "../env";
import { Entypo } from "@expo/vector-icons";
import NewExercise from "../../components/new_exercise";

export default function NewWorkout() {
  const [exercises, setExercises] = useState([
    <NewExercise
      key={0}
      textInputValues={textInputValues}
      setTextInputValues={setTextInputValues}
      isInput={true}
    />,
  ]);
  const [textInputValues, setTextInputValues] = useState({
    exercise: "",
    weight: "",
    reps: "",
    sets: "",
  });
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [workoutData, setWorkoutData] = useState([]);
  const [latestData, setLatestData] = useState(null);

  const params = useLocalSearchParams();

  useEffect(() => {
    addDataToDatabase();
  }, [latestData]);

  const testExercise = () => {
    exerciseData = { ...textInputValues };
    setSuccessText("");
    if (
      !exerciseData["exercise"] ||
      !exerciseData["weight"] ||
      !exerciseData["reps"] ||
      !exerciseData["sets"]
    ) {
      setErrorText("Must fill out required fields");
      return;
    }
    exerciseData["weight"] = Number(exerciseData["weight"]);
    exerciseData["reps"] = Number(exerciseData["reps"]);
    exerciseData["sets"] = Number(exerciseData["sets"]);

    if (
      isNaN(exerciseData["weight"]) ||
      isNaN(exerciseData["reps"]) ||
      isNaN(exerciseData["sets"])
    ) {
      setErrorText("Values must be numbers");
      return;
    }
    setWorkoutData((oldData) => [...oldData, exerciseData]);
    setErrorText("");
    addExercise();
  };

  const addExercise = () => {
    setExercises((oldExercises) => [
      ...oldExercises,
      <NewExercise
        key={exercises.length}
        textInputValues={textInputValues}
        setTextInputValues={setTextInputValues}
        isInput={true}
      />,
    ]);
    setTextInputValues({ exercise: "", weight: "", reps: "", sets: "" });
  };

  const addData = () => {
    setLatestData(workoutData);
  };

  const addDataToDatabase = async () => {
    if (latestData) {
      if (latestData.length == 0) {
        setErrorText("Add an exercise before saving");
        return;
      }
      const { data, error } = await supabase.from("workouts").insert({
        id: params["dbSize"],
        created_at: new Date().toLocaleString(),
        user_id: params["id"],
        workout: JSON.stringify(workoutData),
      });
      if (error) console.error(error);
      setLatestData(null);
      setSuccessText("Workout Saved! Go back to see your workouts.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {exercises.map((element, index) => (
          <NewExercise
            key={index}
            textInputValues={textInputValues}
            setTextInputValues={setTextInputValues}
            isInput={index === exercises.length - 1}
          />
        ))}
        <Button title="Add Exercise" onPress={testExercise} />
        <Button title="Save Workout" onPress={addData} />

        <Text style={styles.errorText}>{errorText}</Text>
        <Text style={styles.successText}>{successText}</Text>
        <Link
          style={styles.backBtn}
          href={{
            pathname: "/user/workouts",
            params: {
              id: params["id"],
              username: params["username"],
            },
          }}
          asChild
        >
          <Pressable>
            <View style={styles.backView}>
              <Entypo name="chevron-thin-left" size={24} color="grey" />
              <Text style={styles.backText}>Back</Text>
            </View>
          </Pressable>
        </Link>
      </ScrollView>
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
  errorText: {
    color: "red",
  },
  successText: {
    color: "green",
  },
  backView: {
    justifyContent: "center",
    flexDirection: "row",
  },
  backText: {
    fontSize: 18,
    color: "grey",
  },
});
