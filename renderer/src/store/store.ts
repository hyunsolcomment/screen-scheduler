import { TestReducer } from './test-slice';
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        TestReducer: TestReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;