import { createSlice } from '@reduxjs/toolkit';

const initialState: IMessage = {
    title: '',
    content: '',
    type: '',
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        alertMessage(state, { payload }: { payload: IMessage }) {
            state.title = payload.title;
            state.content = payload.content;
            state.type = payload.type;
        },
        deleteMessage(state) {
            state.title = initialState.title;
            state.content = initialState.content;
            state.type = initialState.type;
        },
    },
});

const { actions, reducer } = messageSlice;

export const { alertMessage, deleteMessage } = actions;

export default reducer;
