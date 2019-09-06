<template>
  <div class="g-wrap">
    <sidebar class="g-left" />
    <div class="g-right">
      <div class="g-right_top">
        <navbar />
      </div>
        <section class="g-app-main">
            <router-view />
        </section>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components/index';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/layout.scss';
.g-left {
  background: #fefefe;
}
.g-app-main {
  background-color: #f5f6fa;
}
</style>
