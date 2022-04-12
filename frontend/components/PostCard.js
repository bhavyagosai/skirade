import React, { useEffect, useState } from 'react';
import styles from '../styles/Index.module.css';
import {
  ChatAltIcon,
  StarIcon as StarIconSolid,
  LocationMarkerIcon,
} from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';

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

  const handleStar = (id) => {
    setUserStarredPosts((arr) => [...arr, id]);
    console.log('Starred Post', id);
    // MAKE API CALL FOR STARRING UPDATE IN DB AS WELL
  };

  const handleUnstar = (id) => {
    setUserStarredPosts(userStarredPosts.filter((item) => item !== id));
    console.log('UnStarred Post', id);
    // MAKE API CALL FOR STARRING UPDATE IN DB AS WELL
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
            onClick={() => handleUnstar(postId)}
            style={{
              height: '1rem',
              position: 'absolute',
              right: '0px',
              top: '10px',
            }}
          />
        ) : (
          <StarIconOutline
            onClick={() => handleStar(postId)}
            style={{
              height: '1rem',
              position: 'absolute',
              right: '0px',
              top: '10px',
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
            <p>{skills.toString()}</p>
          </div>
          <div className={styles.postAttribItem}>
            <p>Duration</p>
            <p>{duration} Months</p>
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
          <ChatAltIcon style={{ height: '1rem' }} />
          <p>message</p>
        </div>
      </div>
      <div className={styles.postLocation}>
        <LocationMarkerIcon style={{ height: '1rem' }} />
        <p>{postAddress}</p>
      </div>
    </div>
  );
}

export default PostCard;
