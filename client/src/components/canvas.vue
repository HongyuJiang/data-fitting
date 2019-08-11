<template>
<div id='canvas'> </div>
</template>

<script>
 
const d3 = require('d3');
import * as dsv from 'd3-dsv';

var margin = {top: 50, right: 10, bottom: 10, left: 50},
    width = 500,
    height = 350;

const props = {
  id: {
    type: String,
    default: () => 'trend-chart-container',
  }
};

export default {

  name: 'curve-canvas',
  props,
  mounted: function() {

    let svg = d3.select('#canvas').append('svg')
        .attr('width', width)
        .attr('height', height + 50)
        .append('g')
        .attr('transform', 'translate(0,0)')
        .attr('id', this.id)

  },

  methods: {

   
  },

}
</script>

<style lang="css">


.bubble-chart-container{
  
  position:absolute;
}

.bubble-container-name{

   position:absolute;
   width:100%;
   top:60%;
   color:rgba(255,255,255,0.5);
   font-size: 70px;
   text-align: center;
   text-anchor: middle;

}

</style>