import { useState, useEffect } from "react";
import ExploreFeed from "../components/ExploreFeed";
import FilterSideBar from "../components/FilterSideBar";
import StarsSideBar from "../components/StarsSideBar";
import styles from "../styles/Index.module.css";
function explore() {
  // Fetch Starred Post IDs of the user signed in and assign it in below state
  const [starredPostId, setStarredPostId] = useState([]);

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
