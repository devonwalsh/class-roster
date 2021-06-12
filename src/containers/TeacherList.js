import React, { Component } from 'react';
import { Button, Segment, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class TeacherList extends Component {

    render() {
        return (  
                <div className="teacher-list">
                {
                    this.props.addTeacherFormFlag === false ? 
                    <Button onClick={() => this.props.toggleAddTeacherFormFlag()} color="green">Add Teacher</Button> : 
                    <div>
                        <Input 
                        placeholder="Input teacher's name"
                        value={this.props.nameInput}
                        onChange={e => this.props.updateTeacherName(e.target.value)}
                        />
                        <Input 
                        placeholder="Input teacher's grade"
                        value={this.props.gradeInput}
                        onChange={e => this.props.updateTeacherGrade(e.target.value)}
                        />
                        <Button 
                        type="submit"
                        onClick={() => 
                            this.props.addTeacherToDatabase({"name": this.props.nameInput, "grade": this.props.gradeInput})
                        }>
                            Submit
                        </Button>
                    </div>
                }
                {this.props.teacherList.map((item, key) => 
                        <Segment color="blue" size="big" className="teacher" key={key}>
                            <span className="teacher-name">{item.name} (Grade {item.grade})</span>
                            <span className="teacher-buttons">
                            <Button as={NavLink} exact to={`/teachers/${item.id}`}>View</Button>
                            <Button onClick={() => this.props.deleteTeacher(item.id)}>Delete</Button>
                            </span>
                        </Segment>
                )}
            </div>
        )
    }

}

export default TeacherList;