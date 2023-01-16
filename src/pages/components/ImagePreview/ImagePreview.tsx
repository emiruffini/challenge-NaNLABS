import React from 'react';
import { Box, Link, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import Typography from '@mui/material/Typography';

interface ImagePreviewProps {
  imageURL: string;
  includesPalette: boolean;
}

function ImagePreview(props: ImagePreviewProps) {
  const { entitiesAreLoading } = useSelector((state: RootState) => state.selector);
  if (entitiesAreLoading) {
    return (
      <Box
        display="flex"
        minHeight={400}
        marginX="auto"
        mb={5}
        maxWidth={600}
        maxHeight={600}
        sx={{ boxShadow: 3 }}
      >
        <Skeleton height={400} width={600} animation="wave" variant="rectangular" />
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      marginX="auto"
      mb={5}
      minHeight={400}
      maxWidth={600}
      maxHeight={600}
      sx={{ boxShadow: 3 }}
    >
      {props.imageURL === '' ? (
        <img
          style={{ maxWidth: '100%', objectFit: 'contain' }}
          src="/empty.png"
          alt="selectedIMG"
        />
      ) : !props.includesPalette ? (
        <img
          style={{
            height: 'auto',
            maxWidth: '100%',
            objectFit: 'fill',
            objectPosition: 'top',
          }}
          src={props.imageURL}
          alt="selectedIMG"
        />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <Typography color="primary">
            Press{' '}
            <Link href={props.imageURL} target="_blank" rel="noopener">
              download
            </Link>{' '}
            to see the palette
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ImagePreview;
