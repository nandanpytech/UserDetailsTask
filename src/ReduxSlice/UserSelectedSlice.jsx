import { createSlice } from "@reduxjs/toolkit";


const userSelect=createSlice({
    name:"Filters",
    initialState:{
        UserSelected:{
           selectedItems:[]
        },
        alreadyClickedUser:{}
    },
    reducers:{
        addUser:(state,action)=>{
            const {selectedUser}=action.payload
            const existingUser = state.UserSelected.selectedItems.find((ele) => ele.first_name === selectedUser.first_name);
            if(existingUser===undefined){
                state.UserSelected.selectedItems.push(selectedUser)
            }

        },
        removeUser:(state,action)=>{
            const {selectedUser}=action.payload
            state.UserSelected.selectedItems=state.UserSelected.selectedItems.filter((item)=>{
                return item.first_name!==selectedUser.first_name
            })

           
        }
    }
})




export default userSelect.reducer
export const {addUser,removeUser}=userSelect.actions