import styles from "./styles/ChatElement.module.css";

export default function ChatSendElement({ text, continuous, innerRef }) {
  return (
    <div
      ref={innerRef}
      className={
        continuous
          ? styles["chatSentBubble"] + " " + styles["chatContinuous"]
          : styles["chatSentBubble"]
      }
    >
      {text}
    </div>
  );
}

ChatSendElement.defaultProps = {
  text: "",
  continuous: false,
};
