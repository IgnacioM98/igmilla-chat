import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { drawerScreens } from "../../constants/screenNames";
import { useManageChat } from "../../hooks/useManageChat";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";

const MyChatsScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof drawerScreens) =>
    navigation.navigate(drawerScreens[name]);

  const goChat = () => navigate("ChatScreen");

  const { selectChat } = useManageChat({ reditect: goChat });

  return (
    <ScreenLayout title="Chats Activos">
      <View style={sxContainer}>
        <FlatList
          data={["", "", "", "", "", ""]}
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
  return (
    <View style={sxItemContainer}>
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity style={sxItemIcon} onPress={select}>
        <Ionicons name="chatbubble" size={35} color={colors.PINK} />
      </TouchableOpacity>
    </View>
  );
};

const { sxContainer, sxItemContainer, sxItemIcon } = StyleSheet.create({
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
});
