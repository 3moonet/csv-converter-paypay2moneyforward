export type MessageType = "success" | "info" | "error";

export interface Message {
  content: string;
  type: MessageType;
}
