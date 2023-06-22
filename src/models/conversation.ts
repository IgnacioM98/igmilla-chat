import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Conversation = {
  id: string;
  _ref: FirebaseFirestoreTypes.DocumentReference;
  fechaCreacion: FirebaseFirestoreTypes.Timestamp;
  mensajes: Mensaje[];
};

export type Mensaje = {
  idUsuario: string;
  texto: string;
};
