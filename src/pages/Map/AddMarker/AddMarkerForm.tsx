import React, { FunctionComponent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';

import { FormProps } from '../../Auth/components/LoginForm';
import '../../Auth/components/Form.css';

const validationSchema = yup.object().shape({
  locationName: yup
    .string()
    .min(5, 'Location must have a minimum name length of 5 characters.')
    .required('Location name is required.'),
  photoUrl: yup.string().required('Photo url is required'),
});

const AddMarkerForm: FunctionComponent<FormProps> = ({
  loading,
  toggleLoad,
}): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      locationName: '',
      photoUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toggleLoad();
      // setTimeout(() => {
      //   if (USERS.find((user) => user.password === values.password)) {
      //     login();
      //   }
      //   toggleLoad();
      // }, 1000);
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
        id="locationName"
        name="locationName"
        label="Location Name"
        value={formik.values.locationName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.locationName && Boolean(formik.errors.locationName)
        }
        helperText={formik.touched.locationName && formik.errors.locationName}
        sx={{ mt: 3 }}
      />
      <TextField
        fullWidth
        id="photoUrl"
        name="photoUrl"
        label="Photo Url"
        value={formik.values.photoUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.photoUrl && Boolean(formik.errors.photoUrl)}
        helperText={formik.touched.photoUrl && formik.errors.photoUrl}
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

export default AddMarkerForm;
