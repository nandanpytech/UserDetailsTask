import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Avatar,
  Typography,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import { profileData } from "../utils/userData";
import useIsLargeView from "../utils/useIsLarge";

export default function Home() {
  const [page, setPage] = useState(1);
  
  const handlePageChange = (event, value) => {
    setPage(value);
  }
  console.log(page);
  const isLarge = useIsLargeView();
  return (
    <>
      <Box mt={4} sx={{ background: "" }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: !isLarge ? "center" : "space-around" }}
        >
          {profileData.slice(page*20-20, page*20)?.map((item, index) => {
            return (
              <Grid item>
                <Card style={{ minWidth: !isLarge ? "328px" : "300px" }}>
                  <CardContent>
                    <Stack display="flex" direction="row" spacing={5}>
                      <Box
                        display="flex"
                        alignItems="start"
                        justifyContent="center"
                      >
                        <Avatar
                          src={item?.avatar}
                          sx={{ height: "100px", width: "100px" }}
                          variant="square"
                          alt=""
                        ></Avatar>
                      </Box>

                      <Stack
                        display="flex"
                        spacing={1}
                        sx={{ marginLeft: "5px !important" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography variant="body2" fontWeight="600">
                            Name:
                          </Typography>
                          <Typography variant="body2">
                            {item?.first_name} {item?.last_name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography variant="body2" fontWeight="600">
                            Gender:
                          </Typography>
                          <Typography variant="body1">
                            {item?.gender}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography variant="body2" fontWeight="600">
                            Available:
                          </Typography>
                          <Typography variant="body1">
                            {item?.available ? "Yes" : "No"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography variant="body2" fontWeight="600">
                            Domain:
                          </Typography>
                          <Typography variant="body1">
                            {item?.domain}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Pagination
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          page={page}
          onChange={handlePageChange}
          count={1000}
          size={isLarge ? "large" : "medium"}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
}
