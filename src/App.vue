<script setup>
import PoolTable from "./PoolTable.vue";
import PoolResultsTable from "./PoolResultsTable.vue";
import {onMounted, ref} from "vue";
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";
import BracketItem from "./BracketItem.vue";
import MatchList from "./MatchList.vue";
import TwitchVideo from "./TwitchPlayer.vue";
import CurrentGameFrame from "./CurrentGameFrame.vue";

const cupStore = useCupStore();
const {token, adminMode, loginFailed, current_game} = storeToRefs(cupStore);

const username = ref('');
const password = ref('');

const page = ref(0);

const displayAdminLogin = ref(false);

const links = [
  {
    href: 'https://www.twitch.tv/brocuplive',
    src: '../src/assets/twitch.webp',
    alt: 'discord',
  },
  {
    href: 'https://www.youtube.com/@brocup2630',
    src: '../src/assets/youtube.webp',
    alt: 'discord',
  },
  {
    href: ' https://discord.gg/jA8UB86r9X',
    src: '../src/assets/discord.webp',
    alt: 'discord',
  },
];

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

function resetCup() {
  cupStore.resetCup();
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
               @click="page=index;cupStore.update()"
               :style="{color:page===index?'var(--bc-yellow)':'white'}">
            {{ text }}
          </div>
        </td>
      </tr>
    </table>
    <div v-if="page===0">
      <twitch-video></twitch-video>
    </div>
    <div v-if="current_game&&(page===0||page===3)">
      <current-game-frame/>
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
      <div v-if="cupStore.tournament_tree?.default?.players">
        <bracket-item
            style="padding-right: 100px"
            :match="cupStore.tournament_tree.default"
        />
      </div>
      <div v-else style="font-size: 16pt">
        <i>Poules en cours, le tournoi arrive après !</i>
      </div>
    </div>

    <div v-if="page===3">
      <MatchList/>
    </div>

    <div style="display: inline-block">
      <a v-for="link of links"
         :href="link.href"
         target="_blank">
        <img
            :alt="link.alt"
            :src="link.src"
            width="50px"
            style="padding: 50px 20px"/>
      </a>
    </div>

    <div
        v-if="!token || token.length === 0"
        style="align-self: end">
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
    <div v-else>
      Mode Orga
      <input
          v-model="adminMode"
          type="checkbox"/>
      <button v-if="adminMode"
              style="background-color: red;margin-left: 300px"
              @click="resetCup">
        RESET LE TOURNOI
      </button>
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

.currentGame {
  font-size: 24pt;
  font-family: "Vintage Crafted Sans Regular", sans-serif;
}
</style>