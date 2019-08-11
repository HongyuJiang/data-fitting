<template>
  <div id='canvas'> </div>
</template>

<script>
 
const d3 = require('d3');
import * as dsv from 'd3-dsv';
import Drawing from '../Drawing'

const props = {
  id: {
    type: String,
    default: () => 'trend-chart-container',
  },
  width:{
    type: Number,
    default: () => 1000,
  },
  height:{
    type: Number,
    default: () => 500,
  },
  
};

export default {

  name: 'curve-canvas',
  props,
  mounted: function() {

    this.canvasWidth = this.width - 100
    this.canvasHeight = this.height - 100

    let svg = d3.select('#canvas').append('svg')
        .attr('width', this.width)
        .attr('height', this.height)

    svg.append('rect')
      .attr('transform', 'translate(50,50)')
      .attr('width', this.canvasWidth)
      .attr('height', this.canvasHeight)
      .attr('fill','white')
        
    this.canvas = svg.append('g')
        .attr('transform', 'translate(50,50)')
        .attr('width', this.canvasWidth)
        .attr('height', this.canvasHeight)
        .attr('id', this.id)

    svg.append("clipPath")     
		  .attr("id", "rect-clip") 
      .append("rect")           
      .attr("x", 0)           
      .attr("y", 0)         
      .attr("width", this.canvasWidth)
      .attr("height",this.canvasHeight)

    this.canvas.append('g').attr('id', 'fixedArea')

    let clipedArea = this.canvas.append('g').attr("clip-path","url(#rect-clip)")

    let dynamicArea = clipedArea
    .append('g')
    .attr('id', 'dynamicArea')
    //.attr("clip-path","url(#rect-clip)")

		let control_layer = svg.append('g')
		
    control_layer.append('rect')
		.attr('fill', 'none')
		.attr('width', this.width)
		.attr('height', this.height)
		.style("pointer-events", "all")
		.call(d3.zoom()
		.scaleExtent([1, 8])
		.translateExtent([[0, 0], [this.width + 90, this.height + 100]])
		.on("zoom", this.zoomed))
		.on('click', function(d){
			
			d3.select('#tooltip')
			.style('display', 'none')
    })
    
  },

  methods: {

    zoomed() {
			
      
      //let newX = d3.event.transform.rescaleX(x)
			
			//gX.call(xAxis.scale(newX));
			
			//container.selectAll('.bin')
			//	.attr('x', d => newX(d.date) - 5)
      //	.attr('width', 1 / data.length * 250 * d3.event.transform.k)
      
      let xScale = Drawing.getScales()['x']

      let yScale = Drawing.getScales()['y']

      let sScale = Drawing.getScales()['s']

      let newX = d3.event.transform.rescaleX(xScale)

      //Drawing.setScale({'x': newX})
			
			//this.canvas.select('#dynamicArea').attr("transform", d3.event.transform);
			
			/*xTickText
			.attr('transform', function(d){
				
				let x = d3.event.transform.rescaleX(xScale)(d.label) 
				
				let y = height + 20
				
				return 'translate(' + x + ',' + y + ')'
			})
			
		  
			locked.selectAll('circle').attr('r', function(d){
				
				let or = d3.select(this).attr('or')
				
				let nr = or / d3.event.transform.k
				
				return nr
			})
		  
			locked.selectAll('.gridline').attr('stroke-width', function(d){
				
				let ow = d3.select(this).attr('ow')
				
				let nw = ow / d3.event.transform.k
				
				return nw
			})
		  */
		}
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