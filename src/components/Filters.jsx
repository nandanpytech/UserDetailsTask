import {
  Box,
  Divider,
  Stack,
  Typography,
  Fab,
  styled,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useIsLargeView from "../utils/useIsLarge";
import { profileData } from "../utils/userData";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch,useSelector } from 'react-redux';
import { addFilters } from '../ReduxSlice/FilterSlice';

export default function Filters({ setFiltersOpen }) {
  const CheckedItems=useSelector(store=>store.filter.CheckedFilter)

  const [btnState,setBtnState]=useState({})

  const dispatch=useDispatch()

  const FilterBtn = styled(Fab)`
    box-shadow: none;
    background: transparent;
    outline: 1px solid;
    height: 28px;
  `;

  useEffect(()=>{
    setBtnState(CheckedItems)
  },[CheckedItems])

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedfilter=Object.fromEntries(formData.entries())
    dispatch(addFilters({selectedfilter}))
    setFiltersOpen(false)

  };

  const handleCheckbox=(event)=>{
    const {name,checked}=event.target
    setBtnState({...btnState,[name]:checked})
  } 

  const isLarge = useIsLargeView();
  return (
    <>
      <Box
        style={{
          padding: isLarge ? "1rem" : ".5rem",
          width: isLarge ? "450px" : "100%",
        }}
      >
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={700}>
            Filters BY:{" "}
          </Typography>
          <CloseIcon
            onClick={() => setFiltersOpen(false)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Divider sx={{ marginBottom: "16px" }} />

        <form onSubmit={handleSubmit}>
          {/* It shows the gender filters?  */}
          <Stack display="flex" spacing={1} mb={4}>
            <Typography variant="subtitle2" fontWeight={700}>
              Gender
            </Typography>
            <Box
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {[...new Set(profileData.map((d) => d.gender))]?.map((item) => {
                return (
                  <FilterBtn variant="extended" style={{ backgroundColor: btnState[`gender+${item}`] ? "green" : "none" }}>
                    <label htmlFor={`gender${item}`}  style={{ color: btnState[`gender+${item}`] ? "#fff" : "black" }}>
                      {item}
                      <input
                        type="checkbox"
                        id={`gender${item}`}
                        name={`gender+${item}`}
                        style={{ visibility: "hidden", position: "absolute" }}  
                        checked={btnState[`gender+${item}`]}
                        onChange={handleCheckbox}
                      />
                    </label>
                  </FilterBtn>
                );
              })}
            </Box>
          </Stack>

          {/* It shows the Availability filters?  */}
          <Stack display="flex" spacing={1} mb={4}>
            <Typography variant="subtitle2" fontWeight={700}>
              Availability
            </Typography>
            <Box
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {["Yes", "No"]?.map((item) => {
                return (
                  <FilterBtn variant="extended" style={{ backgroundColor: btnState[`availability+${item}`] ? "green" : "none" }}>
                    <label htmlFor={`availability${item}`} style={{ color: btnState[`availability+${item}`] ? "#fff" : "black" }}>
                      {item}
                      <input
                        type="checkbox"
                        name={`availability+${item}`}
                        id={`availability${item}`}
                        style={{ visibility: "hidden", position: "absolute" }}
                        onChange={handleCheckbox}
                        checked={btnState[`availability+${item}`]}
                      />
                    </label>
                  </FilterBtn>
                );
              })}
            </Box>
          </Stack>

          {/* It shows the Domain filters?  */}
          <Stack display="flex" spacing={1} mb={4}>
            <Typography variant="subtitle2" fontWeight={700}>
              Domain
            </Typography>
            <Box
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {[...new Set(profileData.map((d) => d.domain))]?.map((item) => {
                return (
                  <FilterBtn variant="extended"   style={{ backgroundColor: btnState[`domain+${item}`] ? "green" : "none" }}>
                    <label htmlFor={`domain${item}`}  style={{ color: btnState[`domain+${item}`] ? "#fff" : "black" }}>
                      {item}
                      <input
                        type="checkbox"
                        name={`domain+${item}`}
                        id={`domain${item}`}
                        style={{ visibility: "hidden", position: "absolute" }}
                        onChange={handleCheckbox}
                        checked={btnState[`domain+${item}`]}
                      />
                    </label>
                  </FilterBtn>
                );
              })}
            </Box>
          </Stack>

          <Divider />
          <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setFiltersOpen(false)}
              variant="outlined"
              sx={{ borderRadius: "25px !important" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              sx={{ borderRadius: "25px !important" }}
            >
              Show Result
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
