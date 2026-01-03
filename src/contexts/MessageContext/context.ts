import { createContext } from "react";

type MessageContextType = {
  message: string | null;
  setMessage: (message: string) => void;
};

export const MessageContext = createContext<MessageContextType>({
  message: null,
  setMessage: () => {},
});
