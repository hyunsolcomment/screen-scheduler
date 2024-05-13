import {createSlice,PayloadAction} from '@reduxjs/toolkit';

export const TestSlice = createSlice({
    name: 'test',
    initialState: {
        content: "Hello World!"
    },
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.content = action.payload;
        }
    }
})

export const TestReducer = TestSlice.reducer;