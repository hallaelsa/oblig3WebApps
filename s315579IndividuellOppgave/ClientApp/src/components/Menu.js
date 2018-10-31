import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './MyStyles.css';

export class Menu extends Component {
    displayName = Menu.name
    
    categoryClick(id) {
        this.props.navigateTo(id);
    }

    render() {
        return (
            <div className="menu-wrapper">
                {this.props.catGroup.map((group, index) => {
                    return (
                        <div className="menu-group" key={index}>
                            <Button bsStyle="link" onClick={() => this.categoryClick(group.parent.id)}> <h2 key={group.parent.id}>{group.parent.title}</h2></Button>

                            {group.categories.map((category) => {
                                return <Button bsStyle="link" key={category.id} onClick={() => this.categoryClick(category.id)}>{category.title}</Button>;
                            })}

                        </div>
                    );
                })}
            </div>
        );
    }
}
