import React, { Component } from 'react';
import { Menu } from './Menu';
import { Header } from './Header';
import { QuestionForm } from './QuestionForm';
import Content from './Content';
import { Modal } from 'react-bootstrap';
import './MyStyles.css';

export class Home extends Component {
    displayName = Home.name

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            groupedCategories: [],
            faqs: [],
            isLoading: true,
            showModal: false
        };

        fetch('api/home/categories')
            .then(response => response.json())
            .then(groups => {
                fetch('api/home/faqs')
                    .then(response => response.json())
                    .then(faqs => {
                        console.log(groups);
                        this.setState({ groupedCategories: groups, faqs: faqs, isLoading: false });
                    });
            });

        this.toggleMenu = this.toggleMenu.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
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

    handleClose() {
        this.setState({ showModal: false });
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    render() {
        const content = this.state.isLoading ? this.loading() : this.content();
        const groups = this.state.groupedCategories.map(c => c.categories);
        const subCategories = groups.flat(2);

        return (
            <div>
                <Header
                    toggleMenu={this.toggleMenu}
                    showModal={this.handleShow}
                />
                {content}
                
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <QuestionForm
                        handleClose={this.handleClose}
                        categories={subCategories}
                    />
                </Modal>
            </div>
        );
    }
}
