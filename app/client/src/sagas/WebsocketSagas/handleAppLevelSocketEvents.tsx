import { put } from "redux-saga/effects";
import { APP_LEVEL_SOCKET_EVENTS } from "./socketEvents";
import { collabSetAppEditors } from "actions/appCollabActions";

export default function* handleAppLevelSocketEvents(event: any) {
  switch (event.type) {
    // Collab V2 - Realtime Editing
    case APP_LEVEL_SOCKET_EVENTS.LIST_ONLINE_APP_EDITORS: {
      yield put(collabSetAppEditors(event.payload[0]));
      return;
    }
  }
}
