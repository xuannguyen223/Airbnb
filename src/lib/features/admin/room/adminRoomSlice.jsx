import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrayRooms: [],
  selectedRoomInfo: {},
  isLoading: false,
  roomPagination: {
    total: 0,
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  },
};

const adminRoomSlice = createSlice({
  name: "adminRoomSlice",
  initialState,
  reducers: {
    handleArrRoom(state, action) {
      state.arrayRooms = action.payload;
    },
    handleDeleteRoom(state, action) {
      state.arrayRooms = state.arrayRooms.filter(
        (room) => room.id !== action.payload
      );
      state.roomPagination.total--;
    },
    handleSelectedRoomInfo(state, action) {
      state.selectedRoomInfo = action.payload;
    },
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
    handleRoomPagination(state, action) {
      state.roomPagination = {
        ...state.roomPagination,
        ...action.payload,
      };
    },
  },
});

export const {
  handleArrRoom,
  handleDeleteRoom,
  handleSelectedRoomInfo,
  handleLoading,
  handleRoomPagination,
} = adminRoomSlice.actions;

// export default adminRoomSlice;
export default adminRoomSlice.reducer;
