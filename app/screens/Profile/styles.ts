import { StyleSheet, useWindowDimensions } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 0.4,
    padding: 10,
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
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
  imageContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#dedcdc",
  },
  fontNormal12: {
    fontSize: 12,
    fontWeight: "400",
    color: "#a8a8a8",
    marginBottom: 1,
    marginTop: 7,
  },
  poppinsMedium14: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginVertical: 5,
  },
  changeDatesText: {
    width: "100%",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  scrollContent: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    width: "100%",
  },
  bigImage: {
    width: 220,
    height: 220,
    borderRadius: 200,
    backgroundColor: "#dedcdc",
  },
  privateDates: {
    marginVertical: 20,
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
  },
  loading: {
    height: 50,
    width: "100%",
    alignSelf: "center",
  },
  loadingContainer: {
    position: "absolute",
    width: "110%",
    zIndex: 999,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
  },
  loadingText: (widthDevice: number) => ({
    color: "#fff",
    width: "50%",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 80,
    fontFamily: "Poppins_700Bold_Italic",
  }),
  username: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  phone: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});

export default styles;
