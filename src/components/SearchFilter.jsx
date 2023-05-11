import { Stack, TextField, Box, Fab, styled, Drawer, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import useIsLargeView from "../utils/useIsLarge";
import Filters from "./Filters";


// This component taking props from the Home.jsx component 

export default function SearchFilter({ handleSerchInput, searchUser }) {
    const [filtersOpen,setFiltersOpen]=useState(false)
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
          <FilterBtn onClick={()=>setFiltersOpen(!filtersOpen)} variant="extended">
            <FilterAltOutlinedIcon/>
            Filters
          </FilterBtn>
        </Box>
      </Stack>

    {
        isLarge?
        <Drawer anchor="right" open={filtersOpen} onClose={()=>setFiltersOpen(!filtersOpen)} >
            <Filters/>
        </Drawer>
        :
        <SwipeableDrawer anchor="bottom" open={filtersOpen} onClose={()=>setFiltersOpen(!filtersOpen)}>
            <Filters/>
        </SwipeableDrawer>
    }
    </>
  );
}
