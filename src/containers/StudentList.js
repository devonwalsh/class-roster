import React, { Component } from 'react';
import { Button, Segment, Input } from 'semantic-ui-react';

class StudentList extends Component {

    render() {
        return ( 
            <div>
                <div className="teacher-details">
                    <h1>{this.props.teacherName} (Grade {this.props.grade})</h1>
                    {
                        this.props.addStudentFormFlag === false ? 
                        <Button onClick={() => this.props.toggleAddStudentFormFlag()} color="green">Add Student</Button> : 
                        <div>
                            <Input 
                            placeholder="Input student's name"
                            value={this.props.nameInput}
                            onChange={e => this.props.updateStudentName(e.target.value)}
                            />
                            <Button 
                            type="submit"
                            onClick={() => this.props.addStudentToDatabase(this.props.nameInput)}>
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
                            <Button onClick={() => this.props.deleteStudent(item.id)}>Delete</Button>
                        </span>
                    </Segment>)}
                </div>
            </div> 
        )
    }

}

export default StudentList;