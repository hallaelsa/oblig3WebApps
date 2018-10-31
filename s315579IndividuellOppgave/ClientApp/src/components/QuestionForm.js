import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import './MyStyles.css';

export class QuestionForm extends Component {
    displayName = QuestionForm.name

    constructor(props) {
        super(props);
        this.state = {
            question: ""
        };

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    sendForm() {
        console.log(this.state.question);
        this.props.handleClose();
    }

    handleQuestionChange(e) {
        this.setState({ question: e.target.value });
    }

    getValidationState() {
        const length = this.state.question.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Contact us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}
                        >
                            <FormControl
                                type="text"
                                value={this.state.question}
                                placeholder="Enter your question here"
                                onChange={this.handleQuestionChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() =>this.sendForm()}>Send</Button>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </div>
        );
    }
}
