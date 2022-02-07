import { FunctionComponent, useContext, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import { FormProps } from '../../pages/Auth/components/LoginForm';
import AuthContext from '../../context/auth-ctx';
import ImageUpload from './FormComponents/ImageUpload';
import '../../pages/Auth/components/Form.css';

interface AddPhotoFormProps extends FormProps {
  closeModal(): void;
  addPhoto(newPhoto: {
    title: string;
    photoFile: any;
    description: string;
    user: string;
  }): void;
}

const validationSchema = yup.object().shape({
  photoTitle: yup
    .string()
    .min(5, 'Photo title must have a minimum name length of 5 characters.')
    .required('Photo title is required.'),
  photoDescription: yup
    .string()
    .min(10, 'Photo description must be a minimum of 10 characters.')
    .required('Photo Description is required.'),
  photoFile: yup
    .mixed()
    // .test('name', 'File must be uploaded', (value: any) => value.length > 0)
    .required('Photo is required'),
});

const AddPhotoForm: FunctionComponent<AddPhotoFormProps> = ({
  loading,
  toggleLoad,
  addPhoto,
  closeModal,
}) => {
  const { loginState } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      photoTitle: '',
      photoDescription: '',
      photoFile: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      toggleLoad();

      const newPhoto = {
        user: loginState.activeUser.id,
        title: values.photoTitle,
        description: values.photoDescription,
        photoFile: values.photoFile,
      };
      addPhoto(newPhoto);
      closeModal();
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

      <ImageUpload
        type="file"
        id="photoFile"
        name="photoFile"
        error={formik.touched.photoFile && Boolean(formik.errors.photoFile)}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files) {
            let myFile = Array.from(files)[0];
            formik.setFieldValue('photoFile', myFile);
          }
        }}
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
