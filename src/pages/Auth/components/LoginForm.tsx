import React, { FunctionComponent, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import AuthContext from '../../../context/auth-ctx';
import './Form.css';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export interface FormProps {
  loading: boolean;
  toggleLoad(): void;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password?: string;
}

const LoginForm: FunctionComponent<FormProps> = ({ loading, toggleLoad }) => {
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      loginHandler(values);
    },
  });

  const loginHandler = async (formValues: {
    email: string;
    password: string;
  }) => {
    toggleLoad();
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const user: UserInterface = responseData.user;
      login({ username: user.username, email: user.email, id: user.id });
    } catch (err) {
      console.log(err);
      toggleLoad();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
      {loading && (
        <div className="overlay">
          <CircularProgress />
        </div>
      )}
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mt: 3 }}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mt: 3 }}
      />

      <Button
        sx={{ mt: 3 }}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
