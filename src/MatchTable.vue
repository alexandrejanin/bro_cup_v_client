<script setup>
import {storeToRefs} from "pinia";
import {useCupStore} from "./cupStore.js";
import {ref} from "vue";

const cupStore = useCupStore();
const {token, adminMode} = storeToRefs(cupStore);

const banIcons = ref([
  '../src/assets/quake.webp',
  '../src/assets/gdash.svg',
  '../src/assets/trackmania.png',
  '../src/assets/golf.png',
  '../src/assets/geoguessr-square.png',
]);

function hasBans(match) {
  return match.players[0].ban >= 0 || match.players[1].ban >= 0;
}

function isInProgress(match) {
  return match.winner_id < 0 && (match.players[0].score > 0 || match.players[1].score > 0 || hasBans(match));
}

defineProps({
  match: {
    type: {
      id_match: Number,
      label: String,
      date: String,
      players: Array,
      nb_games: Number,
      winner_id: Number,
    },
    required: true,
  },
});
</script>

<template>
  <table
      :style="{borderRadius:'5px', backgroundColor: isInProgress(match) ? '#ff9600' : '#1a1a1a'}">
    <tr v-if="adminMode||(match.label && match.label.includes('Final'))||hasBans(match)">
      <th v-if="adminMode||(match.label && match.label.includes('Final'))"
          colspan="2"
          class="label">
        {{ match.label }}
      </th>
      <th v-else
          colspan="2"/>
      <th v-if="match.nb_games<5&&cupStore.adminMode||match.players[0].ban >= 0 || match.players[1].ban >= 0">
        Bans
      </th>
    </tr>
    <tr v-for="(player,playerIndex) in match.players"
    >
      <td class="bracket-player"
          :class="{
                    won: match.winner_id >= 0 && match.winner_id === playerIndex,
                    lost: match.winner_id >= 0 && match.winner_id !== playerIndex,
        }">
        {{ player.name }}
      </td>
      <td style="padding: 0 12px;width: 0"
          :class="{
                    won: match.winner_id >= 0 && match.winner_id === playerIndex,
                    lost: match.winner_id >= 0 && match.winner_id !== playerIndex,
                    ongoing: match.winner_id < 0
        }">
        <select
            v-if="token && adminMode"
            v-model="player.score"
            @change="cupStore.setTournamentScore(match.id_match, playerIndex, player.score)">
          <option
              v-for="i in Math.ceil(match.nb_games/2)+1"
              :value=i-1>
            {{ i - 1 }}
          </option>
        </select>
        <div v-else
             class="score.">
          {{ player.score }}
        </div>
      </td>
      <td v-if="player.ban>=0"
          class="ban">
        <img :src="banIcons[player.ban]"
             class="banicon">
      </td>
      <td v-if="match.nb_games<5&&adminMode">
        <select
            v-model="player.ban"
            @change="cupStore.setBan(match.id_match, playerIndex, player.ban)">
          <option v-for="i in 6"
                  :value="i-2">
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

td {
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

.score {
  font-weight: bold;
}

.won {
  font-weight: bold;
  background-color: var(--bc-green);
}

.lost {
  background-color: var(--bc-red);
}

.ongoing {
  background-color: var(--gray);
}

.label {
  color: white;
  padding: 0 8px;
}

.bracket-player {
  background-color: #1a1a1a;
  color: white;
  padding: 5px 12px;
  width: 80px;
}
</style>