import React, { FunctionComponent, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import AuthContext from '../../../store/auth-ctx';
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

export const USERS = [
  {
    userId: 'u1',
    username: 'HamSandwich',
    email: 'ham@ham.com',
    password: '123123123',
  },
  {
    userId: 'u2',
    username: 'cheese sarn',
    email: 'sarn@sarn.com',
    password: '123123123',
  },
];

export interface UserInterface {
  userId: string;
  username: string;
  email: string;
  password: string;
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
      // console.log(values);
      toggleLoad();
      setTimeout(() => {
        const currentUser = USERS.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (currentUser) {
          login(currentUser);
        }
      }, 1000);
    },
  });

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
