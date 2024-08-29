import React from "react";
import { Image } from "react-native";
import { StyleSheet, View, Text ,TouchableOpacity} from "react-native";

import LottieView from "react-native-web-lottie";

const lottieAppBackground = require("../assets/lotties/lottieAppBackground.json");
const coinIcon = require("./../assets/image/icon_currency_joker_coin.png");


const ScratchAndWin = () => {
  return (
    <View style={styles.containerNav}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          {/*<FontAwesome5 name="arrow-left" size={24} color="white" />*/}
        </TouchableOpacity>
        <Text style={styles.headerText}>SCRATCH & WIN</Text>
      </View>

      <Text style={styles.balanceLabel}>Current Balance</Text>

      <View style={styles.balanceContainer}>
          {<Image tintColor='#FFDEA8' source={coinIcon} style={styles.coinIcon} />}
        <Text style={styles.balanceText}>500 JKC</Text>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.iconButton}>
             {/*<FontAwesome5 name="home" size={24} color="white" />*/}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
             {/*<FontAwesome5 name="bars" size={24} color="white" />*/}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NavLayout = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewBackground}>
        <LottieView
          source={lottieAppBackground}
          autoPlay={true}
          speed={0}
          loop={true}
        />
      </View>
      <ScratchAndWin />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBackground: {
    flexDirection:'flex-start',
    backgroundColor:'#222021',
    height:170,
    overflow: 'hidden'
  },
  textContainer: {
    position: "absolute",

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Teko-Medium",
    color: "#FFDFAB",
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  textColumn: {
    marginTop: 0,
    marginLeft: -10,
    height: 100,
  },
  textTitle: {
    color: "white",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 12,
    marginBottom: 85,
  },
  textCentered: {
    color: "white",
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 12,
    marginLeft: 15,
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  containerNav: {
    position: 'absolute',
    flexDirection: 'flex-start',
    backgroundColor: 'transparent', // Background color from the image
    top: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    //position: 'absolute',
    top: 20,
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    fontFamily: "Teko-Medium",
    fontSize: 26,
    color: '#FFDEA8',
    //fontWeight: 'bold',
  },
  balanceLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: 'white',
    marginTop: 40,
    textAlign: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A88C5D',
    padding: 12,
    paddingHorizontal: '16%',
    borderRadius: 5,
    marginTop: 5,
  },
  balanceText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: 'white',
    marginLeft: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  iconButton: {
    backgroundColor: 'transparent',
  },
});

export default NavLayout;
