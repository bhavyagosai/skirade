import React from "react";
import { Field, Formik, useFormik } from "formik";
import styles from "../styles/Index.module.css";
import {
  roles,
  experience,
  skills,
  duration,
  university,
} from "../data/filters";
import CustomSelect from "../components/CustomSelect";

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

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      roles: "",
      skills: "",
      experience: "",
      duration: "",
      university: "",
    },
    validate,
    onSubmit: (value) => {
      console.log(value);
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
                  isMulti={true}
                  value={formik.values.roles}
                  onChange={(e) => {
                    const value = Array.isArray(e) ? e.map((x) => x.value) : [];
                    formik.setFieldValue("roles", value);
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
                    formik.setFieldValue("experience", e.value);
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
                    const value = Array.isArray(e) ? e.map((x) => x.value) : [];
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
                    formik.setFieldValue("duration", e.value);
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
                    formik.setFieldValue("university", e.value);
                  }}
                  handleBlur={handleBlur}
                  placeholder="Charusat University, Anand"
                />
                {formik.errors.university && touched.university ? (
                  <div className={styles.formError}>
                    {formik.errors.university}
                  </div>
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
