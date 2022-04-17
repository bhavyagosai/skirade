import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import AppContext from "../components/AppContext";

export default function Navbar() {
  const { user } = React.useContext(AppContext);

  useEffect(() => {
    if (user.loggedIn === false) {
      if (localStorage.getItem("UserData")) localStorage.removeItem("UserData");
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
                <Link href="/signup">signup</Link>
              </li>
              <li>
                <Link href="/login">login</Link>
              </li>
            </>
          ) : (
            <li>
              <Image
                style={{
                  borderRadius: "50%",
                }}
                // src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                // src="/bhavya.jpg"
                // src={profileImage}
                src="https://avatars.dicebear.com/api/micah/bbsempai.svg"
                alt="Profile"
                width={50}
                height={50}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
