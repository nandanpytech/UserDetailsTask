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
  Fab,
  Snackbar,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { profileData } from "../utils/userData";
import useIsLargeView from "../utils/useIsLarge";
import SearchFilter from "./SearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../ReduxSlice/StoreFilterData";
import { addUser, removeUser } from "../ReduxSlice/UserSelectedSlice";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPagination-ul": {
    background: "#e5e5e5",
    padding: ".5rem !important",
  },
  "& .MuiPaginationItem-root": {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Home({ showCart }) {
  const StoreFilterItems = useSelector((store) => store.storefilter.storeItems);
  const FiltersApplied = useSelector((store) => store.filter.FilterData);
  const alreadyClickedUser = useSelector(
    (store) => store.userSelected.alreadyClickedUser
  );

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [filterApply, setFilterApply] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [userSelected, setUserSelected] = useState({});
  const [showToast,setShowToast]=useState(false)
  const [btnState, setBtnState] = useState({
    checkedUser: null,
    selectedUser: null,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  //It is usefult to search users
  const handleSerchInput = (event) => {
    setSearchUser(event.target.value);
    const filteredArr = StoreFilterItems.filter((item) => {
      const fullName = item?.first_name + " " + item?.last_name;
      return fullName.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilterApply(filteredArr);
  };

  // It helps to restore the stored filtered data from Redux store...
  useEffect(() => {
    setFilterApply(StoreFilterItems);
  }, [StoreFilterItems]);

  // It is necessary to filter the whole data depends upon selected filters and stored the data in Redux Store
  useEffect(() => {
    const filteredData = profileData.filter((data) => {
      const { gender, domain, availability } = FiltersApplied;

      if (gender.length > 0 && !gender.includes(data.gender)) {
        return false;
      }

      if (domain.length > 0 && !domain.includes(data.domain)) {
        return false;
      }

      if (
        availability.length > 0 &&
        !availability.includes(data.available ? "Yes" : "No")
      ) {
        return false;
      }

      return true;
    });

    dispatch(setFilter(filteredData));
  }, [FiltersApplied]);

  // It handle the selected users and stored in Redux store
  const handleCheckbox = (e, selectedUser) => {
    if (selectedUser.available) {
      const { name, checked } = e.target;
      setUserSelected({ ...userSelected, [name]: checked });
      setBtnState({
        ...btnState,
        checkedUser: checked,
        selectedUser: selectedUser,
      });
    } else {
      setShowToast(!showToast)
    }
  };

  useEffect(() => {
    if (btnState.checkedUser != null) {
      const selectedUser = btnState.selectedUser;
      if (btnState.checkedUser) {
      dispatch(addUser({ selectedUser, userSelected }));
      } else {
        dispatch(removeUser({ selectedUser, userSelected }));
      }
    }
  }, [userSelected]);


  //It helps to store the restore the SelectedUser from Redux store...
  useEffect(() => {
    setUserSelected(alreadyClickedUser || {});
  }, [showCart]);

  const FilterBtn = styled(Fab)`
    box-shadow: none;
    background: transparent;
    outline: 1px solid;
    font-size: 0.7rem;
    height: 28px;
  `;
  const isLarge = useIsLargeView();
  return (
    <>
      <SearchFilter
        handleSerchInput={handleSerchInput}
        searchUser={searchUser}
      />
      <Box mt={4} sx={{ background: "" }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: !isLarge ? "center" : "space-around",
            marginBottom: !isLarge ? "2rem" : "",
          }}
        >
          {filterApply.slice(page * 20 - 20, page * 20)?.map((item, index) => {
            return (
              <Grid item>
                <Card style={{ width: !isLarge ? "328px" : "350px" }}>
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

                    <Box pt={2} sx={{ display: "flex", justifyContent: "end" }}>
                      <FilterBtn
                        variant="extended"
                        style={{
                          background: userSelected[`${item.first_name + item.id}`]
                            ? "green"
                            : "none",
                          zIndex: 1,
                        }}
                      >
                        <label
                          htmlFor={`${item.first_name + item.id}`}
                          style={{
                            color: userSelected[`${item.first_name + item.id}`]
                              ? "#fff"
                              : "black",
                          }}
                        >
                          Select User
                          <input
                            type="checkbox"
                            name={`${item.first_name + item.id}`}
                            id={`${item.first_name + item.id}`}
                            style={{
                              visibility: "hidden",
                              position: "absolute",
                            }}
                            onChange={(e) => handleCheckbox(e, item)}
                            checked={userSelected[`${item.first_name + item.id}`]}
                          />
                        </label>
                      </FilterBtn>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <StyledPagination
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            zIndex: 1000,
          }}
          page={page}
          onChange={handlePageChange}
          count={Math.floor(filterApply.length / 20)}
          size={isLarge ? "large" : "medium"}
          variant="outlined"
          color="primary"
        />

        {showToast && (
          <Snackbar
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          open={showToast} autoHideDuration={6000} onClose={()=>setShowToast(!showToast)}>
            <Alert
              onClose={()=>setShowToast(!showToast)}
              severity="warning"
              sx={{ width: "100%" }}
            >
              User Not Available
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
}
