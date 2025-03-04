import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrayBooking: [],
  selectedBookingInfo: {},
  isLoading: false,
  bookingPagination: {
    total: 0,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
  },
};

const adminBookingSlice = createSlice({
  name: "adminBookingSlice",
  initialState,
  reducers: {
    handleArrBooking(state, action) {
      state.arrayBooking = action.payload;
    },
    handleDeleteBooking(state, action) {
      state.arrayBooking = state.arrayBooking.filter(
        (booking) => booking.id !== action.payload
      );
      state.bookingPagination.total--;
    },
    handleSelectedBookingInfo(state, action) {
      state.selectedBookingInfo = action.payload;
    },
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
    handleBookingPagination(state, action) {
      state.bookingPagination = {
        ...state.bookingPagination,
        ...action.payload,
      };
    },
  },
});

export const {
  handleArrBooking,
  handleDeleteBooking,
  handleSelectedBookingInfo,
  handleLoading,
  handleBookingPagination,
} = adminBookingSlice.actions;

// export default adminBookingSlice;
export default adminBookingSlice.reducer;
