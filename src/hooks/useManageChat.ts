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
  sendChatMessage,
  setChatActive,
  setSessionSelected,
} from "../redux/features/chat/chatActions";
import { chatSelector } from "../redux/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";

export interface Props {
  reditect?: VoidFunction;
  isChat?: boolean;
}

export const useManageChat = ({ reditect, isChat }: Props) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [cleanSearch, setClean] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [listenSession, setListenSession] = useState(false);
  const [messageText, setMessageText] = useState("");

  const { user } = useAppSelector(authSelector);
  const {
    usersList,
    usersState,
    sessionsList,
    sessionsState,
    selectedSession,
    activeChat,
    chatsList,
  } = useAppSelector(chatSelector);

  const selectChat = (chat: Session) => {
    setListenSession(true);
    dispatch(setSessionSelected(chat));
  };
  const createChat = (usr: UserDb) => {
    if (!user) return;
    setListenSession(true);
    dispatch(openSessionConversation({ participante: usr, usuario: user }));
  };
  const endChat = () => {
    if (selectedSession && user)
      dispatch(
        closeConversation({ activeSession: selectedSession, user: user._ref })
      );
  };

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

  const sendMessage = () => {
    if (activeChat && user)
      dispatch(
        sendChatMessage({
          message: messageText,
          activeChat: activeChat._ref,
          userId: user.id,
        })
      );
  };

  useEffect(() => {
    if (selectedSession && user && !activeChat && listenSession) {
      dispatch(setChatActive(null));
      setListenSession(false);
      setShouldRedirect(true);
      // should open session messages
      console.log("dispatch open conversation");
      dispatch(openConversation({ session: selectedSession, user: user._ref }));
    }
  }, [selectedSession]);

  useEffect(() => {
    if (activeChat && reditect && shouldRedirect) {
      setShouldRedirect(false);
      console.log("redirect to chat");
      reditect();
    }
  }, [activeChat, shouldRedirect]);

  useEffect(() => {
    if (activeChat && isChat) {
      setMessageText("");
    }
  }, [isChat, activeChat]);

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
    chatsList,
    messageText,
    setMessageText,
    sendMessage,
    activeChat,
  };
};
