<template>

  <Canvas class="canvas" id='firstCanvas'/>
</template>

<script>
 
const d3 = require('d3');
import * as dsv from 'd3-dsv';
import Canvas from './canvas';
import DataProvider from '../DataProvider';
import Drawing from '../Drawing';

const props = {
  id: {
    type: String,
    default: () => 'table-container',
  },
};

export default {

  name: 'main-window',
  props,
  components: {
    Canvas
  },
  mounted: function() {

     DataProvider.getCurveData().then(response => {

       let data = dsv.csvParse(response.data)

       Drawing.drawCurve('firstCanvas', data)
     })
  },

  methods: {

  }
}
</script>

<style lang="css">


#table-container{
    position:absolute;
    width: 630px;
    height: 410px;
    
}

#table-container .chart-name{
   top: 0px;
   position: absolute 

}

#table-container table{
    margin-top:50px;
}

div .vuetable-body-wrapper{
    overflow-y: auto;
    height: 430px;
}


div .vuetable-body-wrapper *{
    font-size:8px !important;
}

</style>