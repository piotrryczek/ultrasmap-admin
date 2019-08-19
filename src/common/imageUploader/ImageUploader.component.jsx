import React, { useState, useMemo } from 'react';

import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

function ImageUploader(props) {
  const [previewImage, setPreviewImage]= useState(null);

  const {
    fieldId,
    onChange,
  } = props;

  const reader = useMemo(() => {
    const readerInstance = new FileReader()

    readerInstance.addEventListener('load', function () {
      const { result } = reader;
  
      setPreviewImage(result);
    }, false);

    return readerInstance;
  }, []);

  const handleChange = async (event) => {
    const { files } = event.target;
    const [file] = files;
  
    if (file) {
      reader.readAsDataURL(file);
    }

    onChange(file);
  }

  return (
    <>
      {previewImage && (
        <img
          src={previewImage}
          alt=""
          height="100"
        />
      )}
      
      <FormLabel htmlFor={fieldId}>
        <Button variant="contained" color="primary" component="span">Upload</Button>
        <input
          type="file"
          accept="image/*"
          id={fieldId}
          onChange={handleChange}
        />
      </FormLabel>
    </>
  );
}

export default ImageUploader;
