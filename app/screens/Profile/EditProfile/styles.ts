import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 25,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#ccc",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  container: {
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: "white",
    color: "#ccc",
    marginVertical: 12,
  },
  logo: {
    width: "70%",
    height: 80,
    alignSelf: "center",
    marginTop: 25,
  },
  button: {
    height: 56,
    borderRadius: 8,
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
  },
  labelButtonStyle: {
    lineHeight: 35,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  addressContainer: {
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.primary,
    width: "100%",
    marginVertical: 16,
  },
  addressText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    alignSelf: "center",
  },
});

export default styles;
