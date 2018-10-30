import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { isHidden: true };
    }

    render() {
        return (
            <PageHeader>
                
                <Button bsStyle="link" onClick={() => this.toggle()}><span className={this.state.isHidden ? "glyphicon glyphicon-menu-hamburger" : "glyphicon glyphicon-remove"}></span>  Menu</Button>
                FAQ
            </PageHeader>
        );
    }

    toggle() {
        this.setState({ isHidden: !this.state.isHidden });
        this.props.toggleMenu();
    }
}
