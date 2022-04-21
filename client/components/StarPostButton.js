import React, { useEffect, useState } from "react";
import styles from "../styles/Index.module.css";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";

function StarPostButton(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      setStarredPostId(
        JSON.parse(localStorage.getItem("UserData")).register
          ? JSON.parse(localStorage.getItem("UserData")).register.starredPosts
          : JSON.parse(localStorage.getItem("UserData")).login.starredPosts
      );
    }
  }, []);
  return <div>StarPostButton</div>;
}

export default StarPostButton;
