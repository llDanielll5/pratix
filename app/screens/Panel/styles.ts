import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    marginVertical: 10,
    backgroundColor: "white",
    lineHeight: 20,
  },
  containerContent: {
    flex: 1,
    marginTop: 25,
    position: "relative",
    padding: 20,
  },
  containerHeader: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#fff",
  },
  headerContent: {
    marginTop: 0,
  },
  Modal: {
    backgroundColor: "#fff",
    marginTop: 200,
  },
  firstAnimatedView: (animateHeader: any, animateBackground: any) => ({
    width: "100%",
    position: "absolute",
    height: animateHeader,
    zIndex: 999,
    alignItems: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: animateBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }),
  firstViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  userLocationText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#a8a8a8",
    marginBottom: 1,
    marginTop: 7,
  },
  imageUserContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#dedcdc",
  },
  contentScroll: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    width: "100%",
  },
  viewPicker: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    overflow: "hidden",
    marginVertical: 10,
  },
  progressiveContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  textProgressiveInfo: {
    color: "#404040",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  createPostContainer: {
    width: undefined,
    padding: 20,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  createPostText: {
    color: "#404040",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  button: {
    height: 40,
    borderRadius: 8,
    marginTop: 10,
    width: "70%",
    backgroundColor: colors.primary,
    marginBottom: 30,
    alignSelf: "center",
  },
  labelButtonStyle: {
    lineHeight: 22,
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

export default styles;
