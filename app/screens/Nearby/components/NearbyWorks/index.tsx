import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { useRecoilValue } from "recoil";
import { UserType } from "../../../../../enum";
import { Posts } from "../../../../../types";
import UserData from "../../../../atom/UserData";
import styles from "../../styles";

interface NearbyWorksProps {
  modalfr: any;
  data: Posts[];
  search: string;
  locale: string;
  openPremiumModal: () => void;
}

const NearbyWorks: React.FC<NearbyWorksProps> = (props) => {
  const { locale, modalfr, data, search, openPremiumModal } = props;
  const userData = useRecoilValue(UserData);

  const PostCards = ({ item, index }: { item: Posts; index: number }) => {
    return (
      <View key={index} style={styles.cardListContainer}>
        <TouchableNativeFeedback onPress={() => modalfr(index)}>
          <View>
            <View style={{ flexDirection: "row", height: 125 }}>
              <View style={styles.rightContainerCardList}>
                <Text style={styles.titleCardList}>
                  {item?.title} - {item?.location?.city}
                </Text>
                <Text style={styles.descriptionCardList} numberOfLines={3}>
                  {item?.description}
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
              <View style={styles.buttonAcceptCardList}>
                <Text style={styles.textButtonCardList}>
                  Quero me candidatar
                </Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  const NotPremiumUser = ({ item, index }) => (
    <View key={index} style={styles.cardListContainer}>
      <TouchableNativeFeedback onPress={openPremiumModal}>
        <View>
          <View style={{ flexDirection: "row", height: 125 }}>
            <View style={styles.rightContainerCardList}>
              <Text style={styles.titleCardListNotPremium}>
                Você só pode visualizar essa oferta de trabalho no modo Premium!
              </Text>
              <Text style={styles.descriptionCardList} numberOfLines={3}></Text>
            </View>
          </View>
          <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
            <View style={styles.buttonAcceptCardList}>
              <Text style={styles.textButtonCardList}>
                Adquirir o Premium agora!
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  const footerFlatlist = () => (
    <View style={{ height: 100, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>
        Essas são as ofertas recentes para a sua localidade!
      </Text>
    </View>
  );

  const renderFlatlist =
    userData?.usertype === "PREMIUM" || userData?.usertype === "ADM"
      ? PostCards
      : NotPremiumUser;

  return (
    <View style={styles.innerContainer}>
      <View style={{ paddingBottom: 15, height: "auto" }}>
        <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 13 }}>
          {data?.length} Trabalho(s) perto de você:{" "}
          {search?.length > 0 ? search : locale}
        </Text>
      </View>

      <FlatList
        data={data}
        extraData={data}
        renderItem={renderFlatlist}
        keyExtractor={(item, index) => `${item}${index}`}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.innerFlatlist}
        style={styles.flatlist}
        ListFooterComponent={footerFlatlist}
      />
    </View>
  );
};

export default NearbyWorks;
