import { createSlice } from "@reduxjs/toolkit";


const filterslice=createSlice({
    name:"Filters",
    initialState:{
        FilterData:{
            gender:[],
            domain:[],
            availability:[]
        },
        CheckedFilter:{}
    },
    reducers:{
        addFilters:(state,action)=>{
            const {selectedfilter}=action.payload
            for (let key in state.FilterData){
                state.FilterData[key]=[]
            }
            for(let key in selectedfilter){
                const category=key.slice(0,key.indexOf('+'))
                const value=key.slice(key.indexOf('+')+1 , key.length)
                if(!state.FilterData[category].includes(value)){
                    state.FilterData[category]=[
                        ...new Set(state.FilterData[category]),
                        value
                    ]
                }
               
            }

            state.CheckedFilter=selectedfilter

        },
        getFilters:(state)=>{
            return state
        },
    }
})




export default filterslice.reducer
export const {addFilters,getFilters}=filterslice.actions