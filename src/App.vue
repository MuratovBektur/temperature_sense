<script setup lang="ts">
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
import cnst from "./const";

interface IRecord {
  id: number;
  temperature: number;
}
const store = useStore();

onMounted(() => {
  const recordList = localStorage.getItem(cnst.RECORD_LIST);
  const lastRecordId = localStorage.getItem(cnst.LAST_RECORD_ID);
  if (recordList) {
    const list: IRecord[] = JSON.parse(recordList);
    list.sort((a, b) => b.id - a.id);
    store.commit("SET_RECORD_LIST", list);
  }
  if (lastRecordId && !isNaN(Number(lastRecordId))) {
    store.commit("SET_LAST_RECORD_ID", Number(lastRecordId));
  }
});
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
@import "@/assets/styles/main.scss";
@import "@/assets/styles/_variables.scss";
main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  min-height: 100vh;
  color: white;
  & > * {
    width: max(30vw, 300px);
    height: max(30vw, 400px);
  }
}
</style>
