import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Avatar,
  Typography,
  Card,
  CardContent,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import useIsLargeView from "../utils/useIsLarge";
import { addUser,removeUser } from "../ReduxSlice/UserSelectedSlice";

export default function UserSelectedCart() {
  const dispatch=useDispatch()
  const users = useSelector((store) => store.userSelected.UserSelected);
//   const alreadyClickedUser=useSelector((store)=>store.userSelected.alreadyClickedUser)
// console.log(alreadyClickedUser);
console.log(users.selectedItems);
  const [selectedUsers,setSelectedUsers]=useState([])
  const [removeSelectedUser,setRemoveSelectedUser]=useState({})

  useEffect(()=>{
    setSelectedUsers(users.selectedItems)
  },[users])
  
  const handleCheckbox=(e,selectedUser)=>{
    const {name,checked}=e.target
    setRemoveSelectedUser({...removeSelectedUser,[name]:checked})

    if(!checked){
      dispatch(addUser({selectedUser}))
    }else{
      dispatch(removeUser({selectedUser}))
    }
  }

  const FilterBtn = styled(Fab)`
  box-shadow: none;
  background: transparent;
  outline: 1px solid;
  font-size: 0.7rem;
  height: 28px;
`;

  const isLarge=useIsLargeView()

  return (
    <>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: !isLarge ? "center" : "space-around",
            marginBottom: !isLarge ? "2rem" : "",
          }}
        >
          {selectedUsers?.map((item, index) => {
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
                          background: removeSelectedUser[`${item.first_name + index}`]
                            ? "red"
                            : "none",
                        }}
                      >
                        <label
                          htmlFor={`${item.first_name + index}`}
                          style={{
                            color: removeSelectedUser[`${item.first_name + index}`]
                              ? "#fff"
                              : "black",
                          }}
                        >
                          Remove User
                          <input
                            type="checkbox"
                            name={`${item.first_name + index}`}
                            id={`${item.first_name + index}`}
                            style={{
                              visibility: "hidden",
                              position: "absolute",
                            }}
                            onChange={(e) => handleCheckbox(e, item)}
                            checked={removeSelectedUser[`${item.first_name + index}`]}
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
      </Box>
    </>
  );
}
