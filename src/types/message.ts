export type MessageType = "success" | "info";

export interface Message {
  content: string;
  type: MessageType;
}
