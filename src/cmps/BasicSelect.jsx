import * as React from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({field, props ,value, handleChange }) {
  console.log(props);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="in-stock-select-label">{field}: </InputLabel>
        <Select
          labelId="in-stock-select-label"
          id="in-stock-select"
          value={value}
          // label="In Stock:"
          onChange={handleChange}
          name={field}
        >

          {props.map(prop => {
            console.log(prop.value);
              return <MenuItem value={prop.value}>{prop.display}</MenuItem>
          })}
          {/* <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  )
}
