import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 40,
    lineHeight: 30,
    marginVertical: 10,
    backgroundColor: "white",
    padding: 10,
  },
  inputRegister: {
    width: "100%",
    height: 40,
    lineHeight: 30,
    marginVertical: 10,
    backgroundColor: "white",
    padding: 10,
  },
  wrapper: {
    paddingTop: 50,
    flex: 1,
  },
  modal2: {
    height: 230,
    backgroundColor: "#3B5998",
  },
  modal4: {
    height: 300,
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "#222",
    padding: 10,
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    color: "#222",
    height: 50,
    backgroundColor: "transparent",
  },
  text: {
    color: "black",
    fontSize: 22,
  },
  notLoggedContainer: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  button: {
    height: 56,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonGoogle: {
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
  labelButtonGoogleStyle: {
    lineHeight: 35,
    fontWeight: "bold",
    fontSize: 18,
    color: colors.primary,
  },
  notAccountContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  normalText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  textBig: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  modalRegister: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    minWidth: 250,
  },
  modalRegisterText: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "white",
    width: "100%",
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#ccc",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  panel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
});

export default styles;
