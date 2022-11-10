import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../../constants/colors";

interface Offer {
  offer: string;
}
interface OfferProps {
  offer: string[];
}

const Offers: React.FC<OfferProps> = (props) => {
  const { offer } = props;
  const OfferList = (props: Offer) => (
    <View style={styles.rowContainer}>
      <IconButton
        icon={"star"}
        color={"gold"}
        size={24}
        style={{ margin: 0 }}
      />
      <Text style={styles.offerText}>{props.offer}</Text>
    </View>
  );
  return (
    <View style={styles.offers}>
      {offer?.map((offer, index) => (
        <OfferList key={index} offer={offer} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  offers: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e5e5e5",
    borderRadius: 4,
    borderWidth: 1,
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  offerText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginLeft: 8,
    marginTop: 4,
  },
});

export default Offers;
