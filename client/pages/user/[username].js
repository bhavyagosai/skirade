import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Profile.module.css";
import { ChatAltIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { gql, useMutation, useQuery } from "@apollo/client";

function usernamePage() {
  const [userData, setUserData] = useState({});

  const router = useRouter();
  const {
    query: { username },
  } = router;

  let uservalue = username;

  useEffect(() => {
    console.log(uservalue);
  }, [username]);

  const GET_USER = gql`
    query getUsers($username: String!) {
      getUser(username: $username) {
        id
        username
        email
        name
        age
        city
        country
        education
        institution
        degree
        passingYear
        createdAt
        profileImage
        starredPosts {
          postID
          postTitle
        }
        github
        linkedin
        twitter
        instagram
        title
        about
        skills
        languages
      }
    }
  `;

  const { error, data, loading } = useQuery(GET_USER, {
    variables: { username: username },
    skip: username ? false : true,
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setUserData(data.getUser);
    },
  });

  // Fetch all the user details using 'username' and save it as a object like below
  const user = {
    name: "Jaipal Jadeja",
    username: "jaipaljadeja",
    university: "Charusat University, Anand, India",
    linkedin: "https://linkedin.com/jaipaljadeja",
    github: "https://github.com/jaipaljadeja",
    twitter: "https://twitter.com/justjaipal",
    instagram: "https://instagram.com/justjaipal",
    title: "Full Stack Developer and UI/UX Designer",
    about:
      "I am a full-stack web developer with an expertise in WebGL. In addition to a solid background in Applied Mathematics, I care about design and have a strong understanding of layout, responsiveness and user experience. A highlight of my career has been developing a WebGL app for a Silicon Valley startup. Apart from this, I have worked with startups in US, Australia and Singapore and understand the importance of time and work quality in a startup environment. I have worked on client projects using Node, React and Laravel. I am well versed in English and have a decent experience working across multi-cultural teams. I'm always open to new frameworks and believe that the technology should suit the project.",
    skills: [
      "webgl",
      "threejs",
      "react.js",
      "node.js",
      "next.js",
      "mongodb",
      "ui design",
      "figma",
      "after effects",
      "graphic designing",
    ],
    languages: ["Hindi", "English", "Gujarati"],
    education: "Charotar University of Science and Technology",
    educationLocation: "Anand, Gujarat, India",
    experience: [
      {
        title: "Graphic Designer",
        company: "Google Developer Students Clubs",
        location: "Charotar University of Science and Technology",
        durationStart: "August, 2021",
        durationEnd: "Present",
        description:
          "I edited videos for DSC and made a few posters for some events which were held by DSC.",
      },
      {
        title: "UI/UX Designer",
        company: "MSquare Technologies",
        location: "Surat, Gujarat, India",
        durationStart: "June, 2021",
        durationEnd: "July, 2021",
        description:
          "I made the UI and UX Design for a billing management application",
      },
    ],
  };
  return (
    <div className={styles.container}>
      <div className={styles.profileCard1}>
        <div className={styles.profileCard1_leftHalf}>
          <div className={styles.profileImage}>
            <img src={userData.profileImage} />
          </div>
          <div className={styles.profileDetails}>
            <h2>{userData.name}</h2>
            <div>
              <LocationMarkerIcon style={{ height: "1rem" }} />
              <p>
                {userData.city}, {userData.country}
              </p>
            </div>
            <p>@{userData.username}</p>
          </div>
        </div>
        <div className={styles.profileCard1_rightHalf}>
          <div className={styles.profileSocials}>
            <a href={userData.github}>
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/github.svg" />
            </a>
            <a href={userData.linkedin}>
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/linkedin.svg" />
            </a>
            <a href={userData.twitter}>
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/twitter.svg" />
            </a>
            <a href={userData.instagram}>
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/instagram.svg" />
            </a>
          </div>
          <div className={styles.postChatButton}>
            <ChatAltIcon style={{ height: "1rem" }} />
            <p>message</p>
          </div>
        </div>
      </div>
      <div className={styles.profileCard2}>
        <h1>{userData.title}</h1>
        <p>{userData.about}</p>
      </div>
      <div className={styles.profileCard3}>
        <div className={styles.profileCard3_left}>
          <h1>Skills</h1>
          <div className={styles.skillsTags}>
            {userData.skills?.map((e) => (
              <p className={styles.skillsTag}>{e}</p>
            ))}
          </div>
        </div>
        <div className={styles.profileCard3_right}>
          <div className={styles.profileLanguage}>
            <h1>Languages</h1>
            <p>{userData?.languages?.join(", ")}</p>
          </div>
          <div className={styles.profileEducation}>
            <h1>Education</h1>
            <p>{userData.institution}</p>
            <p style={{ fontSize: "0.7rem", color: "gray" }}>
              {userData.city}, {userData.country}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.profileCard4}>
        <h1>Experience</h1>
        {user.experience.map((e) => (
          <div className={styles.experience}>
            <h2>
              <span>{e.title}</span> <div className={styles.hrLine}></div>
            </h2>
            <h3>{e.company}</h3>
            <p>
              {e.durationStart} to {e.durationEnd}
            </p>
            <p>{e.location}</p>
          </div>
        ))}
      </div>
    </div>
    // <div>j</div>
  );
}

export default usernamePage;
