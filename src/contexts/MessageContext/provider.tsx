import { useState } from "react";
import type { ReactNode } from "react";
import type { Message } from "../../types/message";
import { MessageContext } from "./context";

export function MessageContextProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
