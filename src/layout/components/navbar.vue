<template>
  <div class="navbar">
    <Breadcrumb></Breadcrumb>
    <div class="m-info">
        <div class="f-csp u-nav_user_name">
          <img class="avatar" :src="avatar + '&s=60'" width="30px" height="30px" />
          <Icon class="arrow" type="arrow-down-b"></Icon>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from './breadcrumb.vue';

export default {
  components: {
    Breadcrumb,
  },
  props: {},
  data() {
    return {
      profileModal: false,
    };
  },
  computed: {
    ...mapGetters(['avatar']),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        // TODO the next of logout
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e6eb;
}
.product-select {
  flex: 1 1 auto;
}
/*用户头像*/
.m-info {
  flex: 0 0 84px;
  border-left: 1px solid #e5e6eb;
  line-height: 64px;
  /* 用户名 */
  .u-nav_user_name {
    width: 53px;
    height: 59px;
    margin-left: 15px;
    .avatar {
      position: relative;
      top: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .arrow {
      color: #90a4ae;
      margin-left: 5px;
    }
  }
}
</style>
