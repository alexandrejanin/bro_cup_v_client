<script setup>
import PoolTable from "./PoolTable.vue";
import PoolResultsTable from "./PoolResultsTable.vue";
import {onMounted, ref} from "vue";
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";
import BracketItem from "./BracketItem.vue";
import MatchList from "./MatchList.vue";
import TwitchVideo from "./TwitchPlayer.vue";

const cupStore = useCupStore();
const {token, adminMode, loginFailed} = storeToRefs(cupStore);

const username = ref('');
const password = ref('');

const page = ref(0);

const displayAdminLogin = ref(false);

function login() {
  cupStore.login(username.value, password.value);
}

function onKeyDown(event) {
  if (event.key === "Enter") {
    login();
  }
}

function hideLoginFailedMessage() {
  loginFailed.value = false;
}

function drawPlayer() {
  cupStore.drawPlayer();
}

onMounted(() => {
  cupStore.update();
});

</script>

<template>
  <div style="display: flex;flex-direction: column;horiz-align: center;">
    <img src="../src/assets/Sc_Logo_V1_decoupe.png"
         class="bg-img"/>

    <table style="width: 0;align-self: center">
      <tr>
        <td v-for="(text, index) in ['Stream', 'Poules', 'Tournoi', 'Planning']"
            style="padding: 30px 40px">
          <div class="tabtext"
               @click="page=index"
               :style="{color:page===index?'var(--bc-yellow)':'white'}">
            {{ text }}
          </div>
        </td>
      </tr>
    </table>
    <div v-if="page===0">
      <twitch-video></twitch-video>
    </div>

    <div v-if="page===1">
      <PoolTable
          title="Poule A"
          :group-index=0
      />
      <PoolTable
          title="Poule B"
          :group-index=1
      />

      <button v-if="adminMode"
              @click="drawPlayer()"
              style="width: 100px;align-self: center">
        Tirer un joueur
      </button>

      <div v-if="adminMode">
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
    </div>

    <div v-if="page===2">
      <div v-if="cupStore.tournamentTree?.default?.players">
        <bracket-item
            style="padding-right: 100px"
            :match="cupStore.tournamentTree.default"
        />
      </div>
      <div v-else style="font-size: 16pt">
        <i>Poules en cours, le tournoi arrive après !</i>
      </div>
    </div>

    <div v-if="page===3">
      <MatchList/>
    </div>

    <div
        v-if="!token || token.length === 0"
        style="padding-top: 50px;align-self: end">
      <p @click="()=>{displayAdminLogin=!displayAdminLogin;}">
        Login Orga
      </p><br/>
      <div v-if="displayAdminLogin">
        Identifiant : <input
          type="text"
          v-model="username"
          @keydown="onKeyDown"
          @input="hideLoginFailedMessage"/>
        <br/>
        Mot de passe : <input
          type="password"
          v-model="password"
          @keydown="onKeyDown"
          @input="hideLoginFailedMessage"/>
        <br/>
        <div v-if="loginFailed" style="color: red">
          Mauvais identifiants !
        </div>
        <button @click="login">Connexion</button>
      </div>
    </div>
    <div v-else
         style="padding-top: 50px">
      Mode Orga
      <input
          v-model="adminMode"
          type="checkbox"/>
    </div>
  </div>
</template>

<style scoped>
.bg-img {
  height: 125px;
  align-self: center;
  padding-top: 100px;
}

.tabtext {
  font-family: "Vintage Crafted Sans Regular", sans-serif;
  font-weight: bold;
  font-size: 40pt;
  cursor: pointer;
}
</style>