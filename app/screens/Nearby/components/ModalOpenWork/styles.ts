import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    padding: 15,
    justifyContent: "center",
    minHeight: 90,
    alignItems: "center",
  },
  fullName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  locale: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  innerContainer: {
    padding: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  detailsContainer: {
    width: "100%",
    minHeight: 180,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2.51,
    elevation: 2,
    justifyContent: "center",
  },
  detailsText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#393939",
  },
  hourText: {
    fontFamily: "Poppins_500Medium",
    color: "#393939",
    fontSize: 13,
  },
  timeText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#a8a8a8",
    fontSize: 11,
    paddingRight: 20,
  },
  paymentText: {
    fontFamily: "Poppins_500Medium",
    color: "#393939",
    fontSize: 13,
  },
  valueText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#a8a8a8",
    fontSize: 11,
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    marginTop: 20,
    borderRadius: 23.5,
    justifyContent: "center",
    alignItems: "center",
  },
  contactText: {
    fontFamily: "Poppins_500Medium",
    letterSpacing: 1.12,
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 13,
  },
});

export default styles;
