import { createContext } from "react";
import type { Message } from "../../types/message";

type MessageContextType = {
  message: Message | null;
  setMessage: (message: Message) => void;
};

export const MessageContext = createContext<MessageContextType>({
  message: null,
  setMessage: () => {},
});
