import React, { Component } from 'react';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            search: ""
        };
        
        this.reset = this.reset.bind(this);
    }

    toggle() {
        this.setState({ isHidden: !this.state.isHidden });
        this.props.toggleMenu();
    }

    reset() {
        this.setState({search: ""});
        this.props.resetSearch();
    }

    render() {
        return (
            <div className="header">
                <Button bsStyle="link" className="header-menu-btn" onClick={() => this.toggle()}><span className={this.state.isHidden ? "glyphicon glyphicon-menu-hamburger" : "glyphicon glyphicon-remove"} />  Menu</Button>
                <form className="search-form-wrapper">
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text"
                                value={this.props.searchText}
                                placeholder="Search"
                                onChange={this.props.handleChangeSearch} />
                            <InputGroup.Button>
                                <Button bsStyle="primary"  onClick={() => this.reset()}>x</Button>
                                <Button bsStyle="primary"  onClick={() => this.props.search()}>Search</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>

                <div className="header-title">FAQ</div>
                <Button bsStyle="link" className="header-menu-btn" bsSize="large" onClick={this.props.showModal}>
                    <span className="glyphicon glyphicon-pencil"/>
                </Button>
            </div>
        );
    }
}
