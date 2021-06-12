import React, { Component } from 'react';
import { Button, Segment, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class TeacherList extends Component {

    state = {
        addTeacherFormFlag: false,
        nameInput: '',
        gradeInput: null
    }

    toggleAddTeacherFormFlag = () => {
        this.setState({...this.state, addTeacherFormFlag: !this.state.addTeacherFormFlag})
    }

    render() {
        return (  
                <div className="teacher-list">
                {
                    this.state.addTeacherFormFlag === false ? 
                    <Button onClick={() => this.toggleAddTeacherFormFlag()} color="green">Add Teacher</Button> : 
                    <div>
                        <Input 
                        placeholder="Input teacher's name"
                        value={this.state.nameInput}
                        onChange={e => this.setState({...this.state, nameInput: e.target.value})}
                        />
                        <Input 
                        placeholder="Input teacher's grade"
                        value={this.state.gradeInput}
                        onChange={e => this.setState({...this.state, gradeInput: e.target.value})}
                        />
                        <Button 
                        type="submit"
                        onClick={() => console.log("bloop")}>
                            Submit
                        </Button>
                    </div>
                }
                {this.props.teacherList.map((item, key) => 
                        <Segment color="blue" size="big" className="teacher" key={key}>
                            <span className="teacher-name">{item.name} (Grade {item.grade})</span>
                            <span className="teacher-buttons">
                            <Button as={NavLink} exact to={`/teachers/${item.id}`}>View</Button>
                            <Button>Delete</Button>
                            </span>
                        </Segment>
                )}
            </div>
        )
    }

}

export default TeacherList;