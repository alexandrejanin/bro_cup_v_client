<script setup>
import {useCupStore} from "./cupStore.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const cupStore = useCupStore();
const {group_stage, group_ranking} = storeToRefs(cupStore);

defineProps({
  title: String,
  groupIndex: Number,
});

onMounted(() => {
  cupStore.updateGroupRanking();
});
</script>

<template>
  <table class="pooltable">
    <tr>
      <th class="name" colspan="100%">
        {{ title }}
      </th>
    </tr>
    <tr>
      <td colspan="100%">
        <table>
          <tr>
            <td v-for="(image,index) in [
                '../src/assets/quake.webp',
                '../src/assets/gdash.svg',
                '../src/assets/trackmania.png',
                '../src/assets/golf.png',
                '../src/assets/geoguessr-square.png',
            ]">
              <img
                  :class="{
                    'game-selected': index === group_stage.group[groupIndex].game_index,
                    'game-over': index < group_stage.group[groupIndex].game_index,
                  }"
                  style="vertical-align: middle;height: 50px;padding: 5px;border-radius: 5px"
                  :src="image"
                  :alt="image"/>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr
        v-if="group_ranking"
        v-for="(player,index) in group_ranking.group[groupIndex].players"
        class="player-row">
      <td class="player">
        {{ player.name }}
      </td>
      <td
          :class="index > 3 ? 'score-red' : 'score-green'">
        {{ player.score }}
      </td>
    </tr>
  </table>
</template>

<style lang="scss">
.pooltable {
  display: inline-block;
  border-radius: 7px;
  margin: 10px;
  background-color: #1a1a1a;
}

.name {
  color: white;
  font-size: 16pt;
}

.player {
  color: white;
  padding: 5px 0;
  font-size: 12pt;

  &-row:nth-child(even) {
    background-color: #303030;
  }
}

.game {
  background-color: #424242;

  &-selected {
    background-color: orange;
  }

  &-over {
    background-color: #424242;
    opacity: 0.5;
  }
}

.score {
  &-green {
    background-color: lightgreen;
  }

  &-red {
    background-color: indianred;
  }
}
</style>