import styles from "../styles/Index.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormError from "../components/FormError";
import AppContext from "../components/AppContext";

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
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
    }
  }
`;

export default function Login() {
  const router = useRouter();

  // isSubmitting for disabling the form submit until a response has been recieved by clicking submit once
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, dispatch } = React.useContext(AppContext);

  const [login, { error, data, loading }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.log(error);
      setIsSubmitting(false); //enable the form submit btn again
    },
    onCompleted: (data) => {
      console.log("User Logged in!");
      // console.log("User Logged in!\n" + JSON.stringify(data));
      setIsSubmitting(false); //enable the form submit btn again
      localStorage.setItem("UserData", JSON.stringify(data));
      dispatch({
        type: "AUTH_STATE_CHANGE",
        loggedIn: true,
      });
      router.push("/");
    },
  });

  // Yup validation for login info
  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().min(8).label("Password"),
  });

  const loginHandler = (data) => {
    setIsSubmitting(true); // Disables the form submit btn
    login({
      variables: {
        username: data.username,
        password: data.password,
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={loginHandler}
            validationSchema={loginValidationSchema}
          >
            {({
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
            }) => {
              return (
                <Form className={styles.loginForm}>
                  <h2>Login</h2>
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
