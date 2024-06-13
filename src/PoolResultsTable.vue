<script setup>
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";

const cupStore = useCupStore();
const {group_stage} = storeToRefs(cupStore);

defineProps({
  groupName: String,
  groupIndex: Number,
});

async function randomRanks(groupIndex) {
  for (let gameIndex = 0; gameIndex < 5; gameIndex++) {
    const results = [];
    for (let playerIndex = 0; playerIndex < 8; playerIndex++)
      results[playerIndex] = Math.ceil(8 * Math.random());

    await cupStore.sendGroupResults(groupIndex, gameIndex, results);
  }
}

function setGame(groupIndex, gameIndex) {
  cupStore.setGroupGame(groupIndex, gameIndex);
}

function sendResults(groupIndex, gameIndex) {
  const result = [];
  for (let playerIndex = 0; playerIndex < 8; playerIndex++) {
    result[playerIndex] = parseInt(cupStore.group_stage.group[groupIndex].players[playerIndex].ranking[gameIndex]);
  }
  cupStore.sendGroupResults(groupIndex, gameIndex, result);
}

function sendBonus(groupIndex) {
  const result = [];
  for (let playerIndex = 0; playerIndex < 8; playerIndex++) {
    result[playerIndex] = parseInt(cupStore.group_stage.group[groupIndex].players[playerIndex].bonus);
  }
  cupStore.sendGroupBonus(groupIndex, result);
}
</script>

<template>
  <table class="poolresultstable">
    <tr>
      <th>
        <select v-if="group_stage.group[groupIndex]?.game_index !== undefined"
                v-model="group_stage.group[groupIndex].game_index"
                @change="setGame(groupIndex,group_stage.group[groupIndex].game_index)">
          <option
              :value="index"
              v-for="{game,index} in [
                  {
                    game: 'Aucun jeu',
                    index: -1,
                  },
                  {
                    game: 'Quake',
                    index: 0,
                  },
                  {
                    game: 'Geometry Dash',
                    index: 1,
                  },
                  {
                    game: 'Trackmania',
                    index: 2,
                  },
                  {
                    game: 'Golf With Your Friends',
                    index: 3,
                  },
                  {
                    game: 'Geoguessr',
                    index: 4
                  },
                  {
                    game: 'Poule Terminée',
                    index: 5
                  },
            ]">
            {{ game }}
          </option>
        </select>
      </th>
      <th colspan="5" class="tabletitle">
        {{ groupName }}
      </th>
    </tr>
    <tr>
      <th>Joueur</th>
      <th v-for="{src} in [
                {src:'../src/assets/quake.webp'},
                {src:'../src/assets/gdash.svg'},
                {src:'../src/assets/trackmania.png'},
                {src:'../src/assets/golf.png'},
                {src:'../src/assets/geoguessr-square.png'},
            ]">
        <img
            style="vertical-align: middle;height: 30px;"
            :src="src"
            :alt="src">
      </th>
      <th>Bonus</th>
    </tr>
    <tr v-for="player in group_stage.group[groupIndex].players">
      <td class="playername">{{ player.name }}</td>
      <td v-for="gameIndex in 5">
        <select
            v-model="player.ranking[gameIndex-1]">
          <option
              v-for="ranking in 9"
              v-bind="ranking-1">
            {{ ranking - 1 }}
          </option>
        </select>
      </td>
      <td>
        <select
            v-model="player.bonus"
            @change="sendBonus(groupIndex)">
          <option v-for="bonus in 7"
                  :value="bonus-4">
            {{ bonus - 4 }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        <button @click="randomRanks(groupIndex)">
          Random
        </button>
      </td>
      <td v-for="gameIndex in 5">
        <button @click="sendResults(groupIndex, gameIndex-1)">
          Valider
        </button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
th {
  color: white;
}

button {
  background-color: grey;
}

.tabletitle {
  color: white;
  font-size: 16pt;
  horiz-align: center;
}

.playername {
  color: white;
  padding-left: 8px;
}

.poolresultstable {
  display: inline-block;
  margin: 10px;
  background-color: #1a1a1a;
  border-radius: 10px;
}
</style>