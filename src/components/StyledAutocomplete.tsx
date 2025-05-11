import React from 'react';
import { AutocompleteProps, SxProps, IconButton } from '@mui/material';
import { StyledAutocomplete } from './CommonComponents.styles';
import CancelIcon from '@mui/icons-material/Cancel';

interface StyledAutocompleteProps<T> extends AutocompleteProps<T, false, false, false> {
  sx?: SxProps;
  onDeleteOption?: (option: T) => void;
  onChange: (option: unknown) => void;
}

const CustomAutocomplete = <T,>({
  options,
  renderInput,
  sx,
  disablePortal,
  onChange,
  //onDeleteOption,
}: StyledAutocompleteProps<T>) => {
  return (
    <StyledAutocomplete
      options={options}
      disablePortal={disablePortal}
      renderInput={renderInput}
      sx={sx}
      renderOption={(_, option) => (
        <li 
          onClick={() => {
            onChange(option)
          }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '0 16px'
          }}>
            {option as React.ReactNode}
            <IconButton
                edge="end"
                onClick={() => {
                    console.log(option)
                }}
            >
              <CancelIcon style={{ color: '#d4d4d4' }} />
            </IconButton>
        </li>
      )}
    />
  );
};

export default CustomAutocomplete; 