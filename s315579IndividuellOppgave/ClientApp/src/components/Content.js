import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upVoteId: 0,
            downVoteId: 0,
            expandId: 0
        };
    }

    upVote(id) {
        fetch('api/home/upvote/'+id, {
            method: 'POST', 
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response));
                this.setState({ upVoteId: id, downVoteId: 0});
            })
            .catch(error => console.error('Error:', error));
    }

    downVote(id) {

        fetch('api/home/downvote/' + id, {
            method: 'POST',
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response));
                this.setState({ upVoteId: 0, downVoteId: id });
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        const group = this.props.group;
        const faqs = this.props.faqs;

        return (
            <div className="contents-wrapper" >
                <h2 id={group.parent.id}>{group.parent.title}</h2>

                {group.categories.map((category) => {
                    const filteredQA = faqs.filter((aq) => aq.category.id === category.id);
                    
                    return (
                        <div key={category.id + category.title}>
                            <h4 id={category.id}>{category.title}</h4>

                            {filteredQA.map((faq) => {
                                return (
                                    <Panel key={faq.id} expanded={this.state.expandId === faq.id ? true : false} onToggle={() => { }}>
                                        <Panel.Heading>
                                            <Panel.Title >
                                                <div className="toggle-btn" onClick={() => this.setState({ expandId: this.state.expandId === faq.id ? 0 : faq.id })}>
                                                    <span className={this.state.expandId === faq.id ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"} />
                                                </div>
                                                <div className="title">Question: {faq.question}</div>
                                            </Panel.Title>
                                        </Panel.Heading>
                                            <Panel.Collapse>
                                                <Panel.Body>
                                                    Answer: {faq.answer}
                                                    <div className="votes-container">
                                                        <Button bsStyle="link" onClick={() => this.upVote(faq.id)}>
                                                            <span className="glyphicon glyphicon-thumbs-up vote" >{this.state.upVoteId === faq.id ? ++faq.upVotes : faq.upVotes}</span>
                                                        </Button>

                                                        <Button bsStyle="link" onClick={() => this.downVote(faq.id)}>
                                                            <span className="glyphicon glyphicon-thumbs-down vote">{this.state.downVoteId === faq.id ? ++faq.downVotes : faq.downVotes}</span>
                                                        </Button>
                                                    </div>
                                                </Panel.Body>
                                            </Panel.Collapse>
                                    </Panel>
                            );
                            })}

                        </div>
                    );

                })}

            </div>
            
            );

    }
}
