import { StyleSheet, View, Text } from "react-native";
import Exercise from "./exercise";

const Workout = ({ data }) => {
  let workout = [];

  if (!data) return;
  for (let i = 0; i < JSON.parse(data["workout"]).length; i++) {
    workout.push(
      <Exercise
        key={i}
        exercise={JSON.parse(data["workout"])[i]["exercise"]}
        weight={JSON.parse(data["workout"])[i]["weight"]}
        reps={JSON.parse(data["workout"])[i]["reps"]}
        sets={JSON.parse(data["workout"])[i]["sets"]}
      />
    );
  }

  return (
    <View style={styles.container}>
      {workout}
      <View style={styles.timestampView}>
        <Text style={styles.timestamp}>{data["created_at"]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
    borderBottomColor: "grey",
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    fontSize: 24,
  },
  timestampView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  timestamp: {
    alignContent: "flex-end",
    color: "grey",
  },
});

export default Workout;
