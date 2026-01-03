import { useState } from "react";
import type { ReactNode } from "react";
import { MessageContext } from "./context";

export function MessageContextProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
