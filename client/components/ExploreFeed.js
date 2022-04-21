import React, { useState, useEffect } from "react";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import { gql, useMutation, useQuery } from "@apollo/client";

import PostCard from "./PostCard";

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

function ExploreFeed({ starredPostId, setStarredPostId, posts, setPosts }) {
  const [Posts, setInsidePosts] = useState([]);

  useEffect(() => {
    setInsidePosts(posts);
  }, [Posts, posts]);

  // MAKE API CALL FOR POSTS
  // const { error, data, loading } = useQuery(GET_POSTS, {
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onCompleted: (data) => {
  //     console.log("Posts Fetched!");
  //     // console.log(data.getPosts);
  //     setPosts(data.getPosts);
  //     // console.log(Posts);
  //     // dispatch({
  //     //   type: "AUTH_STATE_CHANGE",
  //     //   loggedIn: true,
  //     // });
  //   },
  // });

  // const posts = [
  //   {
  //     id: 1,
  //     profileImg: "https://links.papareact.com/kxk",
  //     name: "Elon Musk",
  //     username: "elonmusk",
  //     timestamp: "9:00AM | 10 April, 2022",
  //     title: "Photos Sharing Website",
  //     desc: "Looking for a frontend developer who is good with both figma and adobexd. Experience of more than a year.",
  //     role: "UI/UX Designer",
  //     experience: "Intermediate",
  //     skills: ["Figma", "AdobeXD"],
  //     duration: 3,
  //     tags: ["Figma", "AdobeXD", "React", "Frontend"],
  //     address: "Charusat University",
  //   },
  //   {
  //     id: 2,
  //     profileImg:
  //       "https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1630852483255%2FwgItoggYp.jpeg%3Fw%3D400%26h%3D400%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=640&q=75",
  //     name: "Jaipal Jadeja",
  //     username: "jaipaljadeja",
  //     timestamp: "8:00AM | 10 April, 2022",
  //     title: "Memories App",
  //     desc: "Looking for a backend developer who is good with both sql and discrete database. Experience of more than a year.",
  //     role: "Backend Developer",
  //     experience: "Intermediate",
  //     skills: ["MongoDB", "postGre"],
  //     duration: 3,
  //     tags: ["Figma", "AdobeXD", "React", "Frontend"],
  //     address: "VIT Chennai",
  //   },
  //   {
  //     id: 3,
  //     profileImg:
  //       "https://media-exp1.licdn.com/dms/image/C4D03AQFlFMwS5E6QhA/profile-displayphoto-shrink_400_400/0/1596082090496?e=1655337600&v=beta&t=jV9lOMYx7Q8_O6mJipYmsb0PyZdA0uQ_Epc4-xEqw1g",
  //     name: "Harsh Kansagra",
  //     username: "harshkansagra",
  //     timestamp: "7:00AM | 10 April, 2022",
  //     title: "Movie CGI",
  //     desc: "Looking for someone who has 3d Skills",
  //     role: "VFX Artist",
  //     experience: "Intermediate",
  //     skills: ["Blender", "Cinema4D"],
  //     duration: 3,
  //     tags: ["Figma", "AdobeXD", "React", "Frontend"],
  //     address: "IIT London",
  //   },
  // ];

  return (
    <div className={styles.postsContainer}>
      <div className={styles.createPostButtonContainer}>
        <Link href="/create">New Post +</Link>
      </div>
      {Posts.map((post) => (
        <PostCard
          key={post.id.toString()}
          postId={post.id}
          profileImg={post.authorImg}
          name={post.authorName}
          username={post.author}
          timestamp={post.createdAt}
          title={post.title}
          desc={post.description}
          role={post.role}
          experience={post.experience}
          skills={post.skills}
          duration={post.duration}
          tags={post.tags}
          postAddress={post.university}
          starredPostId={starredPostId}
          setStarredPostId={setStarredPostId}
        />
      ))}
    </div>
  );
}

export default ExploreFeed;
