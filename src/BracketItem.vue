<script setup>
import MatchTable from "./MatchTable.vue";

defineProps({
  match: [String, Object],
});

</script>

<template>
  <div class="item">
    <div :class="{'item-parent': match.topChild||match.bottomChild}">
      <MatchTable
          v-if="typeof match!=='string'"
          :match=match
      />
      <p v-else>{{ match.toString() }}</p>
    </div>
    <div class="item-childrens">
      <div
          class="item-child"
          v-if="match.topChild">
        <bracket-item
            :match="match.topChild"/>
      </div>
      <div
          class="item-child"
          v-if="match.bottomChild">
        <bracket-item
            :match="match.bottomChild"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$side-margin: 50px;
$vertical-margin: 5px;

.wrapper {
  display: flex;
  justify-content: center;
}

.item {
  display: flex;
  flex-direction: row-reverse;

  &-parent {
    position: relative;
    margin-left: $side-margin;
    display: flex;
    align-items: center;

    &:after {
      position: absolute;
      content: '';
      width: $side-margin/2;
      height: 2px;
      left: 0;
      top: 50%;
      background-color: #fff;
      transform: translateX(-100%);
    }
  }

  &-childrens {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-child {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-top: $vertical-margin;
    margin-bottom: $vertical-margin;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      background-color: #fff;
      right: 0;
      top: 50%;
      transform: translateX(100%);
      width: 25px;
      height: 2px;
    }

    &:after {
      content: '';
      position: absolute;
      background-color: #fff;
      right: -$side-margin / 2;
      height: calc(50% + 22px);
      width: 2px;
      top: 50%;
    }

    &:last-child {
      &:after {
        transform: translateY(-100%);
      }
    }

    &:only-child:after {
      display: none;
    }
  }
}
</style>