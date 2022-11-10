import React from "react";
import ProgressBarMultiStep from "react-native-progress-bar-multi-step";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { tabs } from "../../pickerValues";
import {
  addNewPost,
  getPostInfos,
  updatePost,
  updateUserInfos,
} from "../../../../firebase/functions";
import { Posts, User } from "../../../../../types";
import { useRecoilValue } from "recoil";
import UserData from "../../../../atom/UserData";
import { arrayUnion, Timestamp } from "firebase/firestore";
import Loading from "../../../../components/Loading";
import { Button } from "react-native-paper";

interface ModalPostingProps {
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
  onFinish: () => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  locale: string;
  vacanceType: string;
  modelWork: string;
  hour: string;
  money: string;
  level: string;
  description: string;
}

const ModalPosting: React.FC<ModalPostingProps> = (props) => {
  const {
    visible,
    onClose,
    setLoading,
    loading,
    hour,
    level,
    locale,
    modelWork,
    money,
    vacanceType,
    description,
    onFinish,
  } = props;

  const userData = useRecoilValue(UserData);

  async function handleSubmit() {
    setLoading(true);
    const postData: Posts = {
      employer: {
        email: userData?.email ?? "",
        name: userData?.name ?? "",
        phone: userData?.phone ?? "",
        username: userData?.username ?? "",
        profileImage: userData?.profileImage ?? "",
      },
      hourlyWage: money,
      hours: hour,
      knowledge: level,
      location: locale,
      title: vacanceType,
      workModel: modelWork,
      description,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      const resultID = await addNewPost(postData);
      if (resultID) {
        await updatePost({ id: resultID, ...postData }, resultID).then(
          async () => {
            const postDataByID = await getPostInfos(resultID);
            const user: User = { posts: arrayUnion(postDataByID) };
            await updateUserInfos(user, userData?.username).then(() =>
              onFinish()
            );
          }
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Erro ao criar vaga");
    }
  }
  return (
    <Modal visible={visible} style={styles.Modal} onRequestClose={onClose}>
      <ScrollView>
        <View style={styles.containerContent}>
          <ProgressBarMultiStep
            progressive={true}
            page={3}
            tabs={tabs}
            containerStyle={{ height: 100 }}
            stepNumberStyle={{ fontSize: 13 }}
            circleStyle={{ width: 30, height: 30 }}
          />
          {loading && <Loading isLoading size={50} style={styles.loading} />}
          {!loading && (
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 18, color: "#404040", fontWeight: "700" }}
                >
                  Perfeito! Confirme as informações abaixo se estão corretas!
                </Text>
                <View style={styles.infoContainer}>
                  <View style={styles.vacanceTypeStyle}>
                    <Text style={styles.vacanceTypeText}>{vacanceType}</Text>
                    <Text style={{ fontSize: 12, color: "#ccc" }}>
                      {locale}
                    </Text>
                  </View>
                  <View style={{ padding: 15 }}>
                    <Text
                      style={{ fontSize: 13, fontFamily: "Poppins_400Regular" }}
                    >
                      É necessário o conhecimento {level} dentro da área "
                      {vacanceType}", no período de: {hour}, em um modelo{" "}
                      {modelWork} de trabalho.{"\n \n"}
                      {description}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <View>
                      <Text style={styles.detailsText}>Detalhes</Text>
                    </View>
                    <View style={{ marginTop: 7, flexDirection: "column" }}>
                      <View style={{ width: "100%" }}>
                        <Text style={styles.hour}>Horario</Text>
                        <Text style={styles.hourText}>{hour}</Text>
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text style={styles.money}>Salário medio</Text>
                        <Text style={styles.moneyText}>{money} p/hora</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.buttonStyle}
                  labelStyle={styles.text13Normal}
                  color={"black"}
                  onPress={onClose}
                >
                  Voltar
                </Button>
                <Button
                  style={styles.buttonStyle}
                  labelStyle={styles.text13Normal}
                  color={"black"}
                  onPress={handleSubmit}
                >
                  Publicar
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    marginTop: 25,
    position: "relative",
    padding: 20,
  },
  Modal: {
    backgroundColor: "#fff",
    marginTop: 200,
  },
  infoContainer: {
    width: "100%",
    minHeight: 400,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
  },
  vacanceTypeStyle: {
    width: "100%",
    padding: 15,
    justifyContent: "center",
    minHeight: 90,
    alignItems: "center",
  },
  vacanceTypeText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  detailsContainer: {
    width: "100%",
    marginTop: 40,
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
    fontSize: 14,
    color: "#393939",
  },
  hour: {
    fontFamily: "Poppins_500Medium",
    color: "#393939",
    fontSize: 13,
  },
  hourText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#a8a8a8",
    fontSize: 11,
    paddingRight: 20,
  },
  money: {
    fontFamily: "Poppins_500Medium",
    color: "#393939",
    fontSize: 13,
  },
  moneyText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#a8a8a8",
    fontSize: 11,
  },
  buttonsContainer: {
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    width: "45%",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text13Normal: {
    color: "#404040",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    fontWeight: "bold",
    paddingVertical: 8,
  },
  loading: {
    marginTop: 100,
    height: 50,
    alignSelf: "center",
  },
  buttonStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#404040",
    width: "45%",
  },
});

export default ModalPosting;
