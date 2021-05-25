import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "./api/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },

  mainHeader: {
    margin: `${theme.spacing(1)}px auto`,
    textAlign: "center",
    marginBottom: 20,
  },
  main: {
    margin: `${theme.spacing(1)}px auto`,
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  });

  const handleFormChange = (e) => {
    error && setError(null);
    e.target.id === "email" && setEmail(e.target.value);
    e.target.id === "password" && setPassword(e.target.value);
    e.target.id === "confirmPassword" && setConfirmPassword(e.target.value);
  };

  const [registerUserApi] = useMutation(REGISTER_USER, {
    variables: {
      grant_type: "password",
      client_id: 1,
      client_secret: "PLryOKlPgF4Imc9Hlp4XegX7WFdMCc26NrKbvwwo",
      email,
      password,
      confirmPassword,
    },
    onCompleted: ({ register }) => {
      localStorage.setItem("token", register.tokens.access_token);
      localStorage.setItem("user", register.tokens.user.id);
      history.push("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const registerUser = (e) => {
    e.preventDefault();
    registerUserApi();
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid className={classes.main} container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Typography className={classes.mainHeader} variant="h4">
              User Register
            </Typography>
            {error && (
              <Typography
                color="secondary"
                className={classes.mainHeader}
                variant="h6"
              >
                {error}
              </Typography>
            )}
            <form onSubmit={registerUser}>
              <FormControl
                style={{
                  display: "block",
                  width: "400px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  placeholder="e.g. johndoe"
                  type="email"
                  required
                  style={{ width: "100%" }}
                  id="email"
                  value={email}
                  onChange={handleFormChange}
                  aria-describedby="email-text"
                />
              </FormControl>
              <FormControl
                style={{
                  display: "block",
                  width: "400px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  placeholder="e.g. 12345678"
                  type="password"
                  required
                  style={{ width: "100%" }}
                  id="password"
                  value={password}
                  onChange={handleFormChange}
                  aria-describedby="password-text"
                />
              </FormControl>
              <FormControl
                style={{
                  display: "block",
                  width: "400px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <Input
                  placeholder="e.g. 12345678"
                  type="password"
                  required
                  style={{ width: "100%" }}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleFormChange}
                  aria-describedby="confirmPassword-text"
                />
              </FormControl>
              <Button
                style={{ display: "block", width: "100%" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </form>
            <div>
              <p style={{ textAlign: "center" }}>
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
