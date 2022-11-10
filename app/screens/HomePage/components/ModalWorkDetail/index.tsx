import React from "react";
import { View, Text, Modal, TouchableNativeFeedback } from "react-native";
import styles from "../UserHasLogged/styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ModalWorkProps {
  visible: boolean;
  closeModal: () => void;
}

const ModalWorkDetail: React.FC<ModalWorkProps> = (props) => {
  const { visible, closeModal } = props;
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={closeModal}>
      <View>
        <View style={styles.statisticContainer}>
          <Text style={{ fontSize: 19, fontWeight: "800", color: "#393939" }}>
            Estatísticas da sua publicação #ID2361
          </Text>
          <View style={styles.viewsContainer}>
            <Text style={styles.poppinsNormal14}>
              <FontAwesome5 name="eye" size={14} color="black" /> Visualizações:
              1405 usuários{" "}
            </Text>
            <Text style={styles.poppinsNormal14}>
              <MaterialCommunityIcons
                name="cursor-default-click-outline"
                size={14}
                color="black"
              />{" "}
              Interações: 983 usuários{" "}
            </Text>
            <Text style={styles.poppinsNormal14}>
              <Ionicons name="time-outline" size={14} color="black" /> Tempo de
              publicação: 23 dia(s){" "}
            </Text>
          </View>
          <View style={styles.workContainer}>
            <View style={styles.innerWorkContainer}>
              <Text style={styles.poppins600n18}>Programador Full Stack</Text>
              <Text style={{ fontSize: 12, color: "#ccc" }}>Washigton, DC</Text>
            </View>
            <View style={{ padding: 15 }}>
              <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular" }}>
                É necessário o conhecimento avançado dentro da área "Programador
                Full Stack", dominando o trabalho requisitado entre Sexta aos
                Sabádos, em um modelo remoto de trabalho.
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.poppinsBold14}>Detalhes</Text>
              </View>
              <View style={{ marginTop: 7, flexDirection: "column" }}>
                <View style={{ width: "100%" }}>
                  <Text style={styles.poppinsMedium13}>Horario</Text>
                  <Text style={[styles.poppinsBold11, { paddingRight: 20 }]}>
                    Sexta aos Sabádos
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.poppinsMedium13}>Salário medio</Text>
                  <Text style={styles.poppinsBold11}>$20,41 - $25,70</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 40 }}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#E6E6E6")}
              onPress={closeModal}
            >
              <View style={styles.stopPostContainer}>
                <Text style={styles.poppinsMedium13}>
                  <AntDesign name="pause" size={16} color="#404040" /> Pausar
                  anúncio
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#E6E6E6")}
              onPress={closeModal}
            >
              <View style={styles.removePostContainer}>
                <Text style={styles.poppinsMedium13}>
                  <FontAwesome name="trash-o" size={15} color="#404040" />{" "}
                  Remover anúncio
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWorkDetail;
