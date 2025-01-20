import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem('pastes')
        ? JSON.parse(localStorage.getItem('pastes'))
        : []
}

export const pasteSlice = createSlice({
    name: 'pastes',
    initialState,
    reducers: {
        addToPastes: (state, action) => {

            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem('pastes', JSON.stringify(state.pastes))
            toast("Data added Successfully...")

        },
        updateToPastes: (state, action) => {

            const paste = action.payload;
            const index = state.pastes.findIndex((item => item._id === paste._id))

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem('pastes', JSON.stringify(state.pastes))
                toast.success("paste Updated...")
            }


        },
        resetAllPastes: (state, action) => {
            state.pastes = []
            localStorage.removeItem("pastes")

        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload; // Expect ID
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1); // Remove the paste
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste Deleted...");
            } else {
                toast.error("Paste not found!"); // Handle unexpected errors
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer