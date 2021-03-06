const margin = 60;
const width = 800 - 2 * margin;
const height = 500 - 2 * margin;

function drawTitle (svg, props) {
    svg.append('text')
    .attr('id', "graphTitle" )
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('focusable', true)
    .attr('text-anchor', 'middle')
    .text(props.title)

    /*
    svg.append('desc')
    .attr('id', "graphDesc" )
    .text('A bar graph of ' + props.xtitle + ' versus ' + props.ytitle)

    svg.attr('aria-labelledby', 'graphTitle graphDesc')
    */

}

function drawAxisTitles (svg, props) {
    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('focusable', true)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(props.ytitle)

    svg.append('text')
        .attr('class', 'label')
        .attr('alt', '123123123')
        .attr('focusable', true)
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text(props.xtitle)
}

function getMaxValue(props) {
    let max = 0;
    props.datapoints.forEach((datapoint) => {
        if (parseInt(datapoint.value) > max){
            max = datapoint.value
        }
    })
    if (max === 0 ) { max = 100}
    return max
}

function drawGraph (props)  {
    let d3 = window.d3
    d3.select("svg").html("")
    const svg = d3.select('svg');
    drawAxisTitles(svg, props)
    drawTitle(svg, props)
    svg.attr('focusable', true)
    const chart = svg.append('g')
        .attr('focusable', true)
        .attr('transform', `translate(${margin}, ${margin})`);

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, getMaxValue(props)]);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(props.datapoints.map((d) => d.label))
        .padding(0.2)

    chart.append('g')
        .attr('focusable', true)
        .call(d3.axisLeft(yScale));
    
    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .attr('focusable', true)
        .call(d3.axisBottom(xScale));

    chart.selectAll()
        .data(props.datapoints)
        .enter()
        .append('rect')
        .attr('focusable', true)
        .attr('title', (s) => 'Bar number ' + s.number + ' labeled ' + s.label + ' with a value of ' + s.value)
        .attr('x', (s) => xScale(s.label))
        .attr('y', (s) => yScale(s.value))
        .attr('height', (s) => height - yScale(s.value))
        .attr('width', xScale.bandwidth())
}

export default {
    drawGraph
}