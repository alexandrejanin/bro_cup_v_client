<script setup>
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";

const cupStore = useCupStore();
const {timeTable} = storeToRefs(cupStore);

function isOver(match) {
  return match.winner_id >= 0;
}
</script>

<template>
  <table v-if="timeTable" class="matchlist">
    <tr v-for="time of Object.keys(timeTable).sort()">
      <td class="time">
        {{ time }}
      </td>
      <td v-for="match of timeTable[time]" class="match">
        <span :class="{label:true,over:isOver(match)}">{{ match.label }}</span>
        <br/>
        <span :class="{over:match.players[0].name==='???'&&match.players[1].name==='???'}">
        <span :class="{winner: match.winner_id===0,loser:match.winner_id===1}">
          {{ match.players[0].name }}
        </span>
        <span> vs </span>
        <span :class="{winner: match.winner_id===1,loser:match.winner_id===0}">
          {{ match.players[1].name }}
        </span>
        </span>
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
.matchlist {
  margin: 0 auto;
  border-radius: 11px;
}

.time {
  background-color: rgba(26, 26, 26, 0.5);
  border-radius: 10px;
  height: 50px;
  width: 120px;
  font-size: 18pt;
}

.match {
  background-color: rgba(26, 26, 26, 0.5);
  border-radius: 10px;
  padding: 15px 0;
  width: 250px;
}

.label {
  font-weight: bold;
}

.over {
  color: darkgrey;
}

.winner {
  color: var(--bc-green);
  font-weight: bold;
}

.loser {
  color: var(--bc-red);
}
</style>