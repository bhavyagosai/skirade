import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Post.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  ChatAltIcon,
  StarIcon as StarIconSolid,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";

// get post id from the params
function postPage() {
  const router = useRouter();
  const {
    query: { postid },
  } = router;

  //   implement the star and unstar post functinality just like in explore page
  const [starredPostId, setStarredPostId] = useState([1, 3]);

  const handleStar = (id) => {
    setUserStarredPosts((arr) => [...arr, id]);
    console.log("Starred Post", id);
    // MAKE API CALL FOR STARRING UPDATE IN DB AS WELL
  };

  const handleUnstar = (id) => {
    setUserStarredPosts(userStarredPosts.filter((item) => item !== id));
    console.log("UnStarred Post", id);
    // MAKE API CALL FOR STARRING UPDATE IN DB AS WELL
  };
  useEffect(() => {
    setStarredPostId(starredPostId);
  }, [setStarredPostId, starredPostId]);

  const post = {
    id: 1,
    authorImg: "https://links.papareact.com/kxk",
    authorName: "Elon Musk",
    author: "elonmusk",
    timestamp: "9:00AM | 10 April, 2022",
    title: "Photos Sharing Website",
    desc: "Looking for a frontend developer who is good with both figma and adobexd. Experience of more than a year.",
    role: "UI/UX Designer",
    experience: "Intermediate",
    skills: ["Figma", "AdobeXD"],
    duration: "3 Months",
    tags: ["Figma", "AdobeXD", "React", "Frontend"],
    university: "Charusat University",
  };

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <div className={styles.postProfile}>
          <img src={post.authorImg} alt="" className={styles.roundedFull} />
          <div className={styles.postProfileName}>
            <p className="postAuthorName">{post.authorName}</p>
            <span className="postAuthorUsername">@{post.author}</span>
          </div>
          {starredPostId.includes(post.id) ? (
            <StarIconSolid
              onClick={() => handleUnstar(post.id)}
              style={{
                height: "1rem",
                position: "absolute",
                right: "0px",
                top: "10px",
              }}
            />
          ) : (
            <StarIconOutline
              onClick={() => handleStar(post.id)}
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
          <p>{post.timestamp}</p>
        </div>
        <p className={styles.postTitle}>{post.title}</p>
        <p className={styles.postDesc}>{post.desc}</p>
        <div className={styles.postAttribs}>
          <div className={styles.postAttribItem}>
            <p>Role</p>
            <p>{post.role}</p>
          </div>
          <div className={styles.postAttribItem}>
            <p>Experience</p>
            <p>{post.experience}</p>
          </div>

          <div className={styles.postAttribItem}>
            <p>Skills</p>
            <p>{post.skills.join(", ")}</p>
          </div>
          <div className={styles.postAttribItem}>
            <p>Duration</p>
            <p>{post.duration}</p>
          </div>
        </div>
        <div className={styles.postFooter}>
          <div className={styles.postTags}>
            {post.tags.map((e) => (
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
          <p>{post.university}</p>
        </div>
      </div>
    </div>
  );
}

export default postPage;
