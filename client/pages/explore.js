import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import ExploreFeed from "../components/ExploreFeed";
import FilterSideBar from "../components/FilterSideBar";
import StarsSideBar from "../components/StarsSideBar";
import styles from "../styles/Index.module.css";

const GET_POSTS = gql`
  {
    getPosts {
      id
      author
      authorName
      authorImg
      title
      description
      role
      skills
      experience
      duration
      university
      tags
      createdAt
    }
  }
`;

function explore() {
  // Fetch Starred Post IDs of the user signed in and assign it in below state
  const [starredPostId, setStarredPostId] = useState([]);
  const [posts, setPosts] = useState([]);

  const { error, data, loading } = useQuery(GET_POSTS, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log("Posts Fetched!");
      console.log(data.getPosts);
      setPosts(data.getPosts);
      // console.log(Posts);
      // dispatch({
      //   type: "AUTH_STATE_CHANGE",
      //   loggedIn: true,
      // });
    },
  });

  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      setStarredPostId(
        JSON.parse(localStorage.getItem("UserData")).register
          ? JSON.parse(localStorage.getItem("UserData")).register.starredPosts
          : JSON.parse(localStorage.getItem("UserData")).login.starredPosts
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.exploreFlex}>
        <FilterSideBar posts={posts} setPosts={setPosts} />
        <ExploreFeed
          starredPostId={starredPostId}
          setStarredPostId={setStarredPostId}
          posts={posts}
          setPosts={setPosts}
        />
        <StarsSideBar
          starredPostId={starredPostId}
          setStarredPostId={setStarredPostId}
        />
      </div>
    </div>
  );
}

export default explore;
