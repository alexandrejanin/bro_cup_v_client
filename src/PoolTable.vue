<template>
  <!--  <p style="display: inline-block"> Jeu 1/5</p>-->
  <table style="display: inline-block">
    <tr v-for="{src,filter,selected} in [
                {src:'../src/assets/geoguessr-square.png',filter:'opacity(0.5)'},
                {src:'../src/assets/trackmania.png', selected:true},
                {src:'../src/assets/gdash.svg'},
                {src:'../src/assets/golf.png'},
                {src:'../src/assets/quake.webp'},
            ]">
      <img
          :class="{selected}"
          :style="'vertical-align: middle;padding: 5px;height: 50px;filter:' + filter"
          :src="src"
          :alt="src">
    </tr>
  </table>
  <table style="display: inline-block">
    <tr>
      <th> Joueur</th>
      <th class="score-header"> Score</th>
    </tr>
    <tr
        v-for="player in players">
      <td> {{ player.name }}</td>
      <td
          :class="{won: player.rank <= 4, lost: player.rank >= 5}">
        {{ player.score }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'PoolTable',
  props: {
    players: {
      type: Array,
      default: [
        {
          name: 'Joueur 1',
          score: 0,
          rank: 1,
        },
        {
          name: 'Joueur 2',
          score: 0,
          rank: 2,
        },
        {
          name: 'Joueur 3',
          score: 0,
          rank: 3,
        },
        {
          name: 'Joueur 4',
          score: 0,
          rank: 4,
        },
        {
          name: 'Joueur 5',
          score: 0,
          rank: 5,
        },
        {
          name: 'Joueur 6',
          score: 0,
          rank: 6,
        },
        {
          name: 'Joueur 7',
          score: 0,
          rank: 7,
        },
        {
          name: 'Joueur 8',
          score: 0,
          rank: 8,
        },
      ],
    }
  }
}
</script>

<style lang="scss">
table {
  background-color: #1a1a1a;
  border-radius: 7px;
  margin: 5px;
}

th {
  color: white;
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

.selected {
  background-color: orange;
}

.score-header {
  padding-right: 10px;
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