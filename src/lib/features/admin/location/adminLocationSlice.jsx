import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrayLocation: [],
  selectedLocationInfo: {},
  isLoading: false,
  locationPagination: {
    total: 0,
    defaultPageSize: 3,
    showSizeChanger: true,
    pageSizeOptions: ["3", "5", "10"],
  },
};

const adminLocationSlice = createSlice({
  name: "adminLocationSlice",
  initialState,
  reducers: {
    handleArrLocation(state, action) {
      state.arrayLocation = action.payload;
    },
    handleDeleteLocation(state, action) {
      state.arrayLocation = state.arrayLocation.filter(
        (location) => location.id !== action.payload
      );
      state.locationPagination.total--;
    },
    handleSelectedLocationInfo(state, action) {
      state.selectedLocationInfo = action.payload;
    },
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
    handleLocationPagination(state, action) {
      state.locationPagination = {
        ...state.locationPagination,
        ...action.payload,
      };
    },
  },
});

export const {
  handleArrLocation,
  handleDeleteLocation,
  handleSelectedLocationInfo,
  handleLoading,
  handleLocationPagination,
} = adminLocationSlice.actions;

// export default adminLocationSlice;
export default adminLocationSlice.reducer;
