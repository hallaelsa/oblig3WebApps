import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class Content extends Component {

    render() {
        const group = this.props.group;
        const faqs = this.props.faqs;

        return (
            <div className="contents-wrapper" >
                <h2>{group.parent.title}</h2>

                {group.categories.map((category) => {
                    const filteredQA = faqs.filter((aq) => aq.category.id === category.id);
                    
                    return (
                        <div key={category.id + category.title}>
                            <h4>{category.title}</h4>

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
