<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const recordList = computed(() => {
  return store.state.recordList;
});

function removeRecord(recordId: number) {
  store.commit("REMOVE_RECORD", recordId);
}
</script>

<template>
  <div class="records">
    <h1 class="records__title">Temperature records</h1>
    <template v-if="recordList.length">
      <ul class="records__list">
        <li v-for="record of recordList" :key="record.id">
          <span>
            {{ record.temperature }}
          </span>
          <div>
            <img
              @click="router.push('/edit/' + record.id)"
              src="../assets/images/pencil.png"
              alt="edit"
            />
            <img
              @click="removeRecord(record.id)"
              src="../assets/images/trash.png"
              alt="remove"
            />
          </div>
        </li>
      </ul>
    </template>
    <div v-else align="center">Record List is empty</div>
    <button @click="router.push('/edit/new')" class="records__add-btn">
      add record
    </button>
  </div>
</template>

<style scoped lang="scss">
.records {
  border: 1px solid grey;
  padding: 0.75rem 2rem 0;
  position: relative;
  &__title {
    margin-bottom: 1rem;
    text-align: center;
  }
  &__list {
    margin-top: 5vh;
    list-style-type: none;
    & > li {
      padding: 0.25rem 0.5rem;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid white;
      }
      & img {
        margin-left: 1vw;
        width: 20px;
      }
    }
  }
  &__add-btn {
    display: block;
    cursor: pointer;
    width: 200px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 1.5rem;
    background-color: transparent;
    border: 1px solid #12ce79;
    padding: 0.5rem;
    color: white;
    border-radius: 0.75rem;
  }
}
</style>
