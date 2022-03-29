<script setup lang="ts">
import { onMounted, ref } from "vue";
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
  store.dispatch("addRecord", temperature);
  router.push("/");
}

function editRecord() {
  if (!isValidRecord.value && isFoundRecord.value) return;
  const temperature = Number(temperatureValue.value);
  console.log({
    id: Number(recordId),
    temperature,
  });
  store.commit("EDIT_RECORD", {
    id: Number(recordId),
    temperature,
  });
  router.push("/");
}

// check is temperature empty or contains only numbers
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
      (s: IRecord) => s.id === Number(id)
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
  <div class="record-form">
    <!-- if new record -->
    <div v-if="isNew">
      <h1 class="record-form__title">Add temperature sensor</h1>
      <div>
        <input v-model="temperatureValue" @input="checkValid" />
        <div class="record-form__error-block">
          <span v-if="!isValidRecord" class="record-form__error-text">
            temperature isn't valid
          </span>
        </div>
      </div>
      <div class="record-form__bottom-side">
        <button
          :disabled="!isValidRecord || !temperatureValue"
          @click="addRecord"
          class="record-form__btn"
        >
          add record
        </button>
        <button
          @click="router.push('/')"
          class="record-form__btn record-form__cancel-btn"
        >
          cancel
        </button>
      </div>
    </div>
    <!-- if record was founded-->
    <div v-else-if="temperatureValue">
      <h1 class="record-form__title">Edit temperature sensor</h1>
      <div>
        <input v-model="temperatureValue" @input="checkValid" />
        <div class="record-form__error-block">
          <span v-if="!isValidRecord" class="record-form__error-text">
            temperature isn't valid
          </span>
        </div>
      </div>
      <div class="record-form__bottom-side">
        <button
          :disabled="!isValidRecord || !temperatureValue"
          @click="editRecord"
          class="record-form__btn"
        >
          edit record
        </button>
        <button
          @click="router.push('/')"
          class="record-form__btn record-form__cancel-btn"
        >
          cancel
        </button>
      </div>
    </div>
    <!-- if record not new and doesn't was founded-->
    <div v-else>
      <div>Record not nound</div>
      <div class="record-form__bottom-side">
        <button @click="router.push('/')" class="record-form__btn">
          go home
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.record-form {
  border: 1px solid grey;
  padding: 0.75rem 2rem;
  position: relative;
  & input {
    display: block;
    margin: auto;
  }
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
  &__bottom-side {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20px;
  }
}
</style>
