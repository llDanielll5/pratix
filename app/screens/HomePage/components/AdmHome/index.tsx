import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { Posts, User } from "../../../../../types";
import UserData from "../../../../atom/UserData";
import Loading from "../../../../components/Loading";
import {
  queryHomePostsLength,
  queryHomeUsersLength,
  queryRecentPosts,
  queryRecentUsers,
} from "../../../../firebase/functions";
import { parseIsoDateToBrasil } from "../../../../utils/parseIsoDate";
import ProfileCard from "../../../Profile/components/ProfileCard";
import styles from "./styles";
import WelcomeAdm from "./welcomeAdm";

const AdmHome: React.FC = () => {
  const userData = useRecoilValue(UserData);
  const [loading, setLoading] = useState(true);
  const [postsLength, setPostsLength] = useState(0);
  const [usersLength, setUsersLength] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  async function GetPostsLength() {
    setLoading(true);
    const posts = await queryHomePostsLength();
    setPostsLength(posts);
    setLoading(false);
  }
  async function GetAllRecentPosts() {
    setLoading(true);
    const posts = await queryRecentPosts();
    setRecentPosts(posts);
    setLoading(false);
  }
  async function GetUsersLength() {
    setLoading(true);
    const users = await queryHomeUsersLength();
    setUsersLength(users);
    setLoading(false);
  }
  async function GetAllRecentUsers() {
    setLoading(true);
    const users = await queryRecentUsers();
    setRecentUsers(users);
    setLoading(false);
  }

  useEffect(() => {
    GetPostsLength();
    GetAllRecentPosts();
    GetUsersLength();
    GetAllRecentUsers();
  }, []);

  const NotHaveWorks = () => (
    <View style={{ marginTop: 50 }}>
      <Image
        source={require("../../../../icons/icon3.png")}
        style={styles.notHaveWorksImage}
      />
      <Text style={styles.notFoundText}>
        Infelizmente não encontramos registros de novos trabalhos!
      </Text>
    </View>
  );

  const RecentPosts = ({ item, index }: { item: Posts; index: number }) => (
    <View style={styles.viewCards} key={index}>
      <Text style={styles.recentPostsTitle}>{item?.title}</Text>
      <Button
        mode="contained"
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
      >
        Verificar Vaga
      </Button>
    </View>
  );
  const RecentUsers = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.viewCards} key={index}>
      <Text style={styles.recentPostsTitle}>{item?.name}</Text>
      <Button
        mode="contained"
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
      >
        Verificar Usuário
      </Button>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: "2.5%" }}>
        <WelcomeAdm userData={userData} />

        {loading && (
          <Loading isLoading size={50} style={{ marginTop: 50, height: 50 }} />
        )}
        {!loading && (
          <View>
            {/* <View style={styles.viewContainer}>
              <Text style={styles.worksInWeek}>
                {postsLength} Trabalhos Cadastrados na Semana!
              </Text>
              {postsLength === 0 && <NotHaveWorks />}
              {postsLength > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginRight: -12, marginLeft: -16 }}
                  contentContainerStyle={{ paddingLeft: 16 }}
                >
                  {recentPosts?.map((item, index) => (
                    <RecentPosts item={item} index={index} />
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={[styles.viewContainer, { marginBottom: 20 }]}>
              <Text style={styles.worksInWeek}>
                {usersLength} Usuários cadastrados na Semana!
              </Text>
              {usersLength === 0 && <Text>Não há usuários cadastrados</Text>}
              {usersLength > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginRight: -12, marginLeft: -16 }}
                  contentContainerStyle={{ paddingLeft: 16 }}
                >
                  {recentUsers?.map((item, index) => (
                    <RecentUsers item={item} index={index} />
                  ))}
                </ScrollView>
              )}
            </View> */}

            <ProfileCard
              title="Cadastros Semanais"
              firstSubtitle="Trabalhos Cadastrados na Semana"
              secondSubtitle="Usuários Cadastrados na Semana"
              thirdSubtitle="Usuários Premium semanais"
              firstValue={postsLength.toString()}
              secondValue={usersLength.toString()}
              thirdValue="0"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AdmHome;
