import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { authScreens } from "../../constants/screenNames";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";

const ChatScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;
  const { bottom } = useSafeAreaInsets();

  const navigate = (name: keyof typeof authScreens) =>
    navigation.navigate(authScreens[name]);

  return (
    <ScreenLayout>
      <View style={[sxContainer, { paddingBottom: bottom }]}>
        <FlatList
          data={["", "", "", "", "", ""]}
          style={sxChatContainer}
          renderItem={({ item }) => <View />}
          keyExtractor={(_, i) => i.toString()}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <CustomInput
              label=""
              placeholder="Escribe algo..."
              value={""}
              onChangeText={(txt) => {}}
              autoCapitalize="none"
              marginVertical={10}
              inputContainerStyle={{ backgroundColor: "#f2f2f2" }}
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

const { sxContainer, sxChatContainer, sxBtnChat } = StyleSheet.create({
  sxContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  sxChatContainer: { flex: 1, backgroundColor: "#f2f2f2", borderRadius: 15 },
  sxBtnChat: { justifyContent: "center", paddingHorizontal: 10 },
});
