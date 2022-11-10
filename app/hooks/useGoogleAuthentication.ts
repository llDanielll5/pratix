import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import app from "../firebase/base";

export default function useGoogleAuthentication() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "959406397450-nrr5ne7pjua2t480th9d1fklktl3k5a3.apps.googleusercontent.com",
    clientSecret: "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",
  });

  const GoogleLoginFirebase = async () => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth(app);
      const credential = GoogleAuthProvider.credential(id_token);
      const result = await signInWithCredential(auth, credential);
      console.log("result", result);
    }
  };

  React.useEffect(() => {
    GoogleLoginFirebase();
  }, [response]);

  return promptAsync;
}
