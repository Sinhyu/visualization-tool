<template>
  <div id="app" class="bg-gray-600">
    <b-navbar
      type="dark"
      :variant="variant"
      ref="main-nav"
      id="main-nav"
      class="pl-3 pt-1 pb-1 m-0"
      toggleable="md"
      sticky
    >
      <b-navbar-brand href="#" to="/">
        <div class="">
          <strong
            class="flex animate__animated animate__bounceInLeft animate__bounceIn"
          >
            <div class="text-blue-400 animate-bounce ">U</div>
            <div class="animate-bounce-">N</div>
            <div class="animate-bounce-">I</div>
            <div class="animate-bounce-">Q</div>
          </strong>
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">
            <!-- <b-icon icon="house-fill"/> -->
          </b-nav-item>
          <b-nav-item
            v-for="{ path, name } of menus"
            :key="path"
            :active="currentRouteName === path"
            :to="'/' + path"
          >
            <span
              :class="
                currentRouteName === path
                  ? 'border-b-2 border-blue-400 pb-1'
                  : ''
              "
              >{{ name }}</span
            >
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item size="sm" to>
            <!-- <span class="bg-indigo-100 p-1 text-black text-sm rounded-md font-bold">UNIQ</span> -->
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" />-->

    <router-view />

    <!--
      BOTTOM COPYRIGHT
    -->
    <div class="no-round-corner border-t- border-blue-100" v-if="showOrHide()">
      <div fluid class="mt-2 mb-3 p-3 text-center text-white">
        <p class="godo italic">클라우드 엣지 기반 도시교통 브레인</p>
        <hr class="my-2" />
        <!-- <small class="text-muted">Copyright 2021. ETRI All rights reserved.</small> -->
        <small class="text-gray-300">
          Copyright ⓒ 2021. <em>Modutech</em> Inc. All rights reserved.
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import userState from "@/user-state";

export default {
  name: "App",
  mounted() {},
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  data() {
    return {
      userState,
      variant: "dark",
      variantLogo: "dark",
      currentRoute: "",
      menus: [
        {
          path: "SimulationList",
          name: "교통 시뮬레이션"
        },
        // {
        //   path: 'OptEnvList',
        //   name: '최적화환경'
        // },
        {
          path: "OptimizationList",
          name: "신호 최적화"
        },
        // {
        //   path: 'SignalEditor',
        //   name: '신호편집'
        // },
        {
          path: "Dashboard",
          name: "교통데이터 분석"
        },
        {
          path: "Junction",
          name: "교차로 조회"
        }
      ]
    };
  },
  methods: {
    showOrHide() {
      console.log(this.currentRouteName);
      const hides = [
        "Intro",
        "OptimizationResultMap",
        "SimulationResultMap",
        "OptimizationResultComparisonMap",
        "Junction"
      ];
      return !hides.includes(this.currentRouteName);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.godo {
  font-family: "Godo";
}

* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: green #343a40;
}

*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-button {
  display: none;
  /* background: #343a40; */
}

*::-webkit-scrollbar-track {
  background: #343a40;
}

*::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 15px;
  border: 3px solid #343a40;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: skyblue;
}

@font-face {
  font-family: "Godo";
  font-style: normal;
  font-weight: 100;
  src: url("//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoM.woff2")
      format("woff2"),
    url("//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoM.woff")
      format("woff");
}
</style>
