import React, { useEffect, useState } from "react";
import styles from "../styles/Index.module.css";
import {
  ChatAltIcon,
  StarIcon as StarIconSolid,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { gql, useMutation } from "@apollo/client";

const STAR_POST = gql`
  mutation starPost($username: String!, $postID: String!, $postTitle: String!) {
    starPost(username: $username, postID: $postID, postTitle: $postTitle) {
      postID
      postTitle
    }
  }
`;

const UNSTAR_POST = gql`
  mutation unstarPost(
    $username: String!
    $postID: String!
    $postTitle: String!
  ) {
    unstarPost(username: $username, postID: $postID, postTitle: $postTitle) {
      postID
      postTitle
    }
  }
`;

function PostCard({
  postId,
  profileImg,
  name,
  username,
  timestamp,
  title,
  desc,
  role,
  experience,
  skills,
  duration,
  tags,
  postAddress,
  starredPostId,
  setStarredPostId,
}) {
  const [userStarredPosts, setUserStarredPosts] = useState(starredPostId);

  const [starPost, {}] = useMutation(STAR_POST, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log(data);
      let userData = JSON.parse(localStorage.getItem("UserData"));
      userData.register
        ? userData.register.starredPosts.push(data.starPost)
        : userData.login.starredPosts.push(data.starPost);

      localStorage.setItem("UserData", JSON.stringify(userData));
    },
  });

  const [unstarPost, {}] = useMutation(UNSTAR_POST, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log(data);
      let userData = JSON.parse(localStorage.getItem("UserData"));
      let newUserData = userData.register
        ? userData.register.starredPosts.filter((starredPost) => {
            return starredPost.postID !== data.unstarPost.postID;
          })
        : userData.login.starredPosts.filter((starredPost) => {
            return starredPost.postID !== data.unstarPost.postID;
          });

      userData.register
        ? (userData.register.starredPosts = newUserData)
        : (userData.login.starredPosts = newUserData);

      localStorage.setItem("UserData", JSON.stringify(userData));
    },
  });

  const handleStar = (id, title) => {
    setUserStarredPosts((arr) => [...arr, { id, title }]);
    console.log("Starred Post", id);
    // MAKE API CALL FOR STARRING UPDATE IN DB AS WELL
    starPost({
      variables: {
        username: JSON.parse(localStorage.getItem("UserData"))
          ? JSON.parse(localStorage.getItem("UserData")).register
            ? JSON.parse(localStorage.getItem("UserData")).register.username
            : JSON.parse(localStorage.getItem("UserData")).login.username
          : "dummy",
        postID: id,
        postTitle: title,
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleUnstar = (id, title) => {
    setUserStarredPosts(userStarredPosts.filter((item) => item.postID !== id));
    console.log("UnStarred Post", id);
    // MAKE API CALL FOR STARRING UPDATE IN DB AS WELL
    unstarPost({
      variables: {
        username: JSON.parse(localStorage.getItem("UserData"))
          ? JSON.parse(localStorage.getItem("UserData")).register
            ? JSON.parse(localStorage.getItem("UserData")).register.username
            : JSON.parse(localStorage.getItem("UserData")).login.username
          : "dummy",
        postID: id,
        postTitle: title,
      },
    }).catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    setStarredPostId(userStarredPosts);
  }, [setStarredPostId, userStarredPosts]);

  return (
    <div className={styles.postContainer}>
      <div className={styles.postProfile}>
        <img src={profileImg} alt="" className={styles.roundedFull} />
        <div className={styles.postProfileName}>
          <p className="postAuthorName">{name}</p>
          <span className="postAuthorUsername">@{username}</span>
        </div>
        {userStarredPosts.includes(postId) ? (
          <StarIconSolid
            onClick={() => handleUnstar(postId, title)}
            style={{
              height: "1rem",
              position: "absolute",
              right: "0px",
              top: "10px",
            }}
          />
        ) : (
          <StarIconOutline
            onClick={() => handleStar(postId, title)}
            style={{
              height: "1rem",
              position: "absolute",
              right: "0px",
              top: "10px",
            }}
          />
        )}
      </div>
      <div className={styles.postDate}>
        <p>{timestamp}</p>
      </div>
      <p className={styles.postTitle}>{title}</p>
      <p className={styles.postDesc}>{desc}</p>
      <div className={styles.postAttribs}>
        <div className={styles.postAttribRow}>
          <div className={styles.postAttribItem}>
            <p>Role</p>
            <p>{role}</p>
          </div>
          <div className={styles.postAttribItem}>
            <p>Experience</p>
            <p>{experience}</p>
          </div>
        </div>
        <div className={styles.postAttribRow}>
          <div className={styles.postAttribItem}>
            <p>Skills</p>
            <p>{skills.join(", ")}</p>
          </div>
          <div className={styles.postAttribItem}>
            <p>Duration</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>
      <div className={styles.postFooter}>
        <div className={styles.postTags}>
          {tags.map((e) => (
            <p className={styles.postTag}>{e}</p>
          ))}
        </div>
        <div className={styles.postChatButton}>
          <ChatAltIcon style={{ height: "1rem" }} />
          <p>message</p>
        </div>
      </div>
      <div className={styles.postLocation}>
        <LocationMarkerIcon style={{ height: "1rem" }} />
        <p>{postAddress}</p>
      </div>
    </div>
  );
}

export default PostCard;
