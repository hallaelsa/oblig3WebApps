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
            allFaqs: [],
            isLoading: true,
            showModal: false,
            reset: false
        };

        fetch('api/home/categories')
            .then(response => response.json())
            .then(groups => {
                fetch('api/home/faqs')
                    .then(response => response.json())
                    .then(faqs => {
                        this.setState({ groupedCategories: groups, faqs: faqs, allFaqs: faqs, isLoading: false });
                    });
            });

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.search = this.search.bind(this);
    }

    loading() {
        return (
            <div className="loader"/>
        );
    }

    content() {
        return (
            <div>
                {this.state.showMenu &&
                    <Menu catGroup={this.state.groupedCategories} />
                }
                <div className="content-container">
                {this.state.groupedCategories.map((group) => {
                        return <Content key={group.parent.title} faqs={this.state.faqs} group={group} />;
                })}
                </div>
            </div>
        );
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }

    search(text) {
        if (text.length < 1)
            return;

        let toLower = text.toLowerCase();
        let stringArray = toLower.split(" ");
        let searchableWords = stringArray.filter(word => word.length > 3);
        searchableWords.sort(function (a, b) {
            return b.length - a.length;
        });
        let all = this.state.allFaqs;
        let result = [];
        let counter = 0;

        all.forEach((faq, index) => {

            searchableWords.every((word) => {
                //console.log(word);
                if (faq.question.includes(word)) {
                    //console.log(faq.question);
                    result[counter++] = this.state.allFaqs[index];
                    return;
                }
            });
           
        });

        if (result.length > 0)
            this.setState({ faqs: result, reset : false });

        
    }

    resetSearch() {
        console.log("reset!");
        this.setState({ faqs: this.state.allFaqs, reset : true });
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
                    search={this.search}
                    resetSearch={this.resetSearch}
                    reset={this.state.reset}
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
