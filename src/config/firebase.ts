import Firestore from "@react-native-firebase/firestore";
import Auth from "@react-native-firebase/auth";

const db = Firestore();
const auth = Auth();

export { db, auth };
