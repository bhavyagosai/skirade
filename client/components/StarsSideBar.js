import React, { useEffect, useState } from "react";
import styles from "../styles/Index.module.css";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import Link from "next/link";
function StarsSideBar({ starredPostId, setStarredPostId }) {
  // Make API CALL and get the title of all the posts who id is in starred PostId and save it in an array below

  // CONTENT Returned from API ->
  // const starredPost = [
  //   { title: "Photos Sharing Website", id: 1 },
  //   { title: "Memories App", id: 2 },
  //   { title: "Movie CGI", id: 3 },
  // ];

  const [userStarredPosts, setUserStarredPosts] = useState(starredPostId);

  useEffect(() => {
    // CALL API and fetch the POSTS title and ID of starred posts.

    setStarredPostId(userStarredPosts);

    console.log(starredPostId);
    starredPostId = JSON.stringify(starredPostId);
    console.log(starredPostId);
  }, [setStarredPostId, userStarredPosts]);

  return (
    <div className={styles.starsContainer}>
      <div className={styles.starSidebarHeader}>
        <p style={{ fontSize: "2rem", fontWeight: "500" }}>Your Stars</p>
        <StarIconSolid style={{ height: "2.5rem", marginLeft: "10px" }} />
      </div>
      <hr
        style={{
          marginTop: "20px",
          width: "20vw",
          height: "1px",
          border: "none",
          color: "#e5e5e5",
          backgroundColor: "#e5e5e5",
          margin: "0px",
        }}
      />
      <div className={styles.starredPostList}>
        {userStarredPosts
          ? starredPostId.map((post) => (
              <Link href={`/post/${post.postID}`}>{post.postTitle}</Link>
            ))
          : ""}
      </div>
    </div>
  );
}

export default StarsSideBar;
