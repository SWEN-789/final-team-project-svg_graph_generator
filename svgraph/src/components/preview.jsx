import React, { Component } from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react'
import graphing from '../utils/graphing'


class Preview extends Component {
    componentWillReceiveProps(props) {
        graphing.drawGraph(props)
    }

    download = () => {
        let svg = document.getElementById('svg_graph')
        var data = (new XMLSerializer()).serializeToString(svg)
        var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = URL.createObjectURL(svgBlob);
        var element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', 'graph.svg');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    render() {
        return (
            <Grid.Column width={8}>
            <Header size="large" textAlign="center">
                Bar Graph Preview
            </Header>
            <Segment id="graph">
                <svg id="svg_graph" style={{width:500, height:300}}/>
            </Segment>

            <Button fluid id="downloadsvg" icon="download" primary content="Download the graph" onClick={this.download}></Button>
            </Grid.Column>
        )
    }
}

export default Preview;

