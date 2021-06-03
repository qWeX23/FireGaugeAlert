<template>
  <div id="app">
    <h1>Fire Level</h1>
    <h3>{{fireLevels[fireLevelIndex]}}</h3>
    <v-gauge :value="gaugeValue" :width="width" :height="height" :options="options" :animationSpeed="animationSpeed"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VGauge from "vgauge";

@Component({
  components: {
    VGauge,
  },
})
export default class App extends Vue {
  
  fireLevels: string[];
  maxValue: number;
  gaugeValue: number;
  fireLevelIndex: number;

  data() {
    this.fireLevels = ["Green", "Candle", "Woodwick", "Trashcan", "Dumpster", "Nuclear", "Apocalypse", "You're all fired"];
    this.maxValue = 99
    this.gaugeValue =  0;

    this.fireLevelIndex = this.getFireLevelIndex(this.fireLevels, this.gaugeValue);

    console.log(this.fireLevelIndex);

    return {
      width: "925px",
      height: "725px",
      animationSpeed: 100,
      maxValue: this.maxValue,
      gaugeValue: this.gaugeValue,
      options: {
        lines: 8,
        angle: -0.1, // The span of the gauge arc
        lineWidth: 0.15, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
          length: 0.5, // // Relative to gauge radius
          strokeWidth: 0.015, // The thickness
          color: '#000000',
      },
        limitMax: true,
        limitMin: true,
        generateGradient: true,
        highDpiSupport: true,
        staticZones: [
          {strokeStyle: "#009933", min: 0, max: 13},
          {strokeStyle: "#1aff1a", min: 13, max: 25}, 
          {strokeStyle: "#ccff66", min: 25, max: 38},
          {strokeStyle: "#ffff00", min: 38, max: 50}, 
          {strokeStyle: "#ffcc00", min: 50, max: 63}, 
          {strokeStyle: "#ff9900", min: 63, max: 75}, 
          {strokeStyle: "#ff6633", min: 75, max: 88}, 
          {strokeStyle: "#ff0000", min: 88, max: 100}, 
        ]
      },
    };
  }
   async mounted() {
    const { text } = await (await fetch("/api/GetFireLevel")).json();
    this.gaugeValue = text;
  }

  getFireLevelIndex(fireLevels: string[], gaugeValue: number) {

    if(gaugeValue > 99) {
      gaugeValue = 99;
    }

    let arraySize = fireLevels.length;

    let index = Math.floor(((gaugeValue / 100 ) * arraySize));
    return index;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.gauge-title {
  visibility: hidden;
}
</style>
