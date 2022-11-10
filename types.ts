import { UserType } from "./enum";

export interface Location {
  cep: string;
  city: string;
  complement: string;
  district: string;
  latitude?: number;
  longitude?: number;
  publicPlace: string;
  number?: string;
  uf: string;
}

export interface Posts {
  id: any;
  title: string;
  hours: string;
  knowledge: string;
  workModel: string;
  hourlyWage: string;
  description: string;
  createdAt: any;
  location: string;
  employer: {
    username: string;
    name: string;
    phone: string;
    email: string;
    profileImage: string;
  };
}

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  usertype: UserType;
  location: string;
  phone: string;
  profileImage: string;
  createdAt: any;
  updatedAt: any;
  posts: Posts[];
}
