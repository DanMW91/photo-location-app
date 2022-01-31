import { FunctionComponent, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import { PhotoInterface } from '../../../store/location-ctx';
import { MarkerFormProps } from './AddMarkerModal';
import LocationContext from '../../../store/location-ctx';
import { uuid } from 'uuidv4';
import '../../Auth/components/Form.css';

interface AddPhotoFormProps extends MarkerFormProps {
  markerId: string | undefined;
  addMarker(): void;
  closeMarkerModal(): void;
}

const validationSchema = yup.object().shape({
  photoTitle: yup
    .string()
    .min(5, 'Photo title must have a minimum name length of 5 characters.')
    .required('Photo title is required.'),
  photoDescription: yup.string().min(10),
  photoUrl: yup.string().required('Photo url is required'),
});

const AddPhotoForm: FunctionComponent<AddPhotoFormProps> = ({
  loading,
  toggleLoad,
  switchForm,
  markerId,
  addMarker,
  closeMarkerModal,
}) => {
  const { addPhoto } = useContext(LocationContext);

  const formik = useFormik({
    initialValues: {
      photoTitle: '',
      photoDescription: '',
      photoUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toggleLoad();

      setTimeout(() => {
        const newPhoto: PhotoInterface = {
          // need to set user in authcontext and extract current user from there
          userId: 'u1',
          title: values.photoTitle,
          description: values.photoDescription,
          url: values.photoUrl,
          locationId: markerId,
        };
        addPhoto(newPhoto);
        addMarker();
        switchForm();
        toggleLoad();
        closeMarkerModal();
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
        id="photoTitle"
        name="photoTitle"
        label="Photo Title"
        value={formik.values.photoTitle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.photoTitle && Boolean(formik.errors.photoTitle)}
        helperText={formik.touched.photoTitle && formik.errors.photoTitle}
        sx={{ mt: 3 }}
      />
      <TextField
        fullWidth
        id="photoDescription"
        name="photoDescription"
        label="Photo Description"
        value={formik.values.photoDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.photoDescription &&
          Boolean(formik.errors.photoDescription)
        }
        helperText={
          formik.touched.photoDescription && formik.errors.photoDescription
        }
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

export default AddPhotoForm;
