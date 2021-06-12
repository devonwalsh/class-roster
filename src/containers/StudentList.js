import React, { Component } from 'react';
import { Button, Segment, Input } from 'semantic-ui-react';

class StudentList extends Component {

    state = {
        addStudentFormFlag: false,
        nameInput: '',
    }

    toggleAddStudentFormFlag = () => {
        this.setState({...this.state, addStudentFormFlag: !this.state.addStudentFormFlag})
    }

    render() {
        return ( 
            <div>
                <div className="teacher-details">
                    <h1>{this.props.teacherName} (Grade {this.props.grade})</h1>
                    {
                        this.state.addStudentFormFlag === false ? 
                        <Button onClick={() => this.toggleAddStudentFormFlag()} color="green">Add Student</Button> : 
                        <div>
                            <Input 
                            placeholder="Input student's name"
                            value={this.state.nameInput}
                            onChange={e => this.setState({...this.state, nameInput: e.target.value})}
                            />
                            <Button 
                            type="submit"
                            onClick={() => this.props.addStudentToDatabase(this.state.nameInput)}>
                                Submit
                            </Button>
                        </div>
                    }
                </div>
                <div className="student-list">
                    {this.props.studentList.map((item, key) => 
                    <Segment className="student" key={key}>
                        <span className="student-name">{item.name}</span>
                        <span class-name="student-buttons">
                            <Button>Edit</Button>
                            <Button>Move</Button>
                            <Button onClick={() => this.props.deleteStudent(item.id)}>Delete</Button>
                        </span>
                    </Segment>)}
                </div>
            </div> 
        )
    }

}

export default StudentList;