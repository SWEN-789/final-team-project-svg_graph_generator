import React, { Component } from 'react';
import { Button, Form, Icon, Grid, List, Header, Modal, Label } from 'semantic-ui-react'
import { CSVReader } from 'react-papaparse';

class Generator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedDataPoints: [],
            value: '',
            label: '',
            xtitle: '',
            ytitle: '',
            title: '',
            elementModalOpen: false,
            csvModalOpen: false
        }

        this.fileInput = React.createRef();
    }

    handleClose = (event) => {
        console.error(event.target, '---')
        this.setState({ [event.target.name]: false })
    }

    handleOpen = (event) => {
        console.error(event.target)
        this.setState({ [event.target.name]: true })
    }

    handleReadCSV = (data) => {
        console.log(data);
        this.setState({csvData: data}, () => {
            if (this.state.csvData) {
                let points = this.state.addedDataPoints
                this.state.csvData.data.forEach((datapoint) => {
                    points.push({value: datapoint[Object.keys(datapoint)[0]], label: datapoint[Object.keys(datapoint)[1]], number: points.length + 1})
                })
    
                this.setState({addedDataPoints: points, bar: '',value: ''}, () => {
                    this.props.updatePreview(this.state.addedDataPoints, this.state.title, this.state.xtitle, this.state.ytitle)
                    this.handleClose({target: {name: 'csvModalOpen'}})
                })
            }
        })
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    }
    
    handleImportOffer = () => {
        this.fileInput.current.click();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.props.updatePreview(this.state.addedDataPoints, this.state.title, this.state.xtitle, this.state.ytitle))
    }

    renderDataPoints = () => {
        return this.state.addedDataPoints.map((datapoint) => {
            return <List.Item>
                        <List.Header>
                            Bar #{datapoint.number}
                        </List.Header>
                        <List.List as='ul'>
                            <List.Item as='li'>Label:{datapoint.label}</List.Item>
                            <List.Item as='li'>Value:{datapoint.value}</List.Item>
                        </List.List>
                    </List.Item>
        })
    }

    addDataPoint = () => {
        let points = this.state.addedDataPoints
        points.push({value: this.state.value, label: this.state.label, number: points.length + 1})
        this.setState({addedDataPoints: points, bar: '',value: ''}, () => {
            this.props.updatePreview(this.state.addedDataPoints, this.state.title, this.state.xtitle, this.state.ytitle)
            this.handleClose({target: {name: 'elementModalOpen'}})
        })
    }

    addElementModal() {
        return (
            <Modal  basic open={this.state.elementModalOpen} onClose={this.handleClose} trigger={<Button name='elementModalOpen' fluid icon="plus square" onClick={this.handleOpen} primary content="Add a data point"></Button>}>
                <Header icon='plus square' content='Add a data point' />
                <Modal.Content >
                    <Modal.Description>
                    <Form autoComplete="off">
                        <Form.Group widths='equal'>
                            <Label basic>Label for datapoint:</Label>
                            <Form.Input autoFocus focusable fluid name="label" aria-label="Data point pop up menu is open Input label for datapoint"  onChange={this.handleChange} />
                            <Label basic>Value for datapoint:</Label>
                            <Form.Input fluid name="value" aria-label="Input value for datapoint"   onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button name='elementModalOpen' color='green' inverted onClick={this.addDataPoint}>
                        <Icon name='checkmark' />
                        Add to graph
                    </Button>
                    <Button name='elementModalOpen' color='red' inverted onClick={this.handleClose}>
                        <Icon name='remove' />
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

    render() {
        var datapoints = <Header as="h4" content="No datapoints added yet! Press the button to add data" />
        if (this.state.addedDataPoints.length !== 0) {
            datapoints = <List as='ul'>
                            <List.Header as="h4" content="Datapoints:" />
                            {this.renderDataPoints()}
                        </List>
        }

        return (
            <Grid.Column width={8} style={{maxHeight: '100vh', overflowY: 'auto'}}>

            <Header size="large"  textAlign="center">
                Bar Graph Generator
            </Header>
            <Form autoComplete="off">
                <Form.Group widths='equal'>
                    <Form.Input fluid name="title"  aria-label="Input graph title" label='Title:'  onChange={this.handleChange} />
                    <Form.Input fluid name="xtitle" aria-label="Input x axis title" label='X-Axis Title:'  onChange={this.handleChange} />
                    <Form.Input fluid name="ytitle"  aria-label="Input y axis title" label='Y-Axis Title:'  onChange={this.handleChange} />
                </Form.Group>
            </Form>
            <CSVReader
                        onFileLoaded={this.handleReadCSV}
                        inputRef={this.fileInput}
                        style={{display: 'none'}}
                        onError={this.handleOnError}
                        configOptions={{header: true /* Header row support */ }}
                        />
            <Button.Group>
            {this.addElementModal()}
            <Button.Or />
            <Button fluid  onClick={this.handleImportOffer}>
                <Icon name='upload' />
                Upload a CSV file
            </Button>
            </Button.Group>
            

            {datapoints}
            
            </Grid.Column>

        )
    }
}

export default Generator;

