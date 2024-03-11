import { configureStore } from '@reduxjs/toolkit'
import petriReducer from './petriSlice'
import EditReducer from './EditSlice'

export const Store = configureStore({
    reducer: {
        controls: EditReducer,
        petri: petriReducer
    },
});
