import React, { Component } from 'react';
import { Button, Segment, Input } from 'semantic-ui-react';

class TeacherDetails extends Component {

    state = {
        grade: null,
        teacherId: null,
        teacherName: '',
        students: [],
        addStudentFormFlag: false,
        nameInput: ''
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

    toggleAddStudentFormFlag = () => {
        this.setState({...this.state, addStudentFormFlag: !this.state.addStudentFormFlag})
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

    componentDidMount() {
        this.fetchData();
    }

    render() {

        return (  
            <div>
                <div className="teacher-details">
                    <h1>{this.state.teacherName} (Grade {this.state.grade})</h1>
                    {
                        this.state.addStudentFormFlag === false ? 
                        <Button onClick={() => this.toggleAddStudentFormFlag()} color="green">Add Student</Button> : 
                        <div>
                            <Input 
                            placeholder="Input student's name"
                            value={this.state.searchTerm}
                            onChange={e => this.setState({...this.state, nameInput: e.target.value})}
                            />
                            <Button 
                            type="submit"
                            onClick={() => this.addStudentToDatabase(this.state.nameInput)}>
                                Submit
                            </Button>
                        </div>
                    }
                </div>
                <div className="student-list">
                    {this.state.students.map(item => 
                    <Segment className="student" studentData={item}>
                        <span className="student-name">{item.name}</span>
                        <span class-name="student-buttons">
                            <Button>Edit</Button>
                            <Button>Move</Button>
                            <Button onClick={() => this.deleteStudent(item.id)}>Delete</Button>
                        </span>
                    </Segment>)}
                </div>
            </div>
        )

    }
}

export default TeacherDetails;