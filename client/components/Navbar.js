import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import AppContext from "./AppContext";

export default function Navbar() {
  const router = useRouter();

  const { user, dispatch } = React.useContext(AppContext);

  const [profileImage, setProfileImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const logoutHandler = () => {
    dispatch({
      type: "AUTH_STATE_CHANGE",
      loggedIn: false,
    });
    router.push("/");
  };

  useEffect(() => {
    if (user.loggedIn === false) {
      if (localStorage.getItem("UserData")) {
        console.log("Token Expired! Clearing user cache.");
        localStorage.removeItem("UserData");
      }
    } else {
      // console.log("OLD: " + profileImage);
      if (localStorage.getItem("UserData")) {
        setProfileImage(
          JSON.parse(localStorage.getItem("UserData")).register
            ? JSON.parse(localStorage.getItem("UserData")).register.profileImage
            : JSON.parse(localStorage.getItem("UserData")).login.profileImage
        );
      }
      // console.log("NEW: " + profileImage);
    }
    console.log("AUTH STATE: " + user.loggedIn);
  }, [user.loggedIn]);

  return (
    <header>
      <nav>
        <Link href="/">
          <a>
            <Image src="/logo.svg" alt="Skirade Logo" width={200} height={24} />
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <Link href="/explore">explore</Link>
          </li>
        </ul>
        <ul>
          {user.loggedIn === false ? (
            <>
              <li>
                <Link href="/signup">
                  <a>signup</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>login</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={logoutHandler}>logout</li>
              <li>
                <Image
                  style={{
                    borderRadius: "50%",
                  }}
                  src={profileImage}
                  alt="Profile"
                  width={50}
                  height={50}
                  onClick={() => {
                    router.push(
                      `/user/${
                        JSON.parse(localStorage.getItem("UserData")).register
                          ? JSON.parse(localStorage.getItem("UserData"))
                              .register.username
                          : JSON.parse(localStorage.getItem("UserData")).login
                              .username
                      }`
                    );
                  }}
                  title={
                    JSON.parse(localStorage.getItem("UserData")).register
                      ? JSON.parse(localStorage.getItem("UserData")).register
                          .username
                      : JSON.parse(localStorage.getItem("UserData")).login
                          .username
                  }
                />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
