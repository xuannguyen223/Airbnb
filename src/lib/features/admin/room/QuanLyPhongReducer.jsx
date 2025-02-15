// TOÀN BỘ PHẦN IMPORT CỦA EM ĐẾN TỪ ĐÂU VẬY HOÀNG
// CHỊ KHÔNG THẤY EM ĐẶT TÊN BIẾN NÀY Ở ĐÂU, CŨNG NHƯ ĐƯỜNG DẪN /room/RoomTypes KHÔNG TỒN TẠI
// EM COI FIX LẠI CHỖ NÀY NHÉ, VỚI TRONG QUÁ TRÌNH CODE NÊN LÀ TIẾNG ANH HẾT, HOẶC KO THÌ TV HẾT, ĐỪNG VỪA ANH VỪA VIỆT
import {
  GET_ROOM_LIST,
  GET_ROOM_DETAIL,
  ADD_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
} from "../room/RoomTypes";

const initialState = {
  roomList: [],
  roomDetail: {},
};

export const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_LIST: {
      return { ...state, roomList: action.payload };
    }
    case GET_ROOM_DETAIL: {
      return { ...state, roomDetail: action.payload };
    }
    case ADD_ROOM: {
      return { ...state, roomList: [...state.roomList, action.payload] };
    }
    case UPDATE_ROOM: {
      return {
        ...state,
        roomList: state.roomList.map((room) =>
          room.id === action.payload.id ? action.payload : room
        ),
      };
    }
    case DELETE_ROOM: {
      return {
        ...state,
        roomList: state.roomList.filter((room) => room.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
