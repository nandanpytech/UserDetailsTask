import {configureStore} from '@reduxjs/toolkit'
import FilterSlice from '../ReduxSlice/FilterSlice'
import StoreFilterData from '../ReduxSlice/StoreFilterData'
const store=configureStore(
    {
        reducer:{
            filter:FilterSlice,
            storefilter:StoreFilterData
        }
    }
)

export default store