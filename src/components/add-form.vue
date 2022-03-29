<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

interface IRecord {
  id: number;
  temperature: number;
}

const store = useStore();
const route = useRoute();
const router = useRouter();

function addRecord() {
  if (!isValidRecord.value) return;
  const temperature = Number(temperatureValue.value);
  store.dispatch("setRecord", temperatureValue.value);
  router.push("/");
}
// check is temperature contains only numbers or empty
function checkValid() {
  const isValid = /^((\d+)|(\d+\.\d+))$/.test(temperatureValue.value);
  isValidRecord.value = isValid;
}

const recordId: string | string[] = route.params.id;
const isNew = recordId === "new";
const temperatureValue = ref("");
const isLoadedData = ref(false);
const isFoundRecord = ref(false);
const isValidRecord = ref(true);

onMounted(() => {
  if (!isNew) {
    const id = Number(recordId);
    if (isNaN(id)) {
      isLoadedData.value = true;
      return;
    }
    const sensorList: IRecord[] = store.state.recordList;
    const sensor: IRecord | undefined = sensorList.find(
      (s: IRecord) => s.id === id
    );
    if (sensor) {
      temperatureValue.value = sensor.temperature.toString();
      isFoundRecord.value = true;
      isLoadedData.value = true;
    }
  } else {
    isLoadedData.value = true;
  }
});
</script>

<template>
  <div class="sensor-form">
    <div v-if="isNew">
      <h1 class="sensor-form__title">Add temperature sensor</h1>
      <div>
        <input v-model="temperatureValue" @input="checkValid" />
        <div class="sensor-form__error-block">
          <span v-if="!isValidRecord" class="sensor-form__error-text">
            temperature isn't valid
          </span>
        </div>
      </div>
      <button
        :disabled="!isValidRecord || !temperatureValue"
        @click="addRecord"
        class="sensor-form__add-btn"
      >
        add sensor
      </button>
    </div>
    <div v-else-if="temperature">
      <h1 class="sensor-form__title">Edit temperature sensor</h1>
      <div>
        <input v-model="temperatureValue" @input="checkValid" />
        <div class="sensor-form__error-block">
          <span v-if="!isValidRecord" class="sensor-form__error-text">
            temperature isn't valid
          </span>
        </div>
      </div>
      <button
        :disabled="!isValidRecord || !temperatureValue"
        @click="editRecord"
        class="sensor-form__btn"
      >
        edit sensor
      </button>
      <button
        @click="router.push('/')"
        class="sensor-form__btn sensor-form__cancel-btn"
      >
        cancel
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sensor-form {
  border: 1px solid grey;
  padding: 0.75rem 2rem;
  &__title {
    margin-bottom: 1rem;
    text-align: center;
  }
  &__error-block {
    height: 30px;
  }
  &__error-text {
    display: block;
    padding-top: 0.25rem;
    color: tomato;
  }
  &__btn {
    display: block;
    cursor: pointer;
    width: 200px;
    margin: 2rem auto 0;
    background-color: transparent;
    border: 1px solid #12ce79;
    padding: 0.5rem;
    color: white;
    border-radius: 0.75rem;
    &:disabled {
      border-color: #168854;
    }
  }
  &__cancel-btn {
    margin-top: 1rem;
  }
}
</style>
