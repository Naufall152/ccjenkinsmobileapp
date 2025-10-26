import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = (props) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.drawer.current.openDrawer()}>
          <Image
            source={require("../assets/menu.png")}
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.iconsView}>
            <Image
              source={require("../assets/facebook.png")}
              style={styles.icons}
            />
            <Image
              source={require("../assets/youtube.png")}
              style={styles.icons}
            />
            <Image
              source={require("../assets/twitter.png")}
              style={styles.icons}
            />
            <Image
              source={require("../assets/search.png")}
              style={styles.icons}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#AA0002", 
  },
  header: {
    backgroundColor: "#AA0002",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  iconsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    width: 36,
    height: 16,
    resizeMode: "contain",
  },
});

export default Header;