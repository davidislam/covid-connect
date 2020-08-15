import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

// Importing actions/required methods
import { updateStudentForm, addStudent } from "../../actions/student";

import "./styles.css";

/* Component for the Student Form */
class StudentForm extends React.Component {

    // student form state
    state = {
        name: "",
        year: ""
    }

    render() {
        const { dashboard } = this.props;

        const { name, year } = this.state;

        return (
            <React.Fragment>
                <Grid className="student-form" container spacing={4}>
                    {/* Inputs to add student */}
                    <Input
                        name="name"
                        value={name}
                        onChange={e => updateStudentForm(this, e.target)}
                        label="Student Name"
                    />

                    <Input
                        name="year"
                        value={year}
                        onChange={e => updateStudentForm(this, e.target)}
                        label="Year"
                    />

                    <Grid
                        className="student-form__button-grid"
                        item
                        xl={2}
                        lg={2}
                        md={12}
                        s={12}
                        xs={12}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addStudent(this, dashboard)}
                            className="student-form__submit-button"
                        >
                            Add Student
                        </Button>
                    </Grid>
                </Grid>

                <p className={`student-form__message--${dashboard.state.message.type}`}>
                    {dashboard.state.message.body}
                </p>
            </React.Fragment>
        );
    }
}

export default StudentForm;
