const d3 = require('d3');

export default class Drawing {

    static drawGrid(container, data){

        let width = container.attr('width')
        let height = container.attr('height')

        let  xScale = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(curveData, d => d.label)])

        let yGridsData = [];
		
		for(let i=0;i<height;i+=20){
			
			yGridsData.push(i);
		}

        container.selectAll('.yGrids')
		.data(yGridsData)
		.enter()
		.append('line')
		.style("pointer-events", "none")
		.attr('class', 'gridline')
		.attr('x1',  0)
		.attr('x2',  width)
		.attr('y1', d => d)
		.attr('y2', d => d)
		.attr('ow', 1)
		.attr('stroke-width', 1)
		.attr('stroke', 'black')
		.attr('stroke-dasharray', '2 2 2 2')
		.attr('fill', 'none')
        .attr('stroke-opacity', 0.2)
        
        container.selectAll('.xGrids')
		.data(data)
		.enter()
		.append('line')
		.attr('class', 'gridline')
		.attr('x1', d => xScale(d.x))
		.attr('x2', d => xScale(d.x))
		.attr('y1', 0)
		.attr('y2', height + 100)
		.attr('stroke', 'black')
		.attr('ow', 1)
		.attr('stroke-width', 1)
		.attr('stroke-opacity', '0.3')
		.attr('fill', 'none')
    }
 
    static drawCurve(container, data, id){

        let  xScale = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(curveData, d => d.x)])
		
		let  yScale = d3.scaleLinear()
		.range([height, 0])
        .domain([0, d3.max(curveData, d => d.y)]).nice()

        let curveGenerator = d3.line()
		.curve(d3.curveBasis)
		.x(d => xScale(d.x))
		.y(d => yScale(d.y))
        
        container.selectAll('curves')
		.data(data)
		.enter()
		.append('path')
		.attr('stroke', d => accent(id))
		.datum(d => d)
		.attr('d', curveGenerator)
		.attr('fill', 'none')
		.attr('stroke-width', 3)
		.attr('id', id)

    }

    static drawScatter(container, data){

        let  xScale = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(curveData, d => d.x)])
		
		let  yScale = d3.scaleLinear()
		.range([height, 0])
		.domain([0, d3.max(curveData, d => d.y)]).nice()
		
        container.append('g')
        .selectAll('.point')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', d => xScale(d.x))
		.attr('cy', d => yScale(d.y))
		.attr('r', 3)
		.attr('or', 3)
		.attr('fill', 'steelblue')
		.attr('stroke', 'none')
    }

    static drawBorder(container){

        let width = container.attr('width')
        let height = container.attr('height')

        container.append('line')
			.attr('x1', 0)
			.attr('x2', width)
			.attr('y1', 0)
			.attr('y2', 0)
			.attr('stroke', 'black')
			.attr('fill', 'none')
			.attr('stroke-width', 3)
			
        container.append('line')
			.attr('x1', 0)
			.attr('x2', width)
			.attr('y1', height)
			.attr('y2', height)
			.attr('stroke', 'black')
			.attr('fill', 'none')
			.attr('stroke-width', 3)
			
        container.append('line')
			.attr('x1', 0)
			.attr('x2', 0)
			.attr('y1', 0)
			.attr('y2', height)
			.attr('stroke', 'black')
			.attr('fill', 'none')
			.attr('stroke-width', 3)
			
        container.append('line')
			.attr('x1', width)
			.attr('x2', width)
			.attr('y1', 0)
			.attr('y2', height)
			.attr('stroke', 'black')
			.attr('fill', 'none')
			.attr('stroke-width', 3)
	}
	
	static drawXAxis(){

		let  xScale = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(curveData, d => d.label)])
		
		let  yScale = d3.scaleLinear()
		.range([height, 0])
		.domain([0, d3.max(curveData, d => d.y)]).nice()
	}
    
}