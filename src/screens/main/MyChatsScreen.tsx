import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { drawerScreens } from "../../constants/screenNames";
import { useManageChat } from "../../hooks/useManageChat";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";
import { fontStyles } from "../../theme/fonts";
import { formatDateTXT } from "../../utils/utils";

const MyChatsScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof drawerScreens) =>
    navigation.navigate(drawerScreens[name]);

  const goChat = () => navigate("ChatScreen");
  const goSearch = () => navigate("ListNavigator");

  const { selectChat, chats } = useManageChat({ reditect: goChat });

  return (
    <ScreenLayout title="Chats Activos">
      <View style={sxContainer}>
        {chats.length === 0 && <EmptyCard onPress={goSearch} />}
        <FlatList
          data={chats}
          renderItem={({ item }) => <ListItem selectChat={selectChat} />}
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </ScreenLayout>
  );
};

export default MyChatsScreen;

interface ItemProps {
  selectChat: (chat: any) => void;
}

const ListItem = (props: ItemProps) => {
  const { selectChat, ...others } = props;
  const select = () => selectChat({});
  const date = new Date();
  return (
    <View style={sxItemContainer}>
      <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
        <Text style={sxItemTitle}>No tienes Chats Activos</Text>
        <Text style={sxItemSubtitle}>Última vez: {formatDateTXT(date)}</Text>
      </View>
      <TouchableOpacity style={sxItemIcon} onPress={select}>
        <Ionicons name="chatbubble" size={35} color={colors.PINK} />
      </TouchableOpacity>
    </View>
  );
};
interface EmptyCardProps {
  onPress: VoidFunction;
}

const EmptyCard = (props: EmptyCardProps) => {
  const { onPress, ...others } = props;
  return (
    <View style={sxEmptyCard}>
      <Text
        style={{ ...fontStyles.poppinsSemiBold, color: colors.BLACK_BLACK }}
      >
        No tienes Chats Activos
      </Text>
      <TouchableOpacity style={sxEmptyCardBtn} onPress={onPress}>
        <Text style={{ ...fontStyles.poppinsLight, color: colors.BLACK_BLACK }}>
          Buscar Personas
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const {
  sxContainer,
  sxItemContainer,
  sxItemIcon,
  sxEmptyCard,
  sxEmptyCardBtn,
  sxItemTitle,
  sxItemSubtitle,
} = StyleSheet.create({
  sxContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  sxItemContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
  },
  sxItemIcon: {
    justifyContent: "center",
    width: 50,
    alignItems: "center",
  },
  sxEmptyCard: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sxEmptyCardBtn: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
  },
  sxItemTitle: { ...fontStyles.poppinsRegular, color: colors.BLACK_BLACK },
  sxItemSubtitle: {
    ...fontStyles.poppinsLight,
    color: colors.BLACK_BLACK,
    fontSize: 12,
  },
});
