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
            faqs: [],
            isLoading: true
        };

        //fetch('api/SampleData/WeatherForecasts')
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ forecasts: data, loading: false });
        //    });

        fetch('api/Home/Categories')
            .then(response => response.json())
            .then(groups => {
                fetch('api/Home/FAQs')
                    .then(response => response.json())
                    .then(faqs => {
                        this.setState({ groupedCategories: groups, faqs: faqs, isLoading: false });
                    });
            });

        this.toggleMenu = this.toggleMenu.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    loading() {
        return (
            <div className="loader"/>
        );
    }

    content() {
        return (
            <div>
                {this.state.showMenu && <Menu catGroup={this.state.groupedCategories} navigateTo={this.navigateTo} />}
                <div className="content-container">
                {this.state.groupedCategories.map((group) => {
                    return <Content key={group.parent.title} faqs={this.state.faqs} group={group} />
                })}
                </div>
            </div>
        );
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }

    navigateTo(id) {
        console.log(id);
    }

    render() {
        var content = this.state.isLoading ? this.loading() : this.content();

        return (
            <div>
                <Header
                    toggleMenu={this.toggleMenu} />
                {content}

            </div>
        );
    }
}
