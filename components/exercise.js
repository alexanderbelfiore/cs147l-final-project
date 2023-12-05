import { StyleSheet, View, Text } from "react-native";

const Exercise = ({ exercise, weight, reps, sets }) => {
  return (
    <View style={styles.exercise}>
      <Text style={styles.name}>{exercise}</Text>
      <View style={styles.stats}>
        <Text>{weight} lbs</Text>
        <Text>{reps} reps</Text>
        <Text>{sets} sets</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exercise: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default Exercise;
