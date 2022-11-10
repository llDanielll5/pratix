import React from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  Linking,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Posts } from "../../../../../types";
import styles from "./styles";

interface ModalOpenWorkProps {
  visible: boolean;
  closeModal: () => void;
  indexPost: number;
  data: Posts[];
}

const ModalOpenWork: React.FC<ModalOpenWorkProps> = (props) => {
  const { visible, closeModal, indexPost, data } = props;

  function LinkingOpenDial() {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `whatsapp://send?phone=55${data?.[indexPost]?.employer?.phone}`;
    } else {
      phoneNumber = `whatsapp://send?phone=55${data?.[indexPost]?.employer?.phone}`;
    }
    Linking.openURL(phoneNumber);
  }
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={closeModal}>
      <ScrollView>
        <View style={styles.modalContainer}>
          {data?.map((item, index) => {
            if (index === indexPost)
              return (
                <View>
                  <Text style={styles.fullName}>{item?.title}</Text>
                  <Text style={styles.locale}>{item?.location}</Text>
                </View>
              );
          })}
        </View>
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          {data.map((item, index) => {
            return (
              index === indexPost && (
                <Text style={styles.description}>{item?.description}</Text>
              )
            );
          })}
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.detailsText}>Detalhes</Text>
            </View>
            <View style={{ marginTop: 20, flexDirection: "column" }}>
              <View style={{ width: "100%" }}>
                <Text style={styles.hourText}>Horario</Text>
                <Text style={styles.timeText}>{data?.[indexPost]?.hours}</Text>
              </View>
              <View style={{ width: "100%" }}>
                <Text style={styles.paymentText}>Salário medio</Text>
                <Text style={styles.valueText}>
                  {data?.[indexPost]?.hourlyWage} p/hora
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={LinkingOpenDial}
            activeOpacity={0.6}
          >
            <Text style={styles.contactText}>Entre em contato</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalOpenWork;
