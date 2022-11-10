import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 4,
    backgroundColor: colors.white,
  },
  addressButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  addressButtonText: {
    color: colors.black,
    fontFamily: "Montserrat",
    paddingLeft: 8,
    fontSize: 14,
  },
  iconInput: {
    marginTop: 10,
  },
  input: {
    height: 40,
    color: colors.black,
    marginVertical: 8,
    backgroundColor: "white",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 16,
    height: "50%",
    width: "90%",
    borderRadius: 16,
  },
});

export default styles;
