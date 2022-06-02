<template>
  <div></div>
</template>

<script>
export default {
  name: 'RefreshModule',
  layout: 'LandingLayout',
  created() {
    this.goBack()
  },
  methods: {
    goBack() {
      this.$router.push('/search')
    },
  },
}
</script>
