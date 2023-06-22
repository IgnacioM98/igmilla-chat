import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authScreens } from "../../constants/screenNames";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";
import { fontStyles } from "../../theme/fonts";
import { formatDate } from "../../utils/utils";
import { useFocusEffect } from "@react-navigation/native";
import { useManageChat } from "../../hooks/useManageChat";

const ChatScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;
  const { bottom } = useSafeAreaInsets();

  const navigate = (name: keyof typeof authScreens) =>
    navigation.navigate(authScreens[name]);
  const [txt, setTxt] = useState("");

  const { endChat } = useManageChat({});

  useFocusEffect(
    useCallback(() => {
      return () => endChat();
    }, [])
  );

  return (
    <ScreenLayout>
      <View style={[sxContainer, { paddingBottom: bottom }]}>
        <FlatList
          data={["", "", "", "", "", ""]}
          style={sxChatContainer}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(_, i) => i.toString()}
          inverted
          showsVerticalScrollIndicator={false}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={sxTextInput}
              value={txt}
              blurOnSubmit
              onChangeText={setTxt}
              autoComplete="off"
              multiline
            />
          </View>
          <TouchableOpacity style={sxBtnChat}>
            <MaterialCommunityIcons
              name="send-circle"
              size={40}
              color={colors.BLACK_PURPLE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default ChatScreen;

interface ItemProps {
  item: any;
}

const ListItem = (props: ItemProps) => {
  const { item, ...others } = props;
  const date = new Date();
  const someArray = [
    { Title: "", origin: "a", message: "asldkaskldjaslkdjaslkdjalskjd" },
    {
      Title: "",
      origin: "a",
      message: "asldkaskldjaslkdjaslkdjalskjdasldkaskldjaslkdjaslkdjalskjd",
    },
    {
      Title: "",
      origin: "b",
      message:
        "asldkaskldjasasldkaskldjaslkdjaslkdjalskjdasldkaskldjaslkdjaslkdjalskjdasldkaskldjaslkdjaslkdjalskjdlkdjaslkdjalskjd",
    },
    {
      Title: "",
      origin: "a",
      message:
        "asldkaskldjaslkdjaslkdjalskjdasldkaskldjaslkdjaslkdjalskjdasldkaskldjaslkdjaslkdjalskjdasldkaskldjaslkdjaslkdjalskjd",
    },
    { Title: "", origin: "a", message: "asldkaskldjaslkdjaslkdjalskjd" },
    { Title: "", origin: "a", message: "asldkaskldjaslkdj" },
  ];
  return (
    <View style={sxChatSession}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={sxSessionDateContainer}>
          <View style={sxSessionDateLine} />
          <Text style={sxSessionDateItem}>{formatDate(date)}</Text>
          <View style={sxSessionDateLine} />
        </View>
        {someArray.map((item, i) => (
          <View key={i} style={sxChatBubbleContainer(item.origin === "b")}>
            <View style={item.origin === "b" ? sxBubbleB : sxBubbleA}>
              <Text style={{ ...fontStyles.poppinsRegular, color: "#fff" }}>
                {item.message}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const {
  sxContainer,
  sxChatContainer,
  sxBtnChat,
  sxTextInput,
  sxChatSession,
  sxSessionDateContainer,
  sxSessionDateItem,
  sxSessionDateLine,
  sxBubbleB,
  sxBubbleA,
} = StyleSheet.create({
  sxContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  sxChatContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
  },
  sxBtnChat: { justifyContent: "center", paddingHorizontal: 10 },
  sxTextInput: {
    backgroundColor: "#f2f2f2",
    minHeight: 50,
    maxHeight: 200,
    marginVertical: 5,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "center",
    paddingTop: 15,
    color: colors.BLACK_BLACK,
    fontFamily: fontStyles.poppinsMedium.fontFamily,
  },
  sxChatSession: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
  },
  sxSessionDateContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  sxSessionDateItem: {
    marginHorizontal: 20,
    ...fontStyles.poppinsMedium,
    fontSize: 10,
    color: "lightgray",
  },
  sxSessionDateLine: { flex: 1, height: 0.5, backgroundColor: "lightgray" },
  sxBubbleA: {
    backgroundColor: colors.PINK,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: "20%",
  },
  sxBubbleB: {
    backgroundColor: colors.PURPLE,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: "20%",
  },
});

const { sxChatBubbleContainer } = {
  sxChatBubbleContainer: (owner: boolean): ViewStyle => ({
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: owner ? "flex-end" : "flex-start",
  }),
};
