import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { drawerScreens } from "../../constants/screenNames";
import { useManageChat } from "../../hooks/useManageChat";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";
import { fontStyles } from "../../theme/fonts";
import { formatDateTXT } from "../../utils/utils";
import { Session } from "../../models/session";
import { UserDb } from "../../models/usuario";
import { useFocusEffect } from "@react-navigation/native";

const MyChatsScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof drawerScreens) =>
    navigation.navigate(drawerScreens[name]);

  const goChat = () => navigate("ChatScreen");
  const goSearch = () => navigate("ListNavigator");

  const { selectChat, user, getSessions, sessionsState, sessionsList } =
    useManageChat({
      reditect: goChat,
    });

  useFocusEffect(
    useCallback(() => {
      getSessions();
    }, [])
  );

  return (
    <ScreenLayout title="Chats Activos">
      <View style={sxContainer}>
        {sessionsList.length === 0 && <EmptyCard onPress={goSearch} />}
        <FlatList
          data={sessionsList}
          renderItem={({ item }) => (
            <ListItem item={item} selectChat={selectChat} user={user!} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={sessionsState === "submit"}
              onRefresh={getSessions}
            />
          }
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </ScreenLayout>
  );
};

export default MyChatsScreen;

interface ItemProps {
  item: Session;
  selectChat: (chat: Session) => void;
  user: UserDb;
}

const ListItem = (props: ItemProps) => {
  const { selectChat, item, user, ...others } = props;
  const select = () => selectChat(item);
  const participantes = item.participantes;

  return (
    <View style={sxItemContainer}>
      <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
        <Text style={sxItemTitle}>
          {String(participantes.find((p) => p !== user)?.nombre || "")}
        </Text>
        <Text style={sxItemSubtitle}>
          Última vez:{" "}
          {item.ultimaConversacion
            ? formatDateTXT(item.ultimaConversacion.toDate())
            : " - "}
        </Text>
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
