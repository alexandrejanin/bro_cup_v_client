<script setup>
import {useCupStore} from "./cupStore.js";

const cupStore = useCupStore();

defineProps({
  groupName: String,
  groupIndex: Number,
});

function setGame(groupIndex, gameIndex) {
  cupStore.setGroupGame(groupIndex, gameIndex);
}

function sendResults(groupIndex, gameIndex) {
  const result = [];
  console.log(cupStore.group_stage);
  for (let playerIndex = 0; playerIndex < 8; playerIndex++) {
    result[playerIndex] = cupStore.group_stage.group[groupIndex].players[playerIndex].ranking[gameIndex];
  }
  console.log(result);
  cupStore.sendGroupResults(groupIndex, gameIndex, result);
}
</script>

<template>
  <table class="poolresultstable">
    <tr>
      <th>
        <select>
          <option
              @click="console.log('Fired');setGame(this.groupIndex,index)"
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
      <th style="color: white">Joueur</th>
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
    </tr>
    <tr v-for="playerIndex in cupStore.group_stage.group[groupIndex].players.length">
      <td class="playername">{{ cupStore.group_stage.group[groupIndex].players[playerIndex - 1].name }}</td>
      <td v-for="gameIndex in 5">
        <select
            v-model="cupStore.group_stage.group[groupIndex].players[playerIndex-1].ranking[gameIndex-1]">
          <option
              v-for="ranking in 9"
              v-bind="parseInt(ranking)-1">
            {{ ranking - 1 }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td></td>
      <td v-for="gameIndex in 5">
        <button @click="sendResults(groupIndex, gameIndex-1)">Valider</button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
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