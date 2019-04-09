import React, { Component } from 'react';
import { Button, Form, Icon, Grid, List, Header, Modal, Label } from 'semantic-ui-react'


class Generator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedDataPoints: [],
            value: '',
            label: '',
            xtitle: '',
            ytitle: '',
            title: ''
        }
    }

    handleClose = (event) => {
        this.setState({ modalOpen: false })
    }

    handleOpen = (event) => {
        this.setState({ modalOpen: true })
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
            this.handleClose()
        })
    }

    addElementModal() {
        return (
            <Modal focusable basic role="alertdialog" open={this.state.modalOpen} onClose={this.handleClose} trigger={<Button fluid icon="plus square" onClick={this.handleOpen} primary content="Add a data point"></Button>}>
                <Header icon='plus square' content='Add a data point' />
                <Modal.Content >
                    <Modal.Description>
                    <Form autoComplete="off">
                        <Form.Group widths='equal'>
                            <Label basic>Label for datapoint:</Label>
                            <Form.Input fluid name="label" aria-label="Input label for datapoint"  onChange={this.handleChange} />
                            <Label basic>Value for datapoint:</Label>
                            <Form.Input fluid name="value" aria-label="Input value for datapoint"   onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={this.addDataPoint}>
                        <Icon name='checkmark' />
                        Add to graph
                    </Button>
                    <Button  color='red' inverted onClick={this.handleClose}>
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
            <Grid.Column width={8} >

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
            
            {this.addElementModal()}

            {datapoints}
            
            </Grid.Column>

        )
    }
}

export default Generator;

