import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SimpleButton from "../../components/SimpleButton";
import { drawerScreens } from "../../constants/screenNames";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";
import { fontStyles } from "../../theme/fonts";

const HomeScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof drawerScreens) =>
    navigation.navigate(drawerScreens[name]);

  const goChat = () => navigate("ChatScreen");

  const [txt, setTxt] = useState("");

  return (
    <ScreenLayout title="Chatea Ahora!">
      <View style={sxContainer}>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={sxTextInput}
            value={txt}
            blurOnSubmit
            onChangeText={setTxt}
            autoComplete="off"
            autoFocus={false}
            selectTextOnFocus
            returnKeyType="done"
          />
          <TouchableOpacity style={sxIconSearch}>
            <FontAwesome name="search" size={24} color={colors.BLACK_PURPLE} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={["", "", "", "", ""]}
          renderItem={({ item }) => <ListItem selectChat={goChat} />}
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

interface ItemProps {
  selectChat: (chat: any) => void;
}

const ListItem = (props: ItemProps) => {
  const { selectChat, ...others } = props;
  const select = () => selectChat({});
  return (
    <View style={sxItemContainer}>
      <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
        <Text style={sxItemTitle}>Peter Parker</Text>
      </View>
      <SimpleButton
        onPress={select}
        containerStyles={{ width: 50, height: "100%", marginTop: 0 }}
      />
    </View>
  );
};

const { sxContainer, sxItemContainer, sxItemTitle, sxTextInput, sxIconSearch } =
  StyleSheet.create({
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
    sxItemTitle: { ...fontStyles.poppinsRegular, color: colors.BLACK_BLACK },
    sxTextInput: {
      backgroundColor: "#f2f2f2",
      borderRadius: 15,
      padding: 15,
      color: colors.BLACK_BLACK,
      fontFamily: fontStyles.poppinsMedium.fontFamily,
      paddingRight: 45,
    },
    sxIconSearch: {
      position: "absolute",
      height: "100%",
      justifyContent: "center",
      width: 40,
      alignItems: "center",
      alignSelf: "flex-end",
    },
  });
