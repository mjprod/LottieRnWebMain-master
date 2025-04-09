import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GameButton from "../../../components/GameButton";
import { Colors, Fonts } from "../../../util/constants";

const QuestionOfTheDay = ({ question, onSubmit, style, numberOfSets, numberOfCardsInSet }) => {
  const [text, setText] = useState("");

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.topTag}>
        <Text style={styles.topTagText}>{"Question of the day"}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}><Text style={styles.qText}>Q: </Text>{question ? `${question}` : ""}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Scratch set unlocks after 20 words.."
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
    color: Colors.jokerWhite50,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.jokerBlack800,
    borderColor: Colors.jokerGold40040,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  topTagText: {
    fontFamily: Fonts.TekoMedium,
    color: Colors.jokerWhite50,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  questionContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.jokerBlack800,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.jokerBlack200,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  qText: {
    color: Colors.jokerWhite50,
  },
  question: {
    fontFamily: Fonts.InterRegular,
    color: Colors.jokerBlack50,
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    fontFamily: Fonts.InterMedium,
    color: Colors.jokerWhite50,
    fontSize: 16,
    height: 136,
    backgroundColor: Colors.jokerBlack600,
    borderColor: Colors.jokerBlack300,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    placeholderTextColor: Colors.jokerBlack100,
    selectionColor: Colors.jokerGold400,
    marginBottom: 24,
    justifyContent: "top",
  },
  bottomText: {
    fontFamily: "Inter-Medium",
    color: "#A6A6A6",
    textAlign: "center",
    fontSize: 16,
    marginTop: 12,
  },
});

export default QuestionOfTheDay;
