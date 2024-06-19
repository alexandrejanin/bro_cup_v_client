<template>
  <div ref="twitchVideo"/>
</template>

<script>
export default {
  name: 'twitch-video',
  data() {
    return {player: null}
  },
  mounted() {
    const options = {
      width: 854,
      height: 480,
      channel: 'brocuplive',
    };
    this.player = new Twitch.Player(this.$refs.twitchVideo, options);
    this.player.setVolume(0.5);
  }
};
</script>