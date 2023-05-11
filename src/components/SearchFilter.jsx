import { Stack, TextField, Box, Fab, styled } from "@mui/material";
import React from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import useIsLargeView from "../utils/useIsLarge";


// This component taking props from the Home.jsx component 

export default function SearchFilter({ handleSerchInput, searchUser }) {
  const FilterBtn = styled(Fab)`
    box-shadow: none;
    background: transparent;
    outline: 1px solid;
    height: 40px;
  `;
  const isLarge=useIsLargeView()
  return (
    <>
      <Stack p={2} display="flex" direction="row" justifyContent="space-between">
        <Box
          sx={{
            width:isLarge?400:150,
            maxWidth: "100%",
          }}
        >
          <TextField
            onChange={(e) => handleSerchInput(e)}
            fullWidth
            value={searchUser}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
          />
        </Box>

        <Box>
          <FilterBtn variant="extended">
            <FilterAltOutlinedIcon/>
            Filters
          </FilterBtn>
        </Box>
      </Stack>
    </>
  );
}
