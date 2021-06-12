import React, { Component } from 'react';
import TeacherList from './TeacherList';
import { Dimmer, Loader } from 'semantic-ui-react';

class Teachers extends Component {

    state = {
        teacherList: [],
        addTeacherFormFlag: false,
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

    addTeacherToDatabase = teacherData => {
        fetch(`http://localhost:9292/teachers/`, {
            method: "POST",
            body: JSON.stringify({"name": teacherData.name, "grade": teacherData.grade}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => 
            this.addTeacherToState(data),
            this.toggleAddTeacherFormFlag()
        )
        .catch(error => console.log(error))
    }

    addTeacherToState = teacherData => {
        this.setState({...this.state, teacherList: [...this.state.teacherList, teacherData]})
    }

    deleteTeacher = teacherId => {
        fetch(`http://localhost:9292/teachers/${teacherId}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(this.removeTeacherFromState(teacherId))
        .catch(error => console.log(error))
    }

    removeTeacherFromState = teacherId => {
        let updatedState = this.state.teacherList.filter(
          item => item.id !== teacherId
        )
    
        this.setState({...this.state, teacherList: updatedState})

    }

    toggleAddTeacherFormFlag = () => {
        this.setState({...this.state, addTeacherFormFlag: !this.state.addTeacherFormFlag})
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
                <TeacherList 
                    teacherList={this.state.teacherList}
                    addTeacherFormFlag={this.state.addTeacherFormFlag}
                    toggleAddTeacherFormFlag={this.toggleAddTeacherFormFlag}
                    addTeacherToDatabase={this.addTeacherToDatabase}
                    addTeacherToState={this.addTeacherToState}
                    deleteTeacher={this.deleteTeacher}
                    removeTeacherFromState={this.removeTeacherFromState}
                />
                </div>
            )
        }
    }
}

export default Teachers;