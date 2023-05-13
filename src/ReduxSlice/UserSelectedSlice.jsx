import { createSlice } from "@reduxjs/toolkit";


const userSelect=createSlice({
    name:"Filters",
    initialState:{
        UserSelected:{
           selectedItems:[]
        },
        error:null,
        alreadyClickedUser:{}
    },
    reducers:{
        addUser:(state,action)=>{
            const {selectedUser,userSelected}=action.payload
            const existingUser = state.UserSelected.selectedItems.find((ele) => ele.first_name === selectedUser.first_name);
            const uniquedomain=state.UserSelected.selectedItems.find((ele) => ele.domain === selectedUser.domain);
            if(!uniquedomain){
                if(existingUser===undefined){
                    state.UserSelected.selectedItems.push(selectedUser)
                }
                state.alreadyClickedUser=userSelected
            }else{
                state.error="Unique Domain should be selected"
            }
           

        },
        removeUser:(state,action)=>{
            const {selectedUser,userSelected}=action.payload
            state.UserSelected.selectedItems=state.UserSelected.selectedItems.filter((item)=>{
                return item.first_name!==selectedUser.first_name
            })
            state.alreadyClickedUser=userSelected

        },
        clearError: (state) => {
            state.error = null;
          },
    }
})




export default userSelect.reducer
export const {addUser,removeUser,clearError}=userSelect.actions