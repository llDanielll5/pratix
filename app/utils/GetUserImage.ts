import app from "../firebase/base";
import { getFirestore } from "firebase/firestore";
import { updateUserInfos } from "../firebase/functions";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app, "gs://pratix-4be53.appspot.com");
const db = getFirestore(app);

const GetUserImage = async (
  img: any,
  userData: any,
  setLoading: any,
  setUserData: any
) => {
  if (img) {
    setLoading(true);
    const filename = img.uri.replace(/^.*[\\\/]/, "");
    const fileRef = ref(storage, `images/${filename}`);

    const response = await fetch(img.uri);
    const blob = await response.blob();

    uploadBytes(fileRef, blob).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(snapshot.ref);
      try {
        await updateUserInfos(
          { profileImage: downloadUrl },
          userData?.username
        );
        setLoading(false);
        setUserData((prevState: any) => ({
          ...prevState,
          profileImage: downloadUrl,
        }));
      } catch (error) {
        setLoading(false);
        console.log(error?.message);
      }
    });
  }
};

export default GetUserImage;
