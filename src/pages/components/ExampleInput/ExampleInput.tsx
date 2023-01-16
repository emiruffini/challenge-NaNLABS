import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';

import exampleImages from '../../../assets/images.json';
import { setSelectedImage, setLoading } from '../../../store/selector/selectorSlice';
import { RootState } from '../../../store/store';

function ExampleInput() {
  const image = useSelector((state: RootState) => state.selector.selectedImage);

  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setLoading());
    const image: { name: string; url: string } | undefined = exampleImages.find(
      (img) => img.name === event.target.value
    );
    if (image) {
      dispatch(setSelectedImage(image));
    }
    setTimeout(() => {
      dispatch(setLoading());
    }, 3500);
  };

  return (
    <Box
      sx={{ maxWidth: 300 }}
      width="100%"
      display="flex"
      gap={3}
      justifyContent="center"
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Example image</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={image.name}
          label="Example image"
          onChange={handleChange}
        >
          {exampleImages.map((image: { name: string; url: string }) => (
            <MenuItem key={image.name} value={image.name}>
              {image.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ExampleInput;
