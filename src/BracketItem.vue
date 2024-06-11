<template>
  <div class="item">
    <div :class="{'item-parent': tournamentTree.topChild||tournamentTree.bottomChild}">
      <MatchTable
          v-if="typeof tournamentTree!=='string'"
          :label="tournamentTree.label"
          :top-player="tournamentTree.topPlayer"
          :bottom-player="tournamentTree.bottomPlayer"
          :top-score="tournamentTree.topScore"
          :bottom-score="tournamentTree.bottomScore"
          :max-score="tournamentTree.maxScore"/>
      <p v-else>{{ tournamentTree.toString() }}</p>
    </div>
    <div class="item-childrens">
      <div
          class="item-child"
          v-if="tournamentTree.topChild">
        <bracket-item
            :tournament-tree="tournamentTree.topChild"/>
      </div>
      <div
          class="item-child"
          v-if="tournamentTree.bottomChild">
        <bracket-item
            :tournament-tree="tournamentTree.bottomChild"/>
      </div>
    </div>
  </div>
</template>

<script>
import MatchTable from "./MatchTable.vue"

export default {
  name: 'BracketItem',
  components: {MatchTable},
  props: {
    tournamentTree: {}
  }
}
</script>
