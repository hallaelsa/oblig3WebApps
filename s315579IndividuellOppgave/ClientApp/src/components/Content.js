import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class Content extends Component {

    render() {
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Question
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            Answer
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Question
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            Answer
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        );
    }
}
