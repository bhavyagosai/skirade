import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const CHECK_AUTH_STATE = gql`
  {
    persistentLogin
  }
`;

export default function Navbar() {
  const [authToken, setAuthToken] = useState("");
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserData"))
      setAuthToken(
        JSON.parse(localStorage.getItem("UserData")).register
          ? JSON.parse(localStorage.getItem("UserData")).register.token
          : JSON.parse(localStorage.getItem("UserData")).login.token
      );
  }, []);

  const { loading, error, data } = useQuery(CHECK_AUTH_STATE, {
    skip: authToken ? false : true,
    context: {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (authState) => {
      // console.log(authState.persistentLogin);
      setAuthState(authState.persistentLogin);
    },
  });
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
          {authState === false ? (
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
