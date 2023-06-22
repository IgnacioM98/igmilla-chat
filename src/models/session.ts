import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserDb } from "./usuario";

export type Session = {
  id: string;
  _ref: FirebaseFirestoreTypes.DocumentReference;
  fechaCreacion: FirebaseFirestoreTypes.Timestamp;
  participantes: UserDb[];
  conversacionActiva?: FirebaseFirestoreTypes.DocumentReference;
  usuariosActivos: UserDb[];
  ultimaConversacion?: FirebaseFirestoreTypes.Timestamp;
};
