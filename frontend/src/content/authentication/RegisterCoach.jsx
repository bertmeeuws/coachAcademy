import React from "react";
import style from "../authentication/Login.module.css";
import { Formik } from "formik";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useMutation, gql } from "@apollo/client";
import jwt_decode from "jwt-decode";

const REGISTER_CLIENT = gql`
  mutation myMutation($user: UserInput!) {
    signUp(user: $user) {
      token
    }
  }
`;

export default function RegisterCoach() {
  const [REGISTER] = useMutation(REGISTER_CLIENT);

  const addToken = useStoreActions((actions) => actions.addToken);
  const addRoles = useStoreActions((actions) => actions.addRoles);
  const deleteToken = useStoreActions((actions) => actions.deleteToken);
  const addId = useStoreActions((actions) => actions.addId);

  const rolesInState = useStoreState((state) => state.roles);

  if (rolesInState.includes("coach")) {
    return <Redirect to="/dashboard" />;
  }
  if (rolesInState.includes("client")) {
    console.log(rolesInState);
    return <Redirect to="/clientdashboard" />;
  }

  return (
    <section className="auth-section">
      <div className="greenbox"></div>
      <div className="login shadow rounded">
        <div className="login-content padding">
          <img src={logo} width="222" height="26.21" alt="" />

          <Formik
            initialValues={{
              email: "",
              surname: "",
              name: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (values.password !== values.confirmPassword) {
                errors.password = "Passwords not matching";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              deleteToken();
              const { errors, data } = await REGISTER({
                variables: {
                  user: {
                    email: values.email,
                    password: values.password,
                    surname: values.surname,
                    name: values.name,
                    coach: true,
                  },
                },
              });

              console.log(errors);
              if (!errors) {
                addToken(data.signUp.token);

                const decoded = jwt_decode(data.signUp.token);

                console.log(
                  "Allowed roles: " +
                    decoded["https://hasura.io/jwt/claims"][
                      "x-hasura-allowed-roles"
                    ]
                );
                const roles =
                  decoded["https://hasura.io/jwt/claims"][
                    "x-hasura-allowed-roles"
                  ];

                const id = Number(
                  decoded["https://hasura.io/jwt/claims"]["x-hasura-client-id"]
                );
                addRoles(roles);
                addId(id);
              }

              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={style.form} onSubmit={handleSubmit}>
                <div className="coach-register-container">
                  <div className="coach-register-input">
                    <label className="smalltext" htmlFor="surname">
                      Surname
                    </label>
                    <input
                      type="text"
                      name="surname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.surname}
                    />
                  </div>
                  <div className="coach-register-input">
                    <label className="smalltext" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <div className="coach-register-input email">
                    <label className="smalltext" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p className={style.error}>
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="coach-register-input">
                    <label className="smalltext" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                  <div className="coach-register-input">
                    <label className="smalltext" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <div className="login-buttons">
                  <button type="submit" className="button-login">
                    Register
                  </button>
                  <button className="button-register">
                    <Link className="link" to="/login">
                      I already have an account
                    </Link>
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
