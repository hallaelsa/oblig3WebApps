import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import './MyStyles.css';

export class QuestionForm extends Component {
    displayName = QuestionForm.name

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            email: "",
            categoryId: this.props.categories ? this.props.categories[0].id : null,
            success: null
        };

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.getValidationStateQuestion = this.getValidationStateQuestion.bind(this);
        this.getValidationStateEmail = this.getValidationStateEmail.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    sendForm() {
        const question = this.state.question;
        const email = this.state.email;
        const categoryId = this.state.categoryId;

        if (email.length < 1 || question.length < 1 || categoryId === null) {
            return;
        } else if (this.getValidationStateEmail() === "error" || this.getValidationStateQuestion() === "error")
            return;
        

        const input = { Question: question, Email: email, CategoryId: categoryId };

        fetch('api/home/sendquestion', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response));
                this.setState({ success: JSON.stringify(response) });
            })
            .catch(error => console.error('Error:', error));

        
    }

    handleQuestionChange(e) {
        this.setState({ question: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleCategoryChange(e) {
        this.setState({ categoryId: e.target.value });
    }

    getValidationStateQuestion() {
        const length = this.state.question.length;


        if (length > 20) return 'success';
        else if (length > 10) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationStateEmail() {
        // email regex found online: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const ok = regex.test(this.state.email);
        const length = this.state.email.length;

        if (length < 1) return null;
        else if (ok) return 'success';
        else if (!ok) return 'error';
        return null;
    }

    getContent() {
        const categories = this.props.categories;

        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Contact us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup
                            validationState={this.getValidationStateQuestion()}
                        >
                            <ControlLabel>Send us a question and we will get back to you as soon as we can</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                type="text"
                                value={this.state.question}
                                placeholder="Enter your question here"
                                onChange={this.handleQuestionChange}
                            />
                            <HelpBlock>You must fill in a question.</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup
                            validationState={this.getValidationStateEmail()}
                        >
                            <ControlLabel>Provide an email we can respond to</ControlLabel>
                            <FormControl
                                id="formControlsEmail"
                                type="email"
                                label="Email address"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                            <HelpBlock>You must provide a valid email address.</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select a category</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                onChange={this.handleCategoryChange}
                            >
                                {
                                    categories.map((category) => {
                                        return <option key={category.title} value={category.id}>{category.title}</option>;
                                    })
                                }

                                <option value="0">Other</option>
                            </FormControl>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => this.sendForm()}>Send</Button>
                    <Button bsStyle="primary" onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </div>
        );
    }

    getFeedback() {
        console.log(this.state.success);
        const message = this.state.success ? "Your question has been sent." : "Something went wrong. Please try again.";
        const title = this.state.success ? "Thank you!" : "Error!";

        setTimeout(() => {
            this.props.handleClose();
        }, 3000);

        return (
            <div>
                <Modal.Header>
                    <h3>{title}</h3>
                </Modal.Header>
                <Modal.Body>
                   <h4> {message}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </div>
        );
    }

    render() {
        const content = this.state.success !== null ? this.getFeedback() : this.getContent(); 

        return (
            <div>
                {content}
            </div>
        );
    }
}
