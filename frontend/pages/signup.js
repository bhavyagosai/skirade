import styles from "../styles/Index.module.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import ChatElement from "../components/ChatElement";
import FormError from "../components/FormError";

export default function Home() {
  // Yup validation for login info
  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .label("Password"),
  });

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              name: "",
            }}
            // onSubmit={formSubmitHandler}
            validationSchema={signupValidationSchema}
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
                  <div className={styles.box1}>
                    <h2>Signup</h2>

                    {/* <label htmlFor="name">name</label> */}
                    {/* <br /> */}
                    {/* <input
                    type="text"
                    name="name"
                    required
                    onBlur={() => setFieldTouched("name")}
                    onChange={handleChange("name")}
                  />
                  <FormError error={errors.name} visible={touched.name} />
                  <br /> */}

                    {/* <label htmlFor="username">username</label> */}
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
                    <FormError error={errors.email} visible={touched.email} />
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
                  </div>
                  {/* <div className={styles.box1}>
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

                    <br />
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      onBlur={() => setFieldTouched("email")}
                      required
                      onChange={handleChange("email")}
                    />
                    <FormError error={errors.email} visible={touched.email} />

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
                  </div> */}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
