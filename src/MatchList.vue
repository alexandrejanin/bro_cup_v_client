<script setup>
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";

const cupStore = useCupStore();
const {match_list} = storeToRefs(cupStore);
</script>

<template>
  <table>
    <tr v-for="match of match_list">
      {{ match }}
    </tr>
  </table>
</template>

<style scoped lang="scss">

</style>