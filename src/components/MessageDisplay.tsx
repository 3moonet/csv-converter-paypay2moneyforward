import { useMessage } from "../contexts/MessageContext/hooks";

export function MessageDisplay() {
  const { message } = useMessage();

  if (!message) {
    return null;
  }

  return (
    <div
      className={`p-3 rounded-md text-sm font-medium text-center ${
        message.includes("✓")
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-blue-100 text-blue-800 border border-blue-300"
      }`}
    >
      {message}
    </div>
  );
}
