import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GameButton from "./GameButton";

const QuestionOfTheDay = ({ question, onSubmit, style, numberOfSets, numberOfCardsInSet }) => {
  const [text, setText] = useState("");

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.topTag}>
        <Text style={styles.topTagText}>{"Question of the day"}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question ? `Q: ${question}` : ""}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Minium 20 words..."
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          onChangeText={setText}
        />
        <GameButton text="Submit" onPress={() => onSubmit(text)} />
        <Text style={styles.bottomText}>
          {`Reward ${numberOfSets} Set (${numberOfCardsInSet}) of scratch cards`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "start",
  },
  topTag: {
    color: "#FFFFFF",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: "#FFDEA866",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  topTagText: {
    fontFamily: "Teko-Medium",
    color: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  questionContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 32,
    paddingBottom: 32,
    paddingRight: 16,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#3D3D3D",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  question: {
    fontFamily: "Inter-Medium",
    color: "#A6A6A6",
    fontSize: 16,
    marginBottom: 16,
  },
  textInput: {
    fontFamily: "Inter-Medium",
    color: "#fff",
    fontSize: 16,
    justifyContent: "top",
    borderColor: "#262626",
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    placeholderTextColor: "#5F5F5F",
    marginBottom: 24,
    backgroundColor: "#212121",
  },
  bottomText: {
    fontFamily: "Inter-Medium",
    color: "#A6A6A6",
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
  },
});

export default QuestionOfTheDay;
