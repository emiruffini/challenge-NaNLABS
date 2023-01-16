import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { deleteChange } from '../../../store/images/imagesSlice';

function Chips() {
  const { changesHistory, positionInHistory } = useSelector(
    (state: RootState) => state.images
  );
  const [changesToShow, setChangesToShow] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changesHistory.length - 1 === positionInHistory && positionInHistory >= 0) {
      setChangesToShow(changesHistory);
    } else if (positionInHistory < changesHistory.length - 1 && positionInHistory >= 0) {
      const changes = [...changesHistory];
      changes.splice(positionInHistory + 1);
      setChangesToShow(changes);
    }
  }, [changesHistory, positionInHistory]);

  return (
    <>
      <Typography color="primary" mb={2}>
        Changes applied
      </Typography>
      {changesToShow.map((change) => {
        const propertyName = change.split('=')[0];
        return (
          <Chip
            onDelete={() => dispatch(deleteChange(propertyName))}
            key={change}
            label={propertyName}
            sx={{ mr: 2, mb: 1 }}
          />
        );
      })}
    </>
  );
}

export default Chips;
