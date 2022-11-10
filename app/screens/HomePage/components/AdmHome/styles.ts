import { StyleSheet } from "react-native";
import colors from "../../../../constants/colors";

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 50,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold_Italic",
    marginBottom: 15,
  },
  admAt: {
    fontSize: 16,
    color: colors.black,
    fontFamily: "Poppins_500Medium",
    marginBottom: 15,
  },

  worksInWeek: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 8,
    color: colors.black,
    width: "100%",
  },
  notFoundText: {
    fontFamily: "Poppins_500Medium_Italic",
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  viewContainer: {
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    marginTop: 30,
  },
  notHaveWorksImage: {
    width: "50%",
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },
  recentPostsTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
    color: colors.black,
    marginBottom: 8,
  },
  viewCards: {
    width: 190,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "white",
    marginRight: 8,
    marginBottom: 8,
    paddingVertical: 12,
  },
  buttonStyle: {
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: colors.black,
  },
  buttonLabelStyle: {
    width: "85%",
    fontFamily: "Poppins_600SemiBold_Italic",
  },
});

export default styles;
