<script setup>
import {storeToRefs} from "pinia";
import {useCupStore} from "./cupStore.js";

const cupStore = useCupStore();
const {token, adminMode} = storeToRefs(cupStore);

const maxScore = 2;

defineProps({
  match: {
    type: {
      id_match: Number,
      label: String,
      date: String,
      topPlayer: Object,
      bottomPlayer: Object,
    },
    required: true,
  },
});
</script>

<template>
  <table class="match-table">
    <tr v-if="match.label">
      <th colspan="100%" class="label">
        {{ match.label }}
      </th>
    </tr>
    <tr v-for="player in [match.topPlayer, match.bottomPlayer]">
      <td class="bracket-player">
        {{ player.name }}
      </td>
      <td
          style="padding: 0 12px">
        <!--          :class="{-->
        <!--            won: player.score === maxScore,-->
        <!--            ongoing: players[0].score<maxScore&&players[1].score<maxScore,-->
        <!--            lost: player.score < maxScore && (players[0].score===maxScore||players[1].score===maxScore),}"-->
        <select
            v-if="token && adminMode"
            v-model="player.score">
          <option
              v-for="i in maxScore+1"
              :value=i-1
              @click="console.log(match);cupStore.setTournamentScore(match.id_match, player===match.topPlayer?0:1, player.score)">
            {{ i - 1 }}
          </option>
        </select>
        <div v-else>
          {{ player.score }}
        </div>
      </td>
      <td>
        <img src="../src/assets/quake.webp" width="20">
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">

td {
  color: white;
}

.match-table {
  background-color: #1a1a1a;
  border-radius: 5px;
}

.won {
  background-color: lightgreen;
}

.lost {
  background-color: indianred;
}

.ongoing {
  background-color: #fafab6;
}

.label {
  color: white;
}

.bracket-player {
  color: white;
  padding: 5px 10px;
}
</style>