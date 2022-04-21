import { useState, useEffect } from "react";
import ExploreFeed from "../components/ExploreFeed";
import FilterSideBar from "../components/FilterSideBar";
import StarsSideBar from "../components/StarsSideBar";
import styles from "../styles/Index.module.css";
function explore() {
  // Fetch Starred Post IDs of the user signed in and assign it in below state
  const [starredPostId, setStarredPostId] = useState([
    // {
    //   postID: "625ed37b604db65bd067f53e",
    //   postTitle: "Photos Sharing Website",
    //   __typename: "StarredPost",
    // },
    // {
    //   postID: "625ed5ce6fab937d91b004ac",
    //   postTitle: "Memories App",
    //   __typename: "StarredPost",
    // },
    // {
    //   postID: "625ed7786fab937d91b004b6",
    //   postTitle: "Movie CGI",
    //   __typename: "StarredPost",
    // },
  ]);

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
        <FilterSideBar />
        <ExploreFeed
          starredPostId={starredPostId}
          setStarredPostId={setStarredPostId}
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
