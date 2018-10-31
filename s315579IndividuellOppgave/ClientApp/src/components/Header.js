import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { isHidden: true };
    }

    toggle() {
        this.setState({ isHidden: !this.state.isHidden });
        this.props.toggleMenu();
    }

    render() {
        return (
            <div className="header">
                <Button bsStyle="link" className="header-menu-btn" onClick={() => this.toggle()}><span className={this.state.isHidden ? "glyphicon glyphicon-menu-hamburger" : "glyphicon glyphicon-remove"} />  Menu</Button>
                <div className="header-title">FAQ</div>
            </div>
        );
    }
}
