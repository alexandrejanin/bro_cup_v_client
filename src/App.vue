<script setup>
import Bracket from "./Bracket.vue";
import PoolTable from "./PoolTable.vue";
import PoolResultsTable from "./PoolResultsTable.vue";
import {onMounted, ref} from "vue";
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";

const cupStore = useCupStore();
const {token, adminMode} = storeToRefs(cupStore);

const username = ref('');
const password = ref('');

function login() {
  console.log('login');
  cupStore.login(username.value, password.value);
}

function drawPlayer() {
  cupStore.drawPlayer();
}

onMounted(() => {
  cupStore.updateGroupStage();
  cupStore.updateGroupRanking();
});

</script>

<template>
  <div
      v-if="!token || token.length === 0">
    Identifiant : <input
      type="text"
      v-model="username"/>
    <br/>
    Mot de passe : <input
      type="password"
      v-model="password"/>
    <br/>
    <button :onclick="login">Connexion</button>
  </div>
  <div
      v-else>
    Mode Orga
    <input
        v-model="adminMode"
        type="checkbox"/>
  </div>

  <h1>BRO CUP V</h1>

  <h2>
    Poules
  </h2>

  <button
      v-if="token && adminMode"
      :onclick="drawPlayer">
    Tirer un joueur
  </button>

  <div>
    <PoolTable
        title="Poule A"
        :group-index="0"/>
    <PoolTable
        title="Poule B"
        :group-index="1"/>
  </div>

  <div
      v-if="adminMode">
    <h3>ADMIN : Résultats poules</h3>
    <PoolResultsTable
        group-name="Poule A"
        group-index="0"/>
    <PoolResultsTable
        group-name="Poule B"
        group-index="1"/>
  </div>

  <h2>
    Tournoi
  </h2>
  <Bracket></Bracket>
</template>

<style>
td {
  border-radius: 5px;
}
</style>