import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid, Icon, Header } from 'semantic-ui-react'
import Generator from './components/generator'
import Preview from './components/preview';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { datapoints: [],
                        title: '',
                        xtitle: '',
                        ytitle: '' 
                    }
    }

    updatePreviewCallback = (datapoints, title, xtitle, ytitle) => {
        this.setState({datapoints, title, xtitle, ytitle})
    }

    render() {
        return (
        <div className="App">
            <Header size="huge">
            SVGraph
            <Header.Subheader>
                Making graphing accessible
            </Header.Subheader>
            </Header>
            
            <Grid centered divided celled>
                    <Generator updatePreview={this.updatePreviewCallback}/>
                
                    <Preview datapoints={this.state.datapoints} xtitle={this.state.xtitle} ytitle={this.state.ytitle} title={this.state.title} />
            </Grid>
        </div>
        );
    }
}

export default App;
