import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        ISBN: "ISBN",
        author: "Author",
        pages: "Pages",
        title: "Title",
        type: "Type",
    },
    reducers: {
        chooseISBN: (state, action) => { state.ISBN = action.payload },
        chooseAuthor: (state, action) => { state.author = action.payload },
        choosePages: (state, action) => { state.pages = action.payload },
        chooseTitle: (state, action) => { state.title = action.payload },
        chooseType: (state, action) => { state.type = action.payload },
    }
})

export const reducer = rootSlice.reducer
export const { chooseISBN, chooseAuthor, choosePages, chooseTitle, chooseType } = rootSlice.actions