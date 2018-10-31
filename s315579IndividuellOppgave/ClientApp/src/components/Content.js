import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upVoteId: 0,
            downVoteId: 0
        };
    }

    upVote(id) {
        console.log(id);

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
        console.log(id);
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
                                    <Panel key={faq.id}>
                                        <Panel.Heading>
                                            <Panel.Title toggle>
                                                {faq.question}
                                            </Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Collapse>
                                            <Panel.Body>
                                                {faq.answer}
                                                <div className="votes-container">
                                                    <Button bsStyle="link" onClick={() => this.upVote(faq.id)}>
                                                        <span className="glyphicon glyphicon-thumbs-up vote" >{this.state.upVoteId === faq.id ? ++faq.upVotes : faq.upVotes}</span>
                                                    </Button>

                                                    <Button bsStyle="link" onClick={() => this.downVote(faq.id)}>
                                                        <span className="glyphicon glyphicon-thumbs-down vote">{faq.downVotes}</span>
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
