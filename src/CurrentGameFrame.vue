<script setup>
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";

const cupStore = useCupStore();
const {current_game} = storeToRefs(cupStore);

function currentGameToString(current_game) {
  console.log(current_game);
  if (current_game.label.startsWith('Poule')) {
    return current_game.label;
  }

  const player1 = current_game.players[0];
  const player2 = current_game.players[1];

  return `${current_game.label} : ${player1.name} (${player1.score} - ${player2.score}) ${player2.name}`;
}
</script>

<template>
  <table style="margin: 0 auto">
    <tr>
      <td colspan="100%" class="label">
        En cours : {{ current_game.label }}
      </td>
    </tr>
    <tr v-if="current_game.players.length===2"
        style="display: inline-block;">
      <td class="player">{{ current_game.players[0].name }}</td>
      <td class="score">{{ current_game.players[0].score }}</td>
      <td class="vs"> VS</td>
      <td class="score">{{ current_game.players[1].score }}</td>
      <td class="player">{{ current_game.players[1].name }}</td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
.label {
  font-family: "Vintage Crafted Sans Regular", sans-serif;
  font-size: 20pt;
}

.score {
  font-family: "Medicaments Church", sans-serif;
  font-size: 32pt;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  vertical-align: middle;
  min-width: 50px;
}

.player {
  min-width: 300px;
  font-size: 32pt;
  font-family: "Medicaments Church", sans-serif;
  background-color: var(--bc-blue);
  padding: 5px 10px;
  border-radius: 10px;
  vertical-align: middle;
}

.vs {
  vertical-align: middle;
  min-width: 50px;
  font-size: 24pt;
  font-family: "Medicaments Church", sans-serif;
}
</style>