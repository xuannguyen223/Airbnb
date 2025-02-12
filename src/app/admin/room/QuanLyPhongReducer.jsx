    import { GET_ROOM_LIST, GET_ROOM_DETAIL, ADD_ROOM, UPDATE_ROOM, DELETE_ROOM } from "../room/RoomTypes";

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
            roomList: state.roomList.map(room =>
            room.id === action.payload.id ? action.payload : room
            ),
        };
        }
        case DELETE_ROOM: {
        return {
            ...state,
            roomList: state.roomList.filter(room => room.id !== action.payload),
        };
        }
        default:
        return state;
    }
    };
