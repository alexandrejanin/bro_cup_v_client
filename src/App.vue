<script setup>
import PoolTable from "./PoolTable.vue";
import PoolResultsTable from "./PoolResultsTable.vue";
import {onMounted, ref} from "vue";
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";
import BracketItem from "./BracketItem.vue";
import MatchList from "./MatchList.vue";

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
  cupStore.update();
});

</script>

<template>
  <img src="../src/assets/Sc_Logo_V1_decoupe.png"
       class="bg-img"/>

  <h2>
    Poules
  </h2>

  <div>
    <PoolTable
        title="Poule A"
        :group-index=0
    />
    <PoolTable
        title="Poule B"
        :group-index=1
    />
  </div>

  <button v-if="token && adminMode && cupStore.getNextPlayer()!==-1"
          :onclick="drawPlayer">
    Tirer un joueur
  </button>

  <div v-if="token && adminMode">
    <h3>ADMIN : Résultats poules</h3>
    <PoolResultsTable
        group-name="Poule A"
        :group-index=0
    />
    <PoolResultsTable
        group-name="Poule B"
        :group-index=1
    />
  </div>

  <div v-if="cupStore.tournamentTree?.default?.players">
    <h2>
      Tournoi
    </h2>
    <bracket-item
        style="padding-right: 100px"
        :match="cupStore.tournamentTree.default"
    />
  </div>

  <div>
    <MatchList/>
  </div>

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
</template>

<style>

td {
  border-radius: 5px;
}

.bg-img {
  height: 120px;
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>