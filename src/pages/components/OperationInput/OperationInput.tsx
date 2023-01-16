import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  Paper,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import operations from '../../../assets/parameters.json';
import { setImageChanges } from '../../../store/images/imagesSlice';
import { setLoading } from '../../../store/selector/selectorSlice';

type ObjectKey = keyof typeof operations.parameters;
type Range = {
  min?: number;
  max?: number;
};

function OperationInput() {
  const dispatch = useDispatch();
  const [parameterName, setParameterName] = useState('');
  const [parameterValue, setParameterValue] = useState('');
  const [fullParameter, setFullParameter] = useState<any>({ name: '' });

  useEffect(() => {
    const key = parameterName as ObjectKey;
    setFullParameter({ name: parameterName, ...operations.parameters[key] });
  }, [parameterName]);

  const rangeFactory = (range: Range) => {
    if (!range) return '';
    if (range.hasOwnProperty('min') && !range.hasOwnProperty('max'))
      return `> ${range.min}`;
    if (!range.hasOwnProperty('min') && range.hasOwnProperty('max'))
      return `< ${range.max}`;
    return `${range.min} to ${range.max}`;
  };

  const listFactory = (expect: any) => {
    const valuesToReturn: any = [];
    Object.entries<any[]>(expect).forEach((e) => {
      //plus operator used for parse a string into a number
      if (!isNaN(+e[0])) {
        if (e[1].length === 1) {
          const commaSeparatedValue = e[1][0];
          if (
            commaSeparatedValue.type === 'integer' ||
            commaSeparatedValue.type === 'number'
          ) {
            valuesToReturn.push(
              `${commaSeparatedValue.type} (${rangeFactory(
                commaSeparatedValue.strict_range || commaSeparatedValue.suggested_range
              )})`
            );
          } else {
            valuesToReturn.push(commaSeparatedValue.type);
          }
        }
        if (e[1].length > 1) {
          const positionValues = e[1].map((positionValue) => {
            if (positionValue.type === 'integer' || positionValue.type === 'number') {
              return `${positionValue.type} (${rangeFactory(
                positionValue.strict_range || positionValue.suggested_range
              )})`;
            }
            return `${positionValue.type}`;
          });
          valuesToReturn.push(positionValues.join(' or '));
        }
      }
    });
    return valuesToReturn.join(', ');
  };

  const handleApplyChanges = () => {
    dispatch(setLoading());
    dispatch(setImageChanges({ parameterName, parameterValue }));
    setTimeout(() => {
      dispatch(setLoading());
    }, 3500);
  };

  const EmptyCell = () => <TableCell align="right">-</TableCell>;

  return (
    <>
      <Box
        justifyContent="left"
        gap={3}
        display="flex"
        flexDirection="row"
        sx={{ maxWidth: '100%' }}
        my={3}
      >
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel id="demo-simple-select-label-1">Select an operation</InputLabel>
          <Tooltip
            disableHoverListener={!fullParameter.short_description}
            title={fullParameter.short_description}
          >
            <Select
              labelId="demo-simple-select-label-1"
              id="demo-simple-select-1"
              value={parameterName}
              label="Select an operation"
              onChange={(event) => {
                setFullParameter({ name: '' });
                setParameterName(event.target.value);
              }}
            >
              {Object.entries(operations.parameters).map((oParameter: any[]) => (
                <MenuItem key={oParameter[0]} value={oParameter[0]}>
                  {oParameter[0]}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </FormControl>
        <TextField
          onChange={(event) => setParameterValue(event.target.value)}
          fullWidth
          sx={{ maxWidth: 300 }}
          label="Allowed values ​​in the table below"
        />
        <Button
          disabled={parameterName === '' || parameterValue === ''}
          onClick={handleApplyChanges}
        >
          Apply changes
        </Button>
      </Box>
      {fullParameter.name !== '' && (
        <TableContainer component={Paper} sx={{ overflow: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <caption>Each row of the table indicates an enterable value</caption>
            <TableHead>
              <TableRow>
                <TableCell>Data&nbsp;type</TableCell>
                <TableCell align="right">Suggested&nbsp;range</TableCell>
                <TableCell align="right">Required&nbsp;range</TableCell>
                <TableCell align="right">Possible&nbsp;values</TableCell>
                <TableCell align="right">
                  Comma&nbsp;separated&nbsp;allowed&nbsp;values
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="You need to apply the dependencies first">
                    <p>Depends</p>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Default value applied">
                    <p>Default</p>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fullParameter.expects.map((expect: any, idx: number) => {
                return (
                  <TableRow key={fullParameter.name}>
                    <TableCell>{expect.type}</TableCell>
                    {expect.suggested_range ? (
                      <TableCell align="right">
                        {rangeFactory(expect.suggested_range)}
                      </TableCell>
                    ) : (
                      <EmptyCell />
                    )}
                    {expect.strict_range ? (
                      <TableCell align="right">
                        {rangeFactory(expect.strict_range)}
                      </TableCell>
                    ) : (
                      <EmptyCell />
                    )}
                    {expect.possible_values ? (
                      <TableCell align="right">
                        {expect.possible_values.join(', ')}
                      </TableCell>
                    ) : (
                      <EmptyCell />
                    )}
                    {expect.length > 0 ? (
                      <TableCell align="right">{listFactory(expect)}</TableCell>
                    ) : (
                      <EmptyCell />
                    )}
                    {fullParameter.depends && fullParameter.depends.length > 0 ? (
                      <TableCell align="right">
                        {fullParameter.depends.join(', ')}
                      </TableCell>
                    ) : (
                      <EmptyCell />
                    )}
                    {fullParameter.default ? (
                      <TableCell align="right">{fullParameter.default}</TableCell>
                    ) : (
                      <EmptyCell />
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default OperationInput;
