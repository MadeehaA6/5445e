import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  previewURL: {
    aspectRatio: 1,
    objectFit: 'cover ',
    maxWidth: '100px',
  },
}));

function ImageDialog(props) {
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const addImages = (e) => {
    setSelectedImages([...e.target.files]);
    // create URLs for the previewing the images
    const URLs = [];
    for (let i = 0; i < e.target.files.length; i++) {
      URLs.push(URL.createObjectURL(e.target.files[i]));
    }
    setPreviewURLs(URLs);
  };

  const handleSubmit = () => {
    props.handleClickToggle(); // close the dialog
    props.onSubmit(selectedImages); // send the images to the parent
    setSelectedImages([]); // clear the selected images
    setPreviewURLs([]); // clear the preview URLs
  };

  return (
    <Dialog open={props.open} onClose={props.handleClickToggle}>
      {/* Cancel adding images  */}
      <DialogActions>
        <Button onClick={props.handleClickToggle}>Cancel</Button>
      </DialogActions>

      {/* Add images */}
      <DialogActions>
        <Box align='center' m={2}>
          <Button variant='contained' component='label'>
            Click to select all the images you want to send
            <input
              multiple
              accept='image/*'
              type='file'
              hidden
              onChange={addImages}
            />
          </Button>
        </Box>
      </DialogActions>

      {/*  Preview images  */}
      <DialogContent>
        <Box>
          {previewURLs.map((url) => {
            return (
              <img
                className={classes.previewURL}
                src={url}
                alt={url}
                key={url}
              />
            );
          })}
        </Box>
      </DialogContent>

      {/* Done adding images  */}
      <DialogActions>
        <Box m={2}>
          <Button color='primary' onClick={handleSubmit} variant='contained'>
            <Box p={1} px={4}>
              Done
            </Box>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ImageDialog;
