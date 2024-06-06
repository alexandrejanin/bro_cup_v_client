<template>
  <table>
    <tr v-if="label.length>0">
      <th class="label">
        {{ label }}
      </th>
    </tr>
    <tr>
      <td>{{ topPlayer }}</td>
      <td
          :class="{
            won: topScore === maxScore,
            lost: bottomScore === maxScore,
            ongoing: topScore < maxScore && bottomScore < maxScore}">
        {{ topScore }}
      </td>
    </tr>
    <tr>
      <td>{{ bottomPlayer }}</td>
      <td
          :class="{
            won: bottomScore === maxScore,
            lost: topScore === maxScore,
            ongoing: topScore < maxScore && bottomScore < maxScore}">
        {{ bottomScore }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'MatchTable',
  props: {
    label: {
      type: String,
      default: "",
    },
    topPlayer: {
      type: String,
      default: "Joueur A"
    },
    topScore: {
      type: Number,
      default: 0
    },
    bottomPlayer: {
      type: String,
      default: "Joueur B"
    },
    bottomScore: {
      type: Number,
      default: 1
    },
    maxScore: {
      type: Number,
      default: 3,
    }
  },

}
</script>

<style lang="scss">
table {
  background-color: #1a1a1a;
  border-radius: 7px;
}

td {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0;

  &:nth-child(1) {
    background-color: beige;
  }

}

.won {
  background-color: lightgreen;
}

.lost {
  background-color: indianred;
}

.ongoing {
  background-color: #fafab6;
}

.label {
  color: white;
  padding-left: 8px;
}
</style>