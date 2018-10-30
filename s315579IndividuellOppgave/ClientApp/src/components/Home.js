import React, { Component } from 'react';
import { Menu } from './Menu';
import { Header } from './Header';
import Content from './Content';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
        <div>
            <Header />
            <Menu />
            <Content/>
        </div>
    );
  }
}
