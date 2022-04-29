import React, { useState } from 'react';
import { FormControl, IconButton, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '../../assets/AddAPhotoIcon.png';
import ImageDialog from './ImageDialog';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    width: '100%',
    display: 'flex',
  },
  input: {
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
  const instance = axios.create();

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
      'https://api.cloudinary.com/v1_1/madeehaa6/image/upload',
      formData
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.

    const attachmentsPromiseArray = selectedImages.map(async (image) => {
      const response = await uploadImages(image);
      return response.data.secure_url;
    });
    const attachments = await Promise.all(attachmentsPromiseArray);

    const reqBody = {
      text: formElements.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: attachments,
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
            className={classes.input}
            disableUnderline
            placeholder='Type something and add an image...'
            type='text'
            name='text'
            value={text}
            onChange={handleTextChange}
          />
        </FormControl>

        <IconButton
          p={2}
          className={
            selectedImages && selectedImages.length > 0
              ? classes.photoAdded
              : null
          }
          onClick={handleDialogToggle}
        >
          <img width='32px' height='32px' src={AddAPhotoIcon} alt='addPhoto' />
        </IconButton>
      </form>
    </>
  );
};

export default Input;
