import { createStore } from "vuex";
import cnst from "../const";

const RECORD_LIST = cnst.RECORD_LIST;
const LAST_RECORD_ID = cnst.LAST_RECORD_ID;

interface IRecord {
  id: number;
  temperature: number;
}
interface IState {
  recordList: IRecord[];
  lastRecordId: number;
}

const store = createStore<IState>({
  state() {
    return {
      recordList: [],
      lastRecordId: 0,
    };
  },
  mutations: {
    ADD_RECORD(state: IState, record: IRecord) {
      state.recordList.unshift(record);
      localStorage.setItem(RECORD_LIST, JSON.stringify(state.recordList));
    },
    REMOVE_RECORD(state: IState, recordId: number) {
      state.recordList = state.recordList.filter(
        (record) => record.id !== recordId
      );
      localStorage.setItem(RECORD_LIST, JSON.stringify(state.recordList));
    },
    EDIT_RECORD(state: IState, record: IRecord) {
      const recordIdx = state.recordList.findIndex(
        (record) => record.id === record.id
      );
      if (!recordIdx) return;
      state.recordList[recordIdx].temperature = record.temperature;
      localStorage.setItem(RECORD_LIST, JSON.stringify(state.recordList));
    },
    SET_RECORD_LIST(state: IState, recordList: IRecord[]) {
      state.recordList = recordList;
    },
    INCREASE_LAST_RECORD_ID(state: IState) {
      const lastRecordId = state.lastRecordId + 1;
      state.lastRecordId = lastRecordId;
      localStorage.setItem(LAST_RECORD_ID, lastRecordId.toString());
    },
    SET_LAST_RECORD_ID(state: IState, lastRecordId: number) {
      state.lastRecordId = lastRecordId;
      localStorage.setItem(LAST_RECORD_ID, lastRecordId.toString());
    },
  },
  actions: {
    addRecord({ commit, state }, temperature) {
      commit("INCREASE_LAST_RECORD_ID");
      const record: IRecord = {
        id: state.lastRecordId,
        temperature,
      };
      console.log("record", record);
      commit("ADD_RECORD", record);
    },
  },
});

export default store;
