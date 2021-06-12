import React, { Component } from 'react';
import TeacherList from './TeacherList';
import { Dimmer, Loader } from 'semantic-ui-react';

class Teachers extends Component {

    state = {
        teacherList: [],
        contentFetched: false
    }

    fetchTeacherList = () => {
        fetch(`http://localhost:9292/teachers`)
        .then(res => res.json())
        .then(data => this.setState({...this.state, teacherList: data, contentFetched: true}))
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.fetchTeacherList();
    }

    render() {
        if (!this.state.contentFetched) {
            return (
                <div className="spinner">
                   <Dimmer active inverted size="massive">
                      <Loader inverted>Loading...</Loader>
                   </Dimmer>
                </div>
            )
        }
        else {
            return (  
                <div>
                <TeacherList teacherList={this.state.teacherList}/>
                </div>
            )
        }
    }
}

export default Teachers;