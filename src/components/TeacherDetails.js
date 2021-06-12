import React, { Component } from 'react';
import StudentList from '../containers/StudentList';
import { Dimmer, Loader } from 'semantic-ui-react';

class TeacherDetails extends Component {

    state = {
        grade: null,
        teacherId: null,
        teacherName: '',
        students: []
    }

    fetchData = () => {
        fetch(`http://localhost:9292/teachers/${this.props.match.params.teacherId}`)
        .then(res => res.json())
        .then(data => this.setState({
            ...this.state,
            grade: data.grade,
            teacherId: data.id,
            teacherName: data.name,
            students: data.students
        }))
        .catch(error => console.log(error))
    }

    addStudentToDatabase = studentName => {
        fetch(`http://localhost:9292/teachers/${this.props.match.params.teacherId}/students`, {
            method: "POST",
            body: JSON.stringify({"name": studentName}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => this.addStudentToState(data))
        .catch(error => console.log(error))
    }

    addStudentToState = studentData => {
        this.setState({...this.state, students: [...this.state.students, studentData]})
    }

    deleteStudent = studentId => {
        fetch(`http://localhost:9292/students/${studentId}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(this.removeStudentFromState(studentId))
        .catch(error => console.log(error))
    }

    removeStudentFromState = studentId => {
        let updatedState = this.state.students.filter(
          item => item.id !== studentId
        )
    
        this.setState({...this.state, students: updatedState})

    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.teacherId === null) {
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
                <StudentList 
                    grade={this.state.grade}
                    teacherId={this.state.teacherId}
                    teacherName={this.state.teacherName}
                    studentList={this.state.students}
                    addStudentToDatabase={this.addStudentToDatabase}
                    addStudentToState={this.addStudentToState}
                    deleteStudent={this.deleteStudent}
                    removeStudentFromState={this.removeStudentFromState}
                />
            )
        }
    }
}

export default TeacherDetails;