import { useEffect, useState } from "react";
import { Session } from "../models/session";
import { UserDb } from "../models/usuario";
import { authSelector } from "../redux/features/auth/authSlice";
import {
  closeConversation,
  getAvailableSessions,
  getAvailableUsers,
  openConversation,
  openSessionConversation,
  setSessionSelected,
} from "../redux/features/chat/chatActions";
import { chatSelector } from "../redux/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";

export interface Props {
  reditect?: VoidFunction;
}

export const useManageChat = ({ reditect }: Props) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [cleanSearch, setClean] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { user } = useAppSelector(authSelector);
  const {
    usersList,
    usersState,
    sessionsList,
    sessionsState,
    selectedSession,
    activeChat,
  } = useAppSelector(chatSelector);

  const selectChat = (chat: Session) => {
    // console.log(chat);
    dispatch(setSessionSelected(chat));
  };
  const createChat = (usr: UserDb) => {
    if (!user) return;
    dispatch(openSessionConversation({ participante: usr, usuario: user }));
    // setRedirect(true);
  };
  const endChat = () =>
    selectedSession && dispatch(closeConversation(selectedSession));

  const getSessions = () => dispatch(getAvailableSessions());

  const getUsers = () => {
    setClean(false);
    dispatch(getAvailableUsers());
  };
  const searchUsers = () => {
    const text = searchText;
    setSearchText("");
    setClean(true);
    dispatch(getAvailableUsers(text));
  };

  useEffect(() => {
    if (selectedSession) {
      setShouldRedirect(true);
    }
  }, [selectedSession]);

  useEffect(() => {
    if (activeChat && reditect && shouldRedirect) {
      setShouldRedirect(true);
      console.log("waaa");

      reditect();
    }
  }, [activeChat, shouldRedirect]);

  return {
    getUsers,
    selectChat,
    searchText,
    setSearchText,
    usersList,
    searchUsers,
    cleanSearch,
    usersState,
    user,
    getSessions,
    sessionsState,
    createChat,
    sessionsList,
    endChat,
  };
};
