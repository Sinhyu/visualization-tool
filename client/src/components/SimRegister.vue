<template>
  <div class="">
    <div class="space-y-2 bg-gray-600 p-3 rounded-lg mb-1">
      <!-- <div class="flex space-x-2 text-white"> -->
        <div class="flex space-x-2 text-white">
          <div class="w-28 text-right"> 아이디: </div>
          <input autofocus id="id" v-model="id" focus select class="border rounded px-1 text-black">
        </div>
      <!-- </div> -->
      <div class="flex space-x-2 text-white">
        <div class="flex-none w-28 text-right">설명:</div>
        <input id="description" v-model="description" class="border rounded px-1 text-black w-full">
      </div>
      <div class="flex space-x-2 text-white items-center">
        <div class="text-sm w-28 text-right">시작 날짜</div>
        <div class="flex space-x-2">
          <div class="text-black">
            <input v-model="fromDate" type="date" class="border rounded px-1"/>
          </div>
          <div class="text-black">
            <input v-model="fromTime" type="time" class="border rounded px-1"/>
          </div>
        </div>
      </div>
      <div class="flex space-x-2 text-white items-center">
        <div class="text-sm w-28 text-right">종료 날짜</div>
        <div class="text-black">
          <input v-model="toDate" type="date" class="border rounded px-1"/>
        </div>
        <div class="text-black">
          <input v-model="toTime" type="time" class="border rounded px-1"/>
        </div>
      </div>

        <div class="flex text-white space-x-2 items-center">
          <div class="flex-none text-sm w-28 text-right"> 통계주기 </div>
          <b-form-select class="" v-model="periodSelected" :options="periodOptions" size="sm"/>
        </div>
        <div class="flex text-white space-x-2 items-center">
          <div class="flex-none text-sm w-28 text-right">가시화주기</div>
          <b-form-select v-model="intervalSelected" :options="intervalOptions" size="sm"/>
        </div>
        <div class="flex text-white space-x-2 items-center">
          <div class="flex-none text-sm w-28 text-right">대상지역</div>
          <b-form-select v-model="regionSelected" :options="regionOptions" size="sm"/>
        </div>

        <div class="flex space-x-2 items-center">
          <div class="flex-none text-white text-sm w-28 text-right">이미지</div>
          <b-form-select v-model="dockerImage" :options="images" size="sm"/>
          <!-- <b-form-input v-model="dockerImage" type="text" size="sm" class="w-max"/> -->
        </div>
    </div>
    <!--
      <div class="mt-2 bg-gray-600 rounded-lg p-2">
      <div class="text-white font-bold p-2 flex items-center space-x-1">
        <div>
        시뮬레이션 지역 선택
        </div>
        <button @click="selectRegion" class="bg-yellow-500 rounded text-sm text-black px-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
      <div
        :ref="mapId"
        :id="mapId"
        :style="{height: '500px'}"
        class="map"
      />
    </div>
    -->

    <b-card bg-variant="dark" text-variant="light" border-variant="dark" class="mt-1">
      <b-card-text class="text-right">

        <b-button class="mr-1" @click="openInfobox" variant="primary">
          설정보기
        </b-button>
        <b-button class="mr-1" @click="save" variant="primary">
          저장 <b-spinner small label="Spinning" v-if="loading"></b-spinner>
        </b-button>
        <b-button class="mr-1" @click="hide" variant="secondary">
          닫기
        </b-button>
      </b-card-text>
    </b-card>

    <b-modal title="설정정보" ref="config-info" size="xl">
      <pre class="">{{ currentConfig }}</pre>
    </b-modal>

  </div>
</template>

<script src="./sim-register"></script>

<style scoped>
.map {
    width: 100%;
  }

.no-border-radius {
  border-radius: 10px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
  {
  transform: translateX(10px);
  opacity: 0;
}
</style>
