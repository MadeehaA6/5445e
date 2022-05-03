import React, { useState } from 'react';
import { FormControl, Button, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContentCopy from '../../assets/ContentCopy.svg';
import ImageDialog from './ImageDialog';
import axios from 'axios';
const instance = axios.create();

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    width: '100%',
    display: 'flex',
  },
  formField: {
    flex: 1,
    backgroundColor: theme.palette.background.main,
    borderRadius: 8,
  },
  photoAdded: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Input = ({ otherUser, conversationId, user, postMessage }) => {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDialogToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedImages = (images) => {
    setSelectedImages(images);
  };

  const uploadImages = (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);

    return instance.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.

    const promises = selectedImages.map((image) => uploadImages(image)); // returns an array of promises

    const uploadedImages = await Promise.all(promises) // returns an array with the promise resolved
      .then((res) => {
        return res.map((res) => res.data.secure_url); // from the array of resolved promises return the secure url
      });

    const reqBody = {
      text: formElements.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: uploadedImages,
    };

    await postMessage(reqBody);
    setText('');
    setSelectedImages([]);
  };

  return (
    <>
      <ImageDialog
        open={isOpen}
        handleClickToggle={handleDialogToggle}
        onSubmit={handleSelectedImages}
      />

      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            className={classes.formField}
            disableUnderline
            placeholder='Type something and add an image...'
            type='text'
            name='text'
            value={text}
            onChange={handleTextChange}
          />
        </FormControl>

        <Button
          className={
            selectedImages.length > 0 ? classes.photoAdded : classes.formField
          }
          onClick={handleDialogToggle}
        >
          <img width='25px' height='25px' src={ContentCopy} alt='addPhoto' />
        </Button>
      </form>
    </>
  );
};

export default Input;
