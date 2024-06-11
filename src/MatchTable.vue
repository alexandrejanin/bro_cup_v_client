<script setup>
import {storeToRefs} from "pinia";
import {useCupStore} from "./cupStore.js";

const cupStore = useCupStore();
const {token, adminMode} = storeToRefs(cupStore);
</script>

<template>
  <table class="match-table">
    <tr v-if="label.length>0">
      <th colspan="100%" class="label">
        {{ label }}
      </th>
    </tr>
    <tr v-for="player in players">
      <td class="bracket-player">{{ player.name }}</td>
      <td
          style="padding: 0 12px"
          :class="{
            won: player.score === maxScore,
            ongoing: players[0].score<maxScore&&players[1].score<maxScore,
            lost: player.score < maxScore && (players[0].score===maxScore||players[1].score===maxScore),}">
        {{ player.score }}
        <select
            v-if="token && adminMode"
            v-model="player.score">
          <option v-for="i in maxScore+1" v-bind:value="i-1">
            {{ i - 1 }}
          </option>
        </select>
      </td>
      <td><img src="../src/assets/quake.webp" width="20"></td>
    </tr>
  </table>
</template>

<style scoped lang="scss">

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

<script>
export default {
  name: 'MatchTable',
  data() {
    return {
      players: [
        {
          name: this.topPlayer,
          score: this.topScore,
        },
        {
          name: this.bottomPlayer,
          score: this.bottomScore,
        },
      ]
    }
  },
  props: {
    maxScore: {
      type: Number,
      default: 2,
    },
    label: {
      type: String,
      default: "",
    },
    topPlayer: {
      type: String,
      default: "Joueur A"
    },
    topScore: {
      type: Number,
      default: 0
    },
    bottomPlayer: {
      type: String,
      default: "Joueur B"
    },
    bottomScore: {
      type: Number,
      default: 1
    },
  },
}
</script>