import * as React from "react";
import { Image } from "react-native";

export const HomeData = [
  {
    backgroundColor: "#5A71E8",
    image: (
      <Image
        style={{ width: 300, height: 280 }}
        source={require("./app/icons/icon5.png")}
      />
    ),
    title: "Bem vindo a Pratix",
    subtitle:
      "Seja bem vindo(a) ao Patrix, arraste para o lado para explorar mais do nosso app :).",
  },
  {
    image: (
      <Image
        style={{ width: 300, height: 280 }}
        source={require("./app/icons/icon3.png")}
      />
    ),
    backgroundColor: "#E88766",
    title: "How It Works?",
    subtitle:
      "Com nossa tecnologia você consegue criar com rapidez, publicações automatizadas e customizadas de grande alcance, prontas para o uso de acordo com suas necessidades.",
  },
  {
    backgroundColor: "#50B9E9",
    image: (
      <Image
        style={{ width: 300, height: 280 }}
        source={require("./app/icons/icon2.png")}
      />
    ),
    title: "Explore New Opportunities",
    subtitle:
      "Explore novos meios de ampliar sua empresa com a Pratix, oferecemos um enorme feed com muito conteudo.",
  },
  {
    image: (
      <Image
        style={{ width: 300, height: 280 }}
        source={require("./app/icons/icon4.png")}
      />
    ),
    backgroundColor: "#E8BD38",
    title: "All Done",
    subtitle: "Pronto para explorar nossa plataforma?",
  },
];
