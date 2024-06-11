<script setup>
import BracketItem from "./BracketItem.vue";
</script>

<template>
  <div class="wrapper">
    <BracketItem :tournament-tree="tournamentTree"/>
  </div>
</template>

<script>
export default {
  props: {
    tournamentTree: {
      default: {
        label: "Grande Finale",
        // topPlayer: "Joueur ???",
        // bottomPlayer: "Joueur ???",
        maxScore: 3,
        topChild: {
          label: "Finale Winners",
          topPlayer: "Joueur ???",
          bottomPlayer: "Joueur ???",
          topChild: {
            // label: "Demi-Finale 1",
            topPlayer: "Joueur ???",
            bottomPlayer: "Joueur ???",
            topChild: {
              // label: "Quart 1",
              topPlayer: "Joueur A1",
              bottomPlayer: "Joueur B4",
              topScore: 2,
              bottomScore: 1,
            },
            bottomChild: {
              // label: "Quart 2",
              topPlayer: "Joueur A2",
              bottomPlayer: "Joueur B3",
            },
          },
          bottomChild: {
            // label: "Demi-Finale 2",
            topPlayer: "Joueur ???",
            bottomPlayer: "Joueur ???",
            topChild: {
              // label: "Quart 3",
              topPlayer: "Joueur A3",
              bottomPlayer: "Joueur B2",
            },
            bottomChild: {
              // label: "Quart 4",
              topPlayer: "Joueur A4",
              bottomPlayer: "Joueur B1",
            },
          },
        },
        bottomChild: {
          label: "Finale Losers",
          topPlayer: "Joueur ???",
          bottomPlayer: "Joueur ???",
          topChild: "(w7)",
          bottomChild: {
            topPlayer: "Joueur ???",
            bottomPlayer: "Joueur ???",
            topChild: {
              topPlayer: "Joueur ???",
              bottomPlayer: "Joueur ???",
              topChild: "(w5)",
              bottomChild: {
                topPlayer: "Joueur ???",
                bottomPlayer: "Joueur ???",
                topChild: {
                  topPlayer: "Joueur ???",
                  bottomPlayer: "Joueur ???",
                  topChild: "(w1)",
                  bottomChild: {
                    topPlayer: "Joueur A5",
                    bottomPlayer: "Joueur B8",
                  }
                },
                bottomChild: {
                  topPlayer: "Joueur ???",
                  bottomPlayer: "Joueur ???",
                  topChild: "(w2)",
                  bottomChild: {
                    topPlayer: "Joueur A6",
                    bottomPlayer: "Joueur B7",
                  }
                }
              },
            },
            bottomChild: {
              topPlayer: "Joueur ???",
              bottomPlayer: "Joueur ???",
              topChild: "(w6)",
              bottomChild: {
                topPlayer: "Joueur ???",
                bottomPlayer: "Joueur ???",
                topChild: {
                  topPlayer: "Joueur ???",
                  bottomPlayer: "Joueur ???",
                  topChild: "(w3)",
                  bottomChild: {
                    topPlayer: "Joueur A7",
                    bottomPlayer: "Joueur B6",
                  }
                },
                bottomChild: {
                  topPlayer: "Joueur ???",
                  bottomPlayer: "Joueur ???",
                  topChild: "(w4)",
                  bottomChild: {
                    topPlayer: "Joueur A8",
                    bottomPlayer: "Joueur B5",
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

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