import styles from "../styles/Index.module.css";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ChatElement from "../components/ChatElement";
import FormError from "../components/FormError";

export default function Home() {
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
        // type: "spring",
        // bounce: 0.1,
        // damping: 15,
        // stiffness: 130,
        duration: 0.3,
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
        // type: "spring",
        // bounce: 0.1,
        // stiffness: 130,
        // damping: 15,
        duration: 0.3,
      },
    },
    moreShifted: {
      // opacity: 0,
      x: "calc(-200% - 6em)",
      transition: {
        // type: "spring",
        // bounce: 0.1,
        // damping: 15,
        // stiffness: 130,
        duration: 0.3,
      },
    },
  };

  const [isShifted, setIsShifted] = useState(false);
  const [isMoreShifted, setIsMoreShifted] = useState(false);

  const box3SubmitHandler = (
    data
    // { name, username, email, password }
  ) => {
    // setIsSubmitting(true); // Disables the form submit btn
    // toast.promise(
    //   dispatch(register(name, username, email, password)), // Dispatches the userinfo
    //   {
    //     loading: "Signing you up...", //when signing up
    //     success: "Sign Up Success! Redirecting...", //if signup is success
    //     error: error || "User Already Exist", //if signup fails
    //   },
    //   {
    //     style: {
    //       fontFamily: "Monospace",
    //       marginTop: "15px",
    //     },
    //   }
    // );
    // setIsSubmitting(false); //enable the form submit btn again
    console.log(data);
  };

  const box1SubmitHandler = (data) => {
    console.log(data);
    setIsShifted((isShifted) => !isShifted);
  };

  const box2SubmitHandler = (data) => {
    console.log(data);
    setIsMoreShifted((isMoreShifted) => !isMoreShifted);
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
            validationSchema={box3ValidationSchema}
          >
            {({
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
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
                    validationSchema={box1ValidationSchema}
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
                    validationSchema={box2ValidationSchema}
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
                    {/* <input
                      type="text"
                      name="username"
                      placeholder="username"
                      onBlur={() => setFieldTouched("username")}
                      required
                      onChange={handleChange("username")}
                    /> */}
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
                            // border: "1px solid black",
                            verticalAlign: "middle",
                          }}
                        />
                        Graduate
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="education"
                          value="HighSchool"
                          style={{
                            height: "15px",
                            width: "15px",
                            verticalAlign: "middle",
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
                      placeholder="passingYear"
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
                        // disabled={isSubmitting}
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
