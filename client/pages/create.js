import React from "react";
import { Field, Formik, useFormik } from "formik";
import { gql, useMutation, useQuery } from "@apollo/client";

import styles from "../styles/Index.module.css";
import {
  roles,
  experience,
  skills,
  duration,
  university,
  tags,
} from "../data/filters";
import CustomSelect from "../components/CustomSelect";

const ADD_POST = gql`
  mutation addPost($postInput: PostInput) {
    addPost(postInput: $postInput) {
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

function create() {
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title is required";
    }

    if (!values.desc) {
      errors.desc = "Description is required";
    }

    if (!values.roles) {
      errors.roles = "Roles required";
    }

    if (!values.experience) {
      errors.roles = "Experience required";
    }

    if (!values.skills) {
      errors.roles = "Skills required";
    }

    if (!values.university) {
      errors.roles = "University required";
    }

    if (!values.duration) {
      errors.roles = "Duration required";
    }
    return errors;
  };

  const [addPost, { error, data, loading }] = useMutation(ADD_POST, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log("Post Added!");
      // console.log("User Logged in!\n" + JSON.stringify(data));
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      roles: "",
      skills: "",
      experience: "",
      duration: "",
      university: "",
      tags: "",
    },
    validate,
    onSubmit: (value) => {
      /* ALSO APPEND AUTHOR ID and Profile pic etc */
      // console.log(value);
      addPost({
        variables: {
          postInput: {
            author: localStorage.getItem("UserData")
              ? JSON.parse(localStorage.getItem("UserData")).register
                ? JSON.parse(localStorage.getItem("UserData")).register.username
                : JSON.parse(localStorage.getItem("UserData")).login.username
              : "dummy",
            authorName: localStorage.getItem("UserData")
              ? JSON.parse(localStorage.getItem("UserData")).register
                ? JSON.parse(localStorage.getItem("UserData")).register.name
                : JSON.parse(localStorage.getItem("UserData")).login.name
              : "dummy",
            authorImg: localStorage.getItem("UserData")
              ? JSON.parse(localStorage.getItem("UserData")).register
                ? JSON.parse(localStorage.getItem("UserData")).register
                    .profileImage
                : JSON.parse(localStorage.getItem("UserData")).login
                    .profileImage
              : "dummy",
            title: value.title,
            description: value.desc,
            role: value.roles,
            skills: value.skills,
            experience: value.experience,
            duration: value.duration,
            university: value.university,
            tags: value.tags,
          },
        },
      }).catch((error) => {
        console.log(error);
      });
    },
  });
  return (
    <div className={styles.createPostContainer}>
      <div className={styles.createPostCard}>
        <h1>New Post</h1>
        <div className={styles.createPostForm}>
          <Formik>
            {({ handleBlur, errors, touched }) => (
              <form onSubmit={formik.handleSubmit}>
                <Field
                  name="title"
                  type="text"
                  id="titleInput"
                  className={styles.createPostFormInput}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Title"
                />
                {formik.errors.title ? (
                  <div className={styles.formError}>{formik.errors.title}</div>
                ) : null}
                <Field
                  name="desc"
                  as="textarea"
                  id="descInput"
                  className={styles.createPostFormInput}
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  placeholder="Description"
                />
                {formik.errors.desc ? (
                  <div className={styles.formError}>{formik.errors.desc}</div>
                ) : null}

                <CustomSelect
                  options={roles}
                  isMulti={false}
                  value={formik.values.roles}
                  onChange={(e) => {
                    formik.setFieldValue("roles", e.label);
                  }}
                  placeholder="Frontend Developer..."
                  handleBlur={handleBlur}
                />
                {formik.errors.roles && touched.roles ? (
                  <div className={styles.formError}>{formik.errors.roles}</div>
                ) : null}

                <CustomSelect
                  options={experience}
                  isMulti={false}
                  value={formik.values.experience}
                  onChange={(e) => {
                    formik.setFieldValue("experience", e.label);
                  }}
                  handleBlur={handleBlur}
                  placeholder="Beginner, Intermediate..."
                />
                {formik.errors.experience && touched.experience ? (
                  <div className={styles.formError}>
                    {formik.errors.experience}
                  </div>
                ) : null}

                <CustomSelect
                  options={skills}
                  isMulti={true}
                  value={formik.values.skills}
                  onChange={(e) => {
                    const value = Array.isArray(e) ? e.map((x) => x.label) : [];
                    formik.setFieldValue("skills", value);
                  }}
                  handleBlur={handleBlur}
                  placeholder="C/C++, Java, Python..."
                />
                {formik.errors.skills && touched.skills ? (
                  <div className={styles.formError}>{formik.errors.skills}</div>
                ) : null}

                <CustomSelect
                  options={duration}
                  isMulti={false}
                  value={formik.values.duration}
                  onChange={(e) => {
                    formik.setFieldValue("duration", e.label);
                  }}
                  handleBlur={handleBlur}
                  placeholder="1 Month, 3 Month..."
                />
                {formik.errors.duration && touched.duration ? (
                  <div className={styles.formError}>
                    {formik.errors.duration}
                  </div>
                ) : null}

                <CustomSelect
                  options={university}
                  isMulti={false}
                  value={formik.values.university}
                  onChange={(e) => {
                    formik.setFieldValue("university", e.label);
                  }}
                  handleBlur={handleBlur}
                  placeholder="Charusat University, Anand"
                />
                {formik.errors.university && touched.university ? (
                  <div className={styles.formError}>
                    {formik.errors.university}
                  </div>
                ) : null}

                <CustomSelect
                  options={tags}
                  isMulti={true}
                  value={formik.values.tags}
                  onChange={(e) => {
                    const value = Array.isArray(e) ? e.map((x) => x.label) : [];
                    formik.setFieldValue("tags", value);
                  }}
                  handleBlur={handleBlur}
                  placeholder="Tags..."
                />
                {formik.errors.tags && touched.tags ? (
                  <div className={styles.formError}>{formik.errors.tags}</div>
                ) : null}
                <button type="submit" className={styles.createPostSubmitBtn}>
                  Post
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default create;
