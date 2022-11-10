import React, { useRef, useState } from "react";
import { Text, View, Image, ScrollView, Animated } from "react-native";
import { useRecoilValue } from "recoil";
import UserData from "../../atom/UserData";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import { UserType } from "../../../enum";
import colors from "../../constants/colors";
import ModalPosting from "./components/ModalPosting";
import { Button, TextInput } from "react-native-paper";
import { parseUserType } from "../../utils/parseUserType";
import { userProfileImage } from "../../utils/userProfileImage";
import ProgressBarMultiStep from "react-native-progress-bar-multi-step";
import GooglePlacesInput from "../../components/GooglePlacesInput";
import {
  tabs,
  knowledgesList,
  styleWorkList,
  timesToWork,
  valuesList,
} from "./pickerValues";
import GetPremium from "../../components/GetPremium";

export default function Panel({ navigation }) {
  const userData = useRecoilValue(UserData);
  const [ShowComment, setShowModelComment] = useState(false);
  const [Locale, setLocale] = useState<string | null>(null);
  const [modelWork, setModelWork] = useState<string | null>(null);
  const [Hour, setHour] = useState<string | null>(null);
  const [Money, setMoney] = useState<string | null>(null);
  const [Level, setLevel] = useState<string | null>(null);
  const [vacanceType, setVacanceType] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [showGetPremium, setShowGetPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const googlePlacesRef = useRef(null);

  const notNullValues =
    vacanceType !== null &&
    Locale != null &&
    modelWork != null &&
    Hour != null &&
    Money != null &&
    Level != null &&
    description !== null;

  const review = async () => {
    if (userData?.usertype === UserType.FREE) {
      setShowGetPremium(true);
    } else {
      if (notNullValues) setShowModelComment(true);
      else alert("Complete os campos para ir para proxíma etapa");
    }
  };

  const AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = 130;
  const Header_Min_Height = 100;

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ["#fff", "#fff"],
    extrapolate: "clamp",
  });
  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  function onFinishAddVacance() {
    setShowModelComment(false);
    setLocale(null);
    setModelWork(null);
    setHour(null);
    setMoney(null);
    setLevel(null);
    setVacanceType(null);
    setLoading(false);
    alert("Vaga adicionada com sucesso!");
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.firstAnimatedView(
          animateHeaderHeight,
          animateHeaderBackgroundColor
        )}
      >
        <View style={styles.firstViewContainer}>
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#393939" }}>
              Olá, {userData?.name}
            </Text>
            <Text style={styles.userLocationText}>
              <Feather name="map-pin" size={12} color="#a8a8a8" />{" "}
              {userData?.location ?? ""}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#a8a8a8" }}>
              <Octicons name="tools" size={12} color="#a8a8a8" />{" "}
              {parseUserType(userData?.usertype)}
            </Text>
          </View>
          <View style={styles.imageUserContainer}>
            <Image
              style={styles.userImage}
              source={{ uri: userProfileImage(userData?.profileImage) }}
            />
          </View>
        </View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.contentScroll}
      >
        <View style={{ marginTop: 160 }} />
        <View style={{ justifyContent: "flex-start", flex: 1 }}>
          <Text style={{ color: "#404040", fontSize: 20, fontWeight: "600" }}>
            Adicionar um novo trabalho
          </Text>
          <View style={styles.progressiveContainer}>
            <ProgressBarMultiStep
              progressive={true}
              page={2}
              tabs={tabs}
              containerStyle={{ height: 100 }}
              stepNumberStyle={{ fontSize: 13 }}
              circleStyle={{ width: 30, height: 30 }}
              inProgressBackgroundColor={colors.primary}
            />
          </View>
          <Text style={styles.textProgressiveInfo}>
            Complete as informações sobre o serviço
          </Text>
          <View style={{ paddingVertical: 20 }}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label={"Tipo de vaga a ser disponibilizada"}
              value={vacanceType}
              onChangeText={(text) => setVacanceType(text)}
              activeOutlineColor={colors.black}
            />

            <View style={{ marginBottom: 20, width: "100%" }}>
              <GooglePlacesInput
                ref={googlePlacesRef}
                address={Locale}
                onSelectAddress={async ({ data, details }) => {
                  setLocale(details?.name);
                }}
              />
            </View>
            <View style={styles.viewPicker}>
              <RNPickerSelect
                placeholder={{
                  label: "Horário de trabalho...",
                  value: null,
                }}
                value={Hour}
                onValueChange={(text) => setHour(text)}
                items={timesToWork}
              />
            </View>
            <View style={styles.viewPicker}>
              <RNPickerSelect
                placeholder={{
                  label: "Nivel de conhecimento",
                  value: null,
                }}
                value={Level}
                onValueChange={(value) => setLevel(value)}
                items={knowledgesList}
              />
            </View>
            <View style={styles.viewPicker}>
              <RNPickerSelect
                placeholder={{
                  label: "Modelo de trabalho",
                  value: null,
                }}
                value={modelWork}
                onValueChange={(value) => setModelWork(value)}
                items={styleWorkList}
              />
            </View>
            <View style={styles.viewPicker}>
              <RNPickerSelect
                placeholder={{
                  label: "Salário por hora...",
                  value: null,
                }}
                value={Money}
                onValueChange={(value) => setMoney(value)}
                items={valuesList}
              />
            </View>

            <TextInput
              mode="outlined"
              style={{ marginVertical: 10, backgroundColor: "white" }}
              label={"Descrição do trabalho (Máx 800 caracteres)"}
              value={description}
              onChangeText={(text) => setDescription(text)}
              activeOutlineColor={colors.black}
              numberOfLines={8}
              multiline
            />
          </View>
          <Text style={styles.textProgressiveInfo}>Verifique seus dados</Text>
          <View style={{ paddingVertical: 12 }}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label={"Telefone para contato"}
              defaultValue={userData?.phone}
            />
            <TextInput
              mode="outlined"
              style={styles.input}
              label={"E-mail para contato"}
              defaultValue={userData?.email}
            />
          </View>

          <Button
            onPress={review}
            color={colors.primary}
            style={styles.button}
            labelStyle={styles.labelButtonStyle}
          >
            Criar Postagem
          </Button>
        </View>
      </ScrollView>
      <ModalPosting
        hour={Hour}
        locale={Locale}
        level={Level}
        money={Money}
        modelWork={modelWork}
        vacanceType={vacanceType}
        description={description}
        onFinish={onFinishAddVacance}
        onClose={() => setShowModelComment(false)}
        onOpen={() => setShowModelComment(true)}
        visible={ShowComment}
        loading={loading}
        setLoading={setLoading}
      />
      <GetPremium
        visible={showGetPremium}
        onClose={() => setShowGetPremium(false)}
      />
    </View>
  );
}
