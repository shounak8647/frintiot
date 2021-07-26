export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'SET_ROOM':
      return {...state, room: action.payload};
    case 'SET_PROJECT':
      return {...state, project: action.payload};
    case 'SET_DEVICE':
      return {...state, device: action.payload};
    case 'ALL_UPDATE':
      return {
        ...state,
        project: action.payload,
        room: action.payload?.rooms?.[0],
      };
    default:
      return state;
  }
}
