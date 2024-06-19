<script setup>
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";

const cupStore = useCupStore();
const {timeTable} = storeToRefs(cupStore);
</script>

<template>
  <table>
    <tr v-for="time of Object.keys(timeTable).sort()">
      <td class="time">
        {{ time }}
      </td>
      <td v-for="match of timeTable[time]">
        <table class="match">
          <tr class="label">{{ match.label }}</tr>
          <tr v-if="match.players[0].name !== '???' || match.players[1].name !== '???'">
            {{ match.players[0].name }} vs {{ match.players[1].name }}
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
.time {
  background-color: rgba(26, 26, 26, 0.5);
  border-radius: 10px;
  height: 50px;
  width: 120px;
  font-size: 18pt;
}

.match {
  align-items: center;
  padding: 10px 20px;
}

.label {
  font-weight: bold;
}
</style>