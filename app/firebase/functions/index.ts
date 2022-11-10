import app from "../base";
import {
  addDoc,
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  WhereFilterOp,
  getDocs,
  limit,
  orderBy,
  Timestamp,
  startAt,
  startAfter,
  OrderByDirection,
} from "firebase/firestore";

import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { User, Posts } from "../../../types";

const db = getFirestore(app);
const auth = getAuth(app);

export const addNewUser = async (data: User, username: string) => {
  await setDoc(doc(db, "users", username), data);
};

export const updateUserInfos = async (data: any, username: string) => {
  await updateDoc(doc(db, "users", username), data);
};

export const addNewPost = async (data: Posts) => {
  try {
    const result = await addDoc(collection(db, "posts"), data);
    return result.id;
  } catch (error: any) {
    console.log(error);
  }
};

export const updatePost = async (data: Posts, id: string) => {
  await updateDoc(doc(db, "posts", id), data);
};

/*ARRAY UNION AND ARRAY REMOVE TO ADD OR REMOVE ARRAY INDEXES */

export const userExists = async (username: string) => {
  const docRef = doc(db, "users", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

export const getUserInfos = async (username: string) => {
  const docRef = doc(db, "users", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getPostInfos = async (postID: string) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getLoginGoogleInfos = async (docID: string) => {
  const docRef = collection(db, "users");
  const q = query(docRef, where("id", "==", docID));
  const docSnap = await getDocs(q);

  if (docSnap.size > 0) {
    return docSnap.docs[0].data();
  } else {
    return null;
  }
};

// RECEBER, ORDENAR, LIMITAR E FILTRAR DADOS DO BANCO DE DADOS
// Path: app\firebase\functions\index.ts
// Compare this snippet from types.ts:

export const queryHomePostsLength = async () => {
  const dateToQuery = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 7
  );
  const timesTampQuery = Timestamp.fromDate(dateToQuery);
  const q = query(
    collection(db, "posts"),
    where("createdAt", ">=", timesTampQuery)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

export const queryHomeUsersLength = async () => {
  const dateToQuery = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 7
  );
  const timesTampQuery = Timestamp.fromDate(dateToQuery);
  const q = query(
    collection(db, "users"),
    where("createdAt", ">=", timesTampQuery)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

export const queryRecentPosts = async () => {
  const dateToQuery = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 7
  );
  const timesTampQuery = Timestamp.fromDate(dateToQuery);
  const q = query(
    collection(db, "posts"),
    where("createdAt", ">=", timesTampQuery)
  );
  const querySnapshot = await getDocs(q);
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const queryRecentUsers = async () => {
  const dateToQuery = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 7
  );
  const timesTampQuery = Timestamp.fromDate(dateToQuery);
  const q = query(
    collection(db, "users"),
    where("createdAt", ">=", timesTampQuery)
  );
  const querySnapshot = await getDocs(q);
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const queryPostsDocument = async (
  doc: string,
  operator: WhereFilterOp,
  filter: string
) => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where(doc, operator, filter), limit(20));
  const querySnapshot = await getDocs(q);
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};
