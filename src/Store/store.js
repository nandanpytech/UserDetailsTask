import {configureStore} from '@reduxjs/toolkit'
import FilterSlice from '../ReduxSlice/FilterSlice'
import StoreFilterData from '../ReduxSlice/StoreFilterData'
import UserSelectedSlice from '../ReduxSlice/UserSelectedSlice'
const store=configureStore(
    {
        reducer:{
            filter:FilterSlice,
            storefilter:StoreFilterData,
            userSelected:UserSelectedSlice
        }
    }
)

export default store