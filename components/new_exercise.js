import { StyleSheet, View, Text, TextInput } from "react-native";
import { useState } from "react";

const NewExercise = ({ textInputValues, setTextInputValues, isInput }) => {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const handleExerciseChange = (text) => {
    setExercise(text);
    setTextInputValues({
      ...textInputValues,
      exercise: text,
    });
  };

  const handleWeightChange = (text) => {
    setWeight(text);
    setTextInputValues({
      ...textInputValues,
      weight: text,
    });
  };

  const handleRepsChange = (text) => {
    setReps(text);
    setTextInputValues({
      ...textInputValues,
      reps: text,
    });
  };

  const handleSetsChange = (text) => {
    setSets(text);
    setTextInputValues({
      ...textInputValues,
      sets: text,
    });
  };

  if (isInput) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.longInput}
          mode="outlined"
          placeholder="Exercise"
          value={exercise}
          onChangeText={handleExerciseChange}
        />
        <View style={styles.numbers}>
          <TextInput
            style={styles.shortInput}
            mode="outlined"
            placeholder="Weight"
            value={weight}
            onChangeText={handleWeightChange}
          />
          <TextInput
            style={styles.shortInput}
            mode="outlined"
            placeholder="Reps"
            value={reps}
            onChangeText={handleRepsChange}
          />
          <TextInput
            style={styles.shortInput}
            mode="outlined"
            placeholder="Sets"
            value={sets}
            onChangeText={handleSetsChange}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Exercise: {exercise}</Text>
        <Text>Weight: {weight}</Text>
        <Text>Reps: {reps}</Text>
        <Text>Sets: {sets}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8C92AC",
    padding: 25,
    borderRadius: 20,
    marginVertical: 10,
  },
  longInput: {
    width: 240,
    height: 40,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shortInput: {
    width: 70,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default NewExercise;
