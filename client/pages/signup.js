import styles from "../styles/Index.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormError from "../components/FormError";
import AppContext from "../components/AppContext";

const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
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
      token
      createdAt
      profileImage
      starredPosts {
        postID
        postTitle
      }
    }
  }
`;

export default function Signup() {
  const router = useRouter();
  const [isShifted, setIsShifted] = useState(false);
  const [isMoreShifted, setIsMoreShifted] = useState(false);

  // isSubmitting for disabling the form submit until a response has been recieved by clicking submit once
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitData, setSubmitData] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const { user, dispatch } = React.useContext(AppContext);

  const [register, { error, data, loading }] = useMutation(REGISTER_USER, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log("User Registered!");
      // console.log("User Registered\n" + JSON.stringify(data));
      setIsSubmitting(false); //enable the form submit btn again
      localStorage.setItem("UserData", JSON.stringify(data));
      dispatch({
        type: "AUTH_STATE_CHANGE",
        loggedIn: true,
      });
      router.push("/");
    },
  });

  useEffect(() => {
    if (submitStatus) {
      // console.log(submitData);
      register({
        variables: {
          registerInput: {
            username: submitData.username,
            email: submitData.email,
            password: submitData.password,
            confirmPassword: submitData.confirmPassword,
            name: submitData.name,
            age: submitData.age,
            city: submitData.city,
            country: submitData.country,
            education: submitData.education,
            institution: submitData.institution,
            degree: submitData.degree,
            passingYear: submitData.passingYear,
          },
        },
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [submitStatus]);

  // Yup validation for login info
  const box1ValidationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .label("Password"),
  });

  const box2ValidationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    age: Yup.string().required().label("Age"),
    city: Yup.string().required().label("City"),
    country: Yup.string().required().label("Country"),
  });

  const box3ValidationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    institution: Yup.string().required().label("Institution"),
    degree: Yup.string().required().label("degree"),
    passingYear: Yup.string().required().label("passingYear"),
  });

  const variants = {
    original: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      },
    },
    originalOpacity: {
      opacity: 1,
    },
    shiftedOpacity: {
      opacity: 0,
    },
    shifted: {
      // opacity: 0,
      x: "calc(-100% - 3em)",
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      },
    },
    moreShifted: {
      // opacity: 0,
      x: "calc(-200% - 6em)",
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };

  const box1SubmitHandler = (data) => {
    setSubmitData((submitData) => ({
      ...submitData,
      ...data,
    }));
    setIsShifted((isShifted) => !isShifted);
  };

  const box2SubmitHandler = (data) => {
    setSubmitData((submitData) => ({
      ...submitData,
      ...data,
    }));
    setIsMoreShifted((isMoreShifted) => !isMoreShifted);
  };

  const box3SubmitHandler = (data) => {
    setIsSubmitting(true); // Disables the form submit btn
    setSubmitData((submitData) => ({
      ...submitData,
      ...data,
    }));
    setSubmitStatus(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <Formik
            initialValues={{
              education: "",
              institution: "",
              degree: "",
              passingYear: "",
            }}
            onSubmit={box3SubmitHandler}
            // validationSchema={box3ValidationSchema}
          >
            {({
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit = handleBox3Submit,
            }) => {
              return (
                <Form className={styles.form}>
                  <Formik
                    initialValues={{
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    onSubmit={box1SubmitHandler}
                    // validationSchema={box1ValidationSchema}
                  >
                    {({
                      handleChange,
                      errors,
                      setFieldTouched,
                      touched,
                      handleSubmit = handleBox1Submit,
                    }) => {
                      return (
                        <motion.div
                          className={styles.box1}
                          animate={
                            isMoreShifted
                              ? "moreShifted"
                              : isShifted
                              ? "shifted"
                              : "original"
                          }
                          variants={variants}
                        >
                          <h2>Signup</h2>
                          <br />
                          <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onBlur={() => setFieldTouched("username")}
                            required
                            onChange={handleChange("username")}
                          />
                          <FormError
                            error={errors.username}
                            visible={touched.username}
                          />
                          {/* <br /> */}

                          {/* <label htmlFor="email">email</label> */}
                          <br />
                          <input
                            type="text"
                            name="email"
                            placeholder="email"
                            onBlur={() => setFieldTouched("email")}
                            required
                            onChange={handleChange("email")}
                          />
                          <FormError
                            error={errors.email}
                            visible={touched.email}
                          />
                          {/* <br /> */}

                          {/* <label htmlFor="password">password</label> */}
                          <br />
                          <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onBlur={() => setFieldTouched("password")}
                            required
                            onChange={handleChange("password")}
                          />
                          <FormError
                            error={errors.password}
                            visible={touched.password}
                          />
                          {/* <br /> */}

                          {/* <label htmlFor="confirmPassword">confirm password</label> */}
                          <br />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            onBlur={() => setFieldTouched("confirmPassword")}
                            required
                            onChange={handleChange("confirmPassword")}
                          />
                          <FormError
                            error={errors.confirmPassword}
                            visible={touched.confirmPassword}
                          />
                          <br />
                          {/* <br /> */}

                          <div id="form-button">
                            <button
                              className={styles.submitBtn}
                              type="submit"
                              // disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Next
                            </button>
                          </div>
                        </motion.div>
                      );
                    }}
                  </Formik>
                  <Formik
                    initialValues={{
                      name: "",
                      age: "",
                      city: "",
                      country: "",
                    }}
                    onSubmit={box2SubmitHandler}
                    // validationSchema={box2ValidationSchema}
                  >
                    {({
                      handleChange,
                      errors,
                      setFieldTouched,
                      touched,
                      handleSubmit = handleBox2Submit,
                    }) => {
                      return (
                        <motion.div
                          className={styles.box1}
                          animate={
                            isMoreShifted
                              ? "moreShifted"
                              : isShifted
                              ? "shifted"
                              : "original"
                          }
                          variants={variants}
                        >
                          <h2>
                            <FontAwesomeIcon
                              icon={faCircleChevronLeft}
                              className={styles.leftArrow}
                              onClick={() => {
                                setIsShifted((isShifted) => !isShifted);
                              }}
                            />
                            About Yourself
                          </h2>
                          <br />
                          <input
                            type="text"
                            name="name"
                            placeholder="name"
                            onBlur={() => setFieldTouched("name")}
                            required
                            onChange={handleChange("name")}
                          />
                          <FormError
                            error={errors.name}
                            visible={touched.name}
                          />

                          <br />
                          <input
                            type="text"
                            name="age"
                            placeholder="age"
                            onBlur={() => setFieldTouched("age")}
                            required
                            onChange={handleChange("age")}
                          />
                          <FormError error={errors.age} visible={touched.age} />

                          <br />
                          <input
                            type="text"
                            name="city"
                            placeholder="city"
                            onBlur={() => setFieldTouched("city")}
                            required
                            onChange={handleChange("city")}
                          />
                          <FormError
                            error={errors.city}
                            visible={touched.city}
                          />

                          <br />
                          <input
                            type="text"
                            name="country"
                            placeholder="country"
                            onBlur={() => setFieldTouched("country")}
                            required
                            onChange={handleChange("country")}
                          />
                          <FormError
                            error={errors.country}
                            visible={touched.country}
                          />
                          <br />

                          <div id="form-button">
                            <button
                              className={styles.submitBtn}
                              type="submit"
                              // disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Next
                            </button>
                          </div>
                        </motion.div>
                      );
                    }}
                  </Formik>
                  <motion.div
                    className={styles.box1}
                    animate={
                      isMoreShifted
                        ? "moreShifted"
                        : isShifted
                        ? "shifted"
                        : "original"
                    }
                    variants={variants}
                  >
                    <h2>
                      <FontAwesomeIcon
                        icon={faCircleChevronLeft}
                        className={styles.leftArrow}
                        onClick={() => {
                          setIsMoreShifted((isMoreShifted) => !isMoreShifted);
                        }}
                      />
                      Education
                    </h2>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        // alignItems: "center",
                        padding: "0 1em",
                        // justifyContent: "space-between",
                      }}
                      role="group"
                      aria-labelledby="my-radio-group"
                    >
                      <label onBlur={() => setFieldTouched("education")}>
                        <Field
                          id="radioField"
                          type="radio"
                          name="education"
                          value="Graduate"
                          style={{
                            height: "15px",
                            width: "15px",
                            marginRight: "0.5em",
                          }}
                        />
                        Graduate
                      </label>
                      <label>
                        <Field
                          id="radioField"
                          type="radio"
                          name="education"
                          value="HighSchool"
                          style={{
                            height: "15px",
                            width: "15px",
                            marginRight: "0.5em",
                          }}
                        />
                        HighSchool
                      </label>
                    </div>
                    <FormError
                      error={errors.education}
                      visible={touched.education}
                    />

                    <br />
                    <input
                      type="text"
                      name="institution"
                      placeholder="institution"
                      onBlur={() => setFieldTouched("institution")}
                      required
                      onChange={handleChange("institution")}
                    />
                    <FormError
                      error={errors.institution}
                      visible={touched.institution}
                    />

                    <br />
                    <input
                      type="text"
                      name="degree"
                      placeholder="degree"
                      onBlur={() => setFieldTouched("degree")}
                      required
                      onChange={handleChange("degree")}
                    />
                    <FormError error={errors.degree} visible={touched.degree} />

                    <br />
                    <input
                      type="text"
                      name="passingYear"
                      placeholder="passing year"
                      onBlur={() => setFieldTouched("passingYear")}
                      required
                      onChange={handleChange("passingYear")}
                    />
                    <FormError
                      error={errors.passingYear}
                      visible={touched.passingYear}
                    />
                    <br />

                    <div id="form-button">
                      <button
                        className={styles.submitBtn}
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </motion.div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
