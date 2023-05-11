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
import React, { useState } from "react";
import useIsLargeView from "../utils/useIsLarge";
import { profileData } from "../utils/userData";
import CloseIcon from "@mui/icons-material/Close";

export default function Filters({ setFiltersOpen }) {
  const [fitersValue, setFiltersValue] = useState({
    gender: [],
    domain: [],
    availability: [],
  });

  const FilterBtn = styled(Fab)`
    box-shadow: none;
    background: transparent;
    outline: 1px solid;
    height: 28px;
  `;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData.entries()));
  };

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
                  <FilterBtn variant="extended">
                    <label htmlFor={`gender${item}`}>
                      {item}
                      <input
                        type="checkbox"
                        id={`gender${item}`}
                        name={`${item}`}
                        style={{ visibility: "hidden", position: "absolute" }}
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
                  <FilterBtn variant="extended">
                    <label htmlFor={`availability${item}`}>
                      {item}
                      <input
                        type="checkbox"
                        name={`${item}`}
                        id={`availability${item}`}
                        style={{ visibility: "hidden", position: "absolute" }}
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
                  <FilterBtn variant="extended">
                    <label htmlFor={`domain${item}`}>
                      {item}
                      <input
                        type="checkbox"
                        name={`${item}`}
                        id={`domain${item}`}
                        style={{ visibility: "hidden", position: "absolute" }}
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
