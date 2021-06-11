import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {

    state = {
        activeItem: 'homepage'
    }

    handleClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu className="Navigation">
                <Menu.Item
                    as={NavLink} exact to="/"
                    name='homepage'
                    active={activeItem === 'homepage'}
                    onClick={this.handleClick}>
                    Home
                </Menu.Item>
                <Menu.Item
                    as={NavLink} exact to="/teachers"
                    name='teachers'
                    active={activeItem === 'teachers'}
                    onClick={this.handleClick}>
                    Teacher List
                </Menu.Item>
            </Menu>
        )
    }
}

export default Navigation;