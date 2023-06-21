import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type UserDb = {
  id: string;
  _ref: FirebaseFirestoreTypes.DocumentReference;
  fechaCreacion: FirebaseFirestoreTypes.Timestamp;
  _nombre: string;
  nombre: string;
  email: string;
};
