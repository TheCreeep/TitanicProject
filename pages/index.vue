<template>
  <div id="index-page">
    <h1 class="title">Titanic</h1>
    <h2 class="subtitle">Les Stats</h2>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'LandingLayout',
  data() {
    return {
      data: [],
    }
  },
  created() {
  },
  methods: {
   
  },
}
</script>

<style lang="scss">
#index-page {
  height: 89.4vh;
  background: url('https://images6.alphacoders.com/928/thumb-1920-928363.jpg');
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  padding-top:100px;
  overflow: hidden;

  .title {
    font-size: 17em;
    margin: 0 0.5em 0 0.5em;
    animation:slideleft 1.5s ease-in-out;
    color:#F8F8FF;
  }
  
  .subtitle {
    font-size: 10em;
    margin: 0 0.5em 0 0;
    text-align: right;
    animation:slideright 1.5s ease-in-out;
    animation-delay: 0.5s;
    color:#F8F8FF;
  }
}


@keyframes slideleft {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}
@keyframes slideright {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
  }
 
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}


</style>
