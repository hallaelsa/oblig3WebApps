import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './MyStyles.css';

export class Menu extends Component {
    displayName = Menu.name

    render() {
        return (
            <div className="menu-wrapper">
                {this.props.catGroup.map((group, index) => {
                    return (
                        <div className="menu-group" key={index}>
                            <Button href={"#"+group.parent.id} bsStyle="link" > <h2 key={group.parent.id}>{group.parent.title}</h2></Button>

                            {group.categories.map((category) => {
                                return <Button href={"#"+category.id} bsStyle="link" key={category.id} >{category.title}</Button>;
                            })}

                        </div>
                    );
                })}
            </div>
        );
    }
}
