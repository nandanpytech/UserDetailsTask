import { Box, Divider, Stack, Typography, Fab, styled } from "@mui/material";
import React, { useState } from "react";
import useIsLargeView from "../utils/useIsLarge";
import { profileData } from "../utils/userData";

// use a Set to store the unique values of the "gender" field
const uniqueGenders = new Set(profileData.map((d) => d.gender));
const uniqueGendersArr = Array.from(uniqueGenders);

// use a Set to store the unique values of the "domain" field
const uniqueDomains = new Set(profileData.map((d) => d.domain));
const uniqueDomainsArr = Array.from(uniqueDomains);

export default function Filters() {
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
  const isLarge = useIsLargeView();
  return (
    <>
      <Box
        style={{
          padding: isLarge ? "1rem" : ".5rem",
          width: isLarge ? "450px" : "100%",
        }}
      >
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight={700}>
            Filters BY:{" "}
          </Typography>
          <Divider />
        </Box>

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
            {uniqueGendersArr?.map((item) => {
              return (
                <FilterBtn
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  variant="extended"
                >
                  {item}
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
            <FilterBtn
              onClick={() => setFiltersOpen(!filtersOpen)}
              variant="extended"
            >
              Yes
            </FilterBtn>

            <FilterBtn
              onClick={() => setFiltersOpen(!filtersOpen)}
              variant="extended"
            >
              No
            </FilterBtn>
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
            {uniqueDomainsArr?.map((item) => {
              return (
                <FilterBtn
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  variant="extended"
                >
                  {item}
                </FilterBtn>
              );
            })}
          </Box>
        </Stack>
      </Box>
    </>
  );
}
