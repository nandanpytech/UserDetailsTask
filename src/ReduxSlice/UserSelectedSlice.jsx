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
            const {selectedUser,userSelected}=action.payload
            const existingUser = state.UserSelected.selectedItems.find((ele) => ele.first_name === selectedUser.first_name);
            
            if(existingUser===undefined){
                state.UserSelected.selectedItems.push(selectedUser)
            }
            state.alreadyClickedUser=userSelected

        },
        removeUser:(state,action)=>{
            const {selectedUser,userSelected}=action.payload
            state.UserSelected.selectedItems=state.UserSelected.selectedItems.filter((item)=>{
                return item.first_name!==selectedUser.first_name
            })
            state.alreadyClickedUser=userSelected


           
        }
    }
})




export default userSelect.reducer
export const {addUser,removeUser,pushedIntoSlected}=userSelect.actions