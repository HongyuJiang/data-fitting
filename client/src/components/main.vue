<template>

  <Canvas class="canvas" id='firstCanvas' :width='width' :height='height'/>
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
  data(){
    return {
      'width' : 1000, 
      'height' : 500
    }
  },
  components: {
    Canvas
  },
  mounted: function() {

     let canvasWidth = this.width - 100

     let canvasHeight = this.height - 100

     Drawing.setPropoties(canvasWidth, canvasHeight)

     let fixedArea = d3.select('#fixedArea')

     let dynamicdArea = d3.select('#dynamicArea')

     DataProvider.getCurveData().then(response => {

       let data1 = dsv.csvParse(response.data).filter(d => d.type == 1) 

       let data2 = dsv.csvParse(response.data).filter(d => d.type == 2) 
       
       this.dataRegular(data1)
       this.dataRegular(data2)
       
       Drawing.initScale(data1, 'x')
       Drawing.initScale(data1, 'y')
       Drawing.initScale(data1, 's')

       DataProvider.getScatterData().then(response => {

        let data3= dsv.csvParse(response.data)

        this.dataRegular(data3)

        Drawing.drawCurve(dynamicdArea, data1, 'curve-1')
        Drawing.drawCurve(dynamicdArea, data2, 'curve-2')
        Drawing.drawScatter(dynamicdArea, data3, 'scatter-1')

        Drawing.drawGrid(dynamicdArea, data1)
        Drawing.drawBorder(fixedArea)

        Drawing.drawXAxis(fixedArea, data1)
        Drawing.drawYAxis(fixedArea)

      })
     })

  },

  methods: {

    dataRegular(data){

      data.forEach(function(d){

        d.x = +d.x
        d.y = +d.y
        d.label = +d.label

      })
    }
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