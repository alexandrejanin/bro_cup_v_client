<template>
  <table>
    <tr>
      <th> Joueur</th>
      <th class="score-header"> Score</th>
    </tr>
    <tr v-for="player in players">
      <td> {{ player.name }}</td>
      <td> {{ player.score }}</td>
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
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
        },
        {
          name: 'Joueur ???',
          score: 0,
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

.score-header{
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