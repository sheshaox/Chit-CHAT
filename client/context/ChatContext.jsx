import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        const newMsg = data.newMessage;

        setMessages((prev) => [...prev, newMsg]);

        socket?.emit("sendMessage", {
          ...newMsg,
          receiverId: selectedUser._id,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleIncomingMessage = (newMessage) => {
    if (selectedUser && newMessage.senderId === selectedUser._id) {
      newMessage.seen = true;
      setMessages((prev) => [...prev, newMessage]);

      axios.put(`/api/messages/mark/${newMessage._id}`);
    } else {
      setUnseenMessages((prev) => ({
        ...prev,
        [newMessage.senderId]: prev[newMessage.senderId]
          ? prev[newMessage.senderId] + 1
          : 1,
      }));
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newmessage", handleIncomingMessage);

    return () => {
      socket.off("newmessage", handleIncomingMessage);
    };
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
