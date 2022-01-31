import { FunctionComponent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import { MarkerFormProps } from './AddMarkerModal';
import { MarkerDetails } from '../MapPage';
import { v4 as uuidv4 } from 'uuid';
import '../../Auth/components/Form.css';

interface AddMarkerFormProps extends MarkerFormProps {
  // setMarkerId(markerId: string): void;
  clickedCoords: { lat: number; lng: number };
  storeMarker(marker: MarkerDetails): void;
}

const validationSchema = yup.object().shape({
  locationName: yup
    .string()
    .min(5, 'Location must have a minimum name length of 5 characters.')
    .required('Location name is required.'),
  description: yup
    .string()
    .min(10, 'Description must have a minimum length of 10 characters.')
    .required('description is required'),
});

const AddMarkerForm: FunctionComponent<AddMarkerFormProps> = ({
  loading,
  toggleLoad,
  switchForm,
  // setMarkerId,
  clickedCoords,
  storeMarker,
}) => {
  const formik = useFormik({
    initialValues: {
      locationName: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toggleLoad();

      setTimeout(() => {
        const locId = uuidv4();
        const newLoc = {
          id: locId,
          coords: clickedCoords,
          name: values.locationName,
          description: values.description,
        };
        console.log(newLoc);
        // setMarkerId(locId);
        storeMarker(newLoc);
        switchForm();
        toggleLoad();
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
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
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
