import autosize from "autosize";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChatRecieveElement from "./ChatRecieveElement";
import ChatSendElement from "./ChatSendElement";
import styles from "./styles/ChatElement.module.css";

function ChatElement() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(["lmao", "ok"]);

  const [firefox, setFirefox] = useState(false);

  const [minimized, setMinimized] = useState(false);

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    autosize(document.querySelector("textarea"));
    setFirefox(typeof InstallTrigger !== "undefined");
    scrollToBottom();
  }, [message]);

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // fireEvent(e);
      } else {
        e.preventDefault();
        // console.log(e);
        sendText();
        // scrollToBottom();
      }
    }
  };

  const sendText = () => {
    if (message !== "") messages.push(message);
    setMessage("");
    // autosize.update(document.querySelector("textarea"));
    // setMessage(message);
    // console.log(messages);
  };

  // const isChrome =
  //   typeof window !== "undefined"
  //     ? !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  //     : "lmao";

  return (
    <div
      className={
        firefox
          ? minimized
            ? styles["chatContainer"] +
              " " +
              styles["editChatContainer"] +
              " " +
              styles["transparent"]
            : styles["chatContainer"] + " " + styles["transparent"]
          : minimized
          ? styles["chatContainer"] + " " + styles["editChatContainer"]
          : styles["chatContainer"]
      }
    >
      <div
        className={minimized ? styles["hideContainer"] : styles["chatTopBar"]}
      >
        <div className={styles.chatClose} />
        <div
          className={styles.chatMinimize}
          onClick={() => {
            setMinimized(!minimized);
          }}
        />
      </div>
      <div
        className={
          minimized
            ? styles["topContainer"] +
              " " +
              styles["changeTopContainerSize"] +
              " " +
              styles["bottomLine"]
            : styles["topContainer"] + " " + styles["bottomLine"]
        }
        onClick={() => {
          minimized ? setMinimized(!minimized) : {};
        }}
      >
        <Image
          className={styles.chatImage}
          src="/bhavya.jpg"
          alt="Profile"
          width={minimized ? 30 : 50}
          height={minimized ? 30 : 50}
        />
        <div className={styles.chatUser}>
          <p
            className={
              minimized
                ? styles["chatUserName"] + " " + styles["changeFont"]
                : styles["chatUserName"]
            }
          >
            Bhavya Gosai
          </p>
          <p
            className={
              minimized ? styles["dropContainer"] : styles["chatUserID"]
            }
          >
            @bbsempai
          </p>
        </div>
      </div>
      <div
        className={
          minimized ? styles["hideContainer"] : styles["middleContainer"]
        }
      >
        <ChatSendElement text={"Hey Jaipal!"} />
        <ChatRecieveElement text={"Hey Bhavya! How you doing my G?"} />
        <ChatSendElement
          text={
            "I saw you are looking for a front end developer. I am interested to work on your project, is there still any vacancy available fam?"
          }
        />
        <ChatRecieveElement
          text={
            "Ayoo we still have a place left. We will be glad to have you on our team!"
          }
        />
        <ChatRecieveElement text={"Onegaishimasu!"} continuous />
        <ChatSendElement text={"Awesome! Looking forward to it!"} />
        <ChatSendElement
          text={
            "I saw you are looking for a front end developer. I am interested to work on your project, is there still any vacancy available fam?"
          }
          continuous
        />
        <ChatRecieveElement
          text={
            "Ayoo we still have a place left. We will be glad to have you on our team!"
          }
        />
        <ChatSendElement text={"Awesome! Looking forward to it!"} />
        {messages.map((message) => {
          return (
            <ChatSendElement
              text={message}
              continuous
              innerRef={endOfMessagesRef}
            />
          );
        })}
        <EndofChat innerRef={endOfMessagesRef} />
      </div>
      <div
        className={
          minimized ? styles["hideContainer"] : styles["bottomContainer"]
        }
      >
        <textarea
          rows={1}
          className={styles.chatInput}
          placeholder="Send a message"
          onKeyPress={handleEnterPress}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Image
          className={styles.chatSendButton}
          src="/send-arrow.svg"
          alt="send-arrow"
          onClick={sendText}
          width={38}
          height={38}
        />
      </div>
    </div>
  );
}

const EndofChat = ({ innerRef }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "1em 0 0 0",
        color: "black",
      }}
      ref={innerRef}
    />
  );
};

export default ChatElement;
