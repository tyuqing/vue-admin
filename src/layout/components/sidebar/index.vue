<template>
  <div class="sidebar-container">
    <logo></logo>
    <div>
      <i-menu ref="menu" class="side-bar-menu" theme="light" :active-name="activeMenu" width="auto">
        <sidebar-item v-for="route in MENU_LIST" :key="route.route" :item="route" />
      </i-menu>
    </div>
  </div>
</template>

<script>
import Logo from './logo.vue';
import SidebarItem from './sidebar-item.vue';
import MENU_LIST from './sidebar.config';

export default {
  components: {
    Logo,
    SidebarItem,
  },
  props: {},
  data() {
    return {
      MENU_LIST,
    };
  },
  computed: {
    activeMenu() {
      return this.$route.name;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sidebar-container {
  border-right: 1px solid #e5e6eb;
  position: relative;
}
</style>
