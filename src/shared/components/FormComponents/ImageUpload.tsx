import { FunctionComponent, useRef, useState, ChangeEvent } from 'react';
import { Button, FormHelperText } from '@mui/material';

interface ImageUploadProps {
  type: string;
  id: string;
  name: string;
  error: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

const ImageUpload: FunctionComponent<ImageUploadProps> = ({
  id,
  name,
  error,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState('');

  const pickImageHandler = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (fileInputRef.current) {
      console.log(fileInputRef.current.files);
      const fileName = fileInputRef.current.files?.item(0)?.name;
      if (fileName) {
        setUploadedFile(fileName);
      }

      onChange(e);
    }
  };

  const buttonColor = () => {
    if (uploadedFile) return 'success';
    if (error) return 'error';
    return 'primary';
  };

  return (
    <div>
      <input
        id={id}
        name={name}
        type="file"
        style={{ display: 'none' }}
        accept=".jpeg, .png, .jpg"
        onChange={uploadFileHandler}
        ref={fileInputRef}
      />
      <Button
        sx={{ marginTop: '20px' }}
        color={buttonColor()}
        variant="outlined"
        type="button"
        onClick={pickImageHandler}
      >
        {uploadedFile ? uploadedFile : 'Add Image'}
      </Button>
      {error && (
        <FormHelperText sx={{ marginLeft: '15px' }} error>
          Must select an image.
        </FormHelperText>
      )}
    </div>
  );
};

export default ImageUpload;
