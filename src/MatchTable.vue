<script setup>
import {storeToRefs} from "pinia";
import {useCupStore} from "./cupStore.js";

const cupStore = useCupStore();
const {token, adminMode} = storeToRefs(cupStore);

const banIcons = [
  '../src/assets/quake.webp',
  '../src/assets/gdash.svg',
  '../src/assets/trackmania.png',
  '../src/assets/golf.png',
  '../src/assets/geoguessr-square.png',
];

const gameNames = [
  'Aucun',
  'Quake',
  'GDash',
  'TM',
  'Golf',
  'Geo'
];

defineProps({
  match: {
    type: {
      id_match: Number,
      label: String,
      date: String,
      players: Array,
      nb_games: Number,
    },
    required: true,
  },
});

function isWinning(match, playerIndex) {
  return match.players[playerIndex].score >= Math.ceil(match.nb_games / 2);
}
</script>

<template>
  <table class="match-table">
    <tr>
      <th v-if="adminMode||match.label && !match.label.includes('/')"
          colspan="2"
          class="label">
        {{ match.label }}
      </th>
      <th v-else
          colspan="2"/>
      <th v-if="cupStore.adminMode||match.players[0].ban >= 0 || match.players[1].ban >= 0">
        Bans
      </th>
    </tr>
    <tr v-for="(player,playerIndex) in match.players">
      <td class="bracket-player">
        {{ player.name }}
      </td>
      <td
          style="padding: 0 12px;width: 0"
          :class="{
                    won: isWinning(match,playerIndex),
                    lost: isWinning(match,(playerIndex+1)%2),
                    ongoing: !isWinning(match,playerIndex) && !isWinning(match,(playerIndex+1)%2)}">
        <select
            v-if="token && adminMode"
            v-model="player.score">
          <option
              v-for="i in Math.ceil(match.nb_games/2)+1"
              :value=i-1
              @click="console.log(match);cupStore.setTournamentScore(match.id_match, playerIndex, player.score)">
            {{ i - 1 }}
          </option>
        </select>
        <div v-else>
          {{ player.score }}
        </div>
      </td>
      <td v-if="player.ban>=0"
          class="ban">
        <img :src="banIcons[player.ban]"
             class="banicon">
      </td>
      <td v-if="adminMode">
        <select v-model="player.ban">
          <option v-for="i in 6"
                  v-bind="i-2"
                  @click="cupStore.setBan(match.id_match, playerIndex, player.ban)">
            {{ i - 2 }}
          </option>
        </select>
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
th {
  color: white;
}

.match-table {
  background-color: #1a1a1a;
  border-radius: 5px;
}

.ban {
  background-color: indianred;
  padding: 3px;
  width: 20px;
}

.banicon {
  width: 100%;
  display: flex;
  border-radius: 5px;
}

.won {
  font-weight: bold;
  background-color: lightgreen;
}

.lost {
  font-weight: bold;
  background-color: indianred;
}

.ongoing {
  font-weight: bold;
  background-color: #fafab6;
}

.label {
  color: white;
  padding: 0 8px;
}

.bracket-player {
  color: white;
  padding: 5px 12px;
}
</style>