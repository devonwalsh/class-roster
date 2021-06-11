import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Teachers extends Component {

    state = {
        teacherList: []
    }

    fetchTeacherList = () => {
        fetch(`http://localhost:9292/teachers`)
        .then(res => res.json())
        .then(data => this.setState({teacherList: data}))
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.fetchTeacherList();
    }

    render() {

        return (  
            <div>
                {this.state.teacherList.map(item => 
                    <span className="teacher-button">
                        <Button as={NavLink} exact to={`/teachers/${item.id}`} color="blue" size="big">{item.name}'s Grade {item.grade} Class</Button>
                    </span>
                )}
            </div>
        )
    }

}

export default Teachers;