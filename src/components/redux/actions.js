import * as actions from './actionTypes';

export const roomAdded = (roomName, roomIcon, roomId, projectId) => ({
  type: actions.ROOM_ADDED,
  payload: {
    roomName,
    roomIcon,
    roomId,
    projectId,
  },
});

export const roomDeleted = (roomName, roomId, projectId) => ({
  type: actions.ROOM_DELETED,
  payload: {
    roomName,
    roomId,
    projectId,
  },
});

export const setRoom = room => ({
  type: actions.SET_ROOM,
  payload: {
    room,
  },
});
export const setProject = project => ({
  type: actions.SET_PROJECT,
  payload: {
    project,
  },
});

export const setDevice = device => ({
  type: actions.SET_DEVICE,
  payload: {
    device,
  },
});
