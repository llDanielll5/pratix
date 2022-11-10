import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../../constants/colors";
import Offers from "./offers";
import { usePurchases } from "../../hooks/usePurchases";
import { PurchasesPackage } from "react-native-purchases";
import { getPackages } from "../../services/purchase";
import PackageItem from "../PackageItem";

interface ModalGetPremiumProps {
  visible: boolean;
  onClose: () => void;
}

const GetPremium: React.FC<ModalGetPremiumProps> = (props) => {
  const { visible, onClose } = props;
  const width = useWindowDimensions().width;
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [purchasing, setPurchasing] = useState(false);
  const offers = [
    "Acesso a todas oportunidades de emprego em primeira mão!",
    "Filtros de busca avançados",
    "Postagem de vagas ilimitadas",
  ];

  usePurchases();

  useEffect(() => {
    getPackages(setPackages);
  }, []);

  const RenderPackages = ({ item }: any) => (
    <PackageItem purchasePackage={item} setIsPurchasing={setPurchasing} />
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ScrollView style={styles.container}>
        <IconButton
          icon={"arrow-left"}
          color={colors.primary}
          size={30}
          onPress={onClose}
          style={styles.closeIcon}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>
            Faça parte agora mesmo da comunidade que mais emprega atualmente!
          </Text>
          <Image
            source={require("../../icons/icon9.png")}
            style={styles.image(width)}
            resizeMode="cover"
          />
          <Offers offer={offers} />
          <Text style={[styles.titleText, { marginTop: 16 }]}>
            Adquira agora nosso plano mensal clicando abaixo!
          </Text>
          <FlatList
            data={packages}
            renderItem={RenderPackages}
            keyExtractor={(item) => item.identifier}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    margin: 0,
    alignSelf: "flex-start",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_500Medium_Italic",
  },
  image: (width: any) => ({
    width: width - 32,
    height: width * 0.8,
    alignSelf: "center",
    marginTop: -16,
  }),
  buttonText: {
    fontFamily: "Poppins_500Medium",
    color: "white",
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
});

export default GetPremium;
