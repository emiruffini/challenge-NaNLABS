import React, { useState } from 'react';
import { Box, Button, Link } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { useSelector, useDispatch } from 'react-redux';

import ImagePreview from '../ImagePreview/ImagePreview';
import { RootState } from '../../../store/store';
import ExampleInput from '../ExampleInput/ExampleInput';
import { resetSelectedImage } from '../../../store/selector/selectorSlice';
import { undoChange, redoChange } from '../../../store/images/imagesSlice';
import OperationInput from '../OperationInput/OperationInput';
import Chips from '../Chips/Chips';

function ImagesEditor() {
  const image = useSelector((state: RootState) => state.selector.selectedImage);
  const { changesHistory, positionInHistory } = useSelector(
    (state: RootState) => state.images
  );
  const dispatch = useDispatch();

  const [useExample, setUseExample] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  const handleImageToUse = (imageToUse: string) => {
    if (imageToUse === 'example') {
      setUseExample(true);
    } else {
      setUploadImage(true);
    }
  };

  const urlFactory: () => string = () => {
    if (changesHistory.length - 1 === positionInHistory && positionInHistory >= 0) {
      if (changesHistory.length > 1) {
        return `${image.url}?${changesHistory.join('&')}`;
      }
      if (changesHistory.length === 1) {
        return `${image.url}?${changesHistory.join('')}`;
      }
    }

    if (positionInHistory < changesHistory.length - 1 && positionInHistory >= 0) {
      const changesWithNewPosition = [...changesHistory];
      changesWithNewPosition.splice(positionInHistory + 1);
      return `${image.url}?${changesWithNewPosition.join('&')}`;
    }

    if (positionInHistory === -1) {
      return image.url;
    }

    return image.url;
  };

  return (
    <Box>
      <ImagePreview
        imageURL={urlFactory()}
        includesPalette={
          changesHistory.includes('palette=css') ||
          changesHistory.includes('palette=json')
        }
      />
      {!useExample && !uploadImage && (
        <Box my={1} width="100%" display="flex" gap={3} justifyContent="center">
          <Button onClick={() => handleImageToUse('example')}>Use an example</Button>
          <Button disabled onClick={() => handleImageToUse('upload')}>
            Upload an image
          </Button>
        </Box>
      )}
      {useExample && (
        <Box width="100%" display="flex" gap={3} justifyContent="center">
          <ExampleInput />
        </Box>
      )}
      {uploadImage && <h3> under construction </h3>}
      {image.url !== '' && (
        <>
          <Box
            justifyContent="center"
            gap={3}
            display="flex"
            flexDirection="row"
            sx={{ maxWidth: '100%' }}
            my={2}
          >
            <Button
              disabled={
                positionInHistory === -1 ||
                (positionInHistory === 0 && changesHistory.length === 0)
              }
              onClick={() => dispatch(undoChange())}
            >
              <UndoIcon sx={{ mr: 2 }} />
              Undo
            </Button>
            <Button
              disabled={positionInHistory === changesHistory.length - 1}
              onClick={() => dispatch(redoChange())}
            >
              <RedoIcon sx={{ mr: 2 }} />
              Redo
            </Button>
          </Box>
          {changesHistory.length > 0 && positionInHistory !== -1 && <Chips />}
          <OperationInput />
          <Box
            justifyContent="left"
            gap={3}
            display="flex"
            flexDirection="row"
            sx={{ maxWidth: '100%' }}
            my={2}
          >
            <Button
              onClick={() => {
                setUseExample(false);
                setUploadImage(false);
                dispatch(resetSelectedImage());
              }}
            >
              Reset
            </Button>
            <Link href={urlFactory()} underline="none" target="_blank" rel="noopener">
              <Button>Download</Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ImagesEditor;
