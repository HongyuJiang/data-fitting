const d3 = require('d3');
const accentColors = d3.scaleOrdinal(d3.schemeSet2);

let globalWidth = 0, globalHeight = 0

let globalXScale = {}, globalYScale = {}, globalSScale = {}

let drawElements = []

export default class Drawing {

	static setPropoties(width, height){

		globalWidth = width
		globalHeight = height
	}

	static initScale(data, type){

		let width = globalWidth
        let height = globalHeight

		if(type == 'x'){

			let xScale = d3.scaleLinear()
			.range([0, width])
			.domain([0, d3.max(data, d => d.x)])

			globalXScale = xScale
		}
		else if(type == 'y'){

			let yScale = d3.scaleLinear()
			.range([0, height])
			.domain([0, d3.max(data, d => d.y)])

			globalYScale = yScale
		}
		else if(type == 's'){

			let sScale = d3.scaleLinear()
			.range([0, width])
			.domain([0, d3.max(data, d => d.label)])

			globalSScale = sScale

		}
	}

	static setScale(scales){

		this.reDraw(scales)
	}

	static getScales(){

		return {'x': globalXScale, 'y': globalYScale, 's': globalSScale}
	}

	static reDraw(scales){

		let xScale = scales['x']

		let yScale = scales['y']

		let sScale = scales['s']

		drawElements.forEach(function(element){

			if(scales['x'] != undefined){

				if(element.type == 'circle'){

					element.entity.attr('cx', d => xScale(d.x))
				}

				if(element.type == 'path'){

					let generator = element.entity[0]

					let drawEle = element.entity[1]

					generator.x(d => xScale(d.x))

					drawEle.attr('d', generator)
				}

				if(element.type == 'text'){

					element.entity.attr('x', d => xScale(d.x))
				}
			}

			if(scales['y'] != undefined){

				if(element.type == 'circle'){

					element.entity.attr('cy', d => yScale(d.y))
				}

				if(element.type == 'text'){

					element.entity.attr('y', d => yScale(d.y))
				}
			}

			if(scales['s'] != undefined){

				if(element.type == 'text'){

					element.entity.attr('x', d => sScale(d.label))
				}
			}
		})
	}
	
    static drawGrid(container, data){

        let width = globalWidth
        let height = globalHeight
		
		let xScale = globalXScale

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
		.attr('y2', height)
		.attr('stroke', 'black')
		.attr('ow', 1)
		.attr('stroke-width', 1)
		.attr('stroke-opacity', '0.3')
		.attr('fill', 'none')
    }
 
    static drawCurve(container, data, id){

		let xScale = globalXScale

		let yScale = globalYScale

        let curveGenerator = d3.line()
		.curve(d3.curveBasis)
		.x(d => xScale(d.x))
		.y(d => yScale(d.y))
		
        let curve = container
		.append('path')
		.datum(data)
		.attr('stroke', accentColors(id))
		.attr('d', curveGenerator)
		.attr('fill', 'none')
		.attr('stroke-width', 3)
		.attr('id', id)

		drawElements.push({'type': 'path', 'entity': [curveGenerator, curve]})

    }

    static drawScatter(container, data, id){
		
		let xScale = globalXScale

		let yScale = globalYScale

		let scatter = container.append('g')
		.attr('id', id)
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

		drawElements.push({'type': 'circle', 'entity': scatter})
    }

    static drawBorder(container){

        let width = globalWidth
        let height = globalHeight

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
	
	static drawXAxis(container, data){

		let height = globalHeight
		
		let xScale = globalXScale

		let circles = container
		.selectAll('.axisCircles')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', d => xScale(d.x) )
		.attr('cy', height + 10)
		.attr('r', 2)
		
		let texts = container
		.selectAll('.axisTexts')
		.data(data)
		.enter()
		.append('text')
		.attr('x', d => xScale(d.x))
		.attr('y', height + 20)
		//.attr('transform', 'rotate(45)')
		.attr('text-anchor', 'left')
		.attr('font-size', 11)
		.attr('font-family', 'Arial')
		.text(d => d.label)

		drawElements.push({'type': 'circle', 'entity': circles})

		drawElements.push({'type': 'text', 'entity': texts})
	}

	static drawYAxis(container){

		let width = globalWidth

		let yScale = globalYScale
		
		let yAxis = d3.axisRight(yScale)
			
		container.append("g")
			.attr("transform", "translate(" + width + ",0)")
			.call(yAxis)
			
	}

	static drawLabel(container, xValue, yValue){

		let xScale = globalXScale

		let yScale = globalYScale

		let x = globalXScale(xValue)

		let y = globalYScale(yValue)

		let label = container.append("g")
			.attr("transform", "translate(" + x + "," + y + ")");
		
		label.append('text')

		//label.append('')
	}
    
}