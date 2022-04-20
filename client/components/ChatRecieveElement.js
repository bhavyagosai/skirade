import styles from "./styles/ChatElement.module.css";

export default function ChatRecieveElement({ text, continuous }) {
  return (
    <div
      className={
        continuous
          ? styles["chatRecievedBubble"] + " " + styles["chatContinuous"]
          : styles["chatRecievedBubble"]
      }
    >
      {text}
    </div>
  );
}
