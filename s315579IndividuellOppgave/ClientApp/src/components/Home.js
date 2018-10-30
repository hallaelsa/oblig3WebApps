import React, { Component } from 'react';
import { Menu } from './Menu';
import { Header } from './Header';
import Content from './Content';
import './MyStyles.css';

export class Home extends Component {
    displayName = Home.name

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            groupedCategories: [],
            loading: true
        };

        fetch('api/Home/Categories')
            .then(response => response.json())
            .then(data => {
                this.setState({ groupedCategories: data, loading: false });
                console.log(data);
            });

        this.toggleMenu = this.toggleMenu.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    render() {
        var content = this.state.loading ? this.loading() : this.content();

        return (
            <div>
                <Header
                    toggleMenu={this.toggleMenu} />
                {content}
                <Content />
            </div>
        );
    }

    loading() {
        return (
            <div className="loader"></div>
        );
    }

    content() {
        return (
            this.state.showMenu && <Menu catGroup={this.state.groupedCategories} navigateTo={this.navigateTo} />
        );
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu })
    }

    navigateTo(id) {
        console.log(id);
    }
}
