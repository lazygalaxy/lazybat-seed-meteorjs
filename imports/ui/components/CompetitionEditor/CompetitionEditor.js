/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

function getAnswerLabel(value, type) {
  switch (type) {
    case 'DURATION':
      if (value == 0) {
        return '0 secs';
      }

      // calulate the seconds, minutes, hours & days from the value
      let seconds = value % 60;
      value = Math.floor(value / 60);
      let minutes = value % 60;
      value = Math.floor(value / 60);
      let hours = value % 24;
      value = Math.floor(value / 24);
      let days = value;

      // create a human readable label
      let label = '';
      if (days)
        label = label + days + ' days ';
      if (hours)
        label = label + hours + ' hours ';
      if (minutes)
        label = label + minutes + ' mins ';
      if (seconds)
        label = label + seconds + ' secs ';
      return label;
  }
  return value;
}

class CompetitionEditor extends React.Component {
  constructor(props) {
    super(props);

    let answerMap = {}
    props.answers.map(function(answer) {
      answerMap[answer.questionId] = answer;
    });

    let stateMap = {}
    props.questions.map(function(question) {
      let options = question.options.split(':');
      let value = answerMap[question._id]
        ? answerMap[question._id].value
        : options[0];
      stateMap[question._id] = {
        label: getAnswerLabel(value, question.type),
        value: value,
        type: question.type
      };
    });

    this.state = stateMap;
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {
    const component = this;
    const {questions} = this.props;

    const rules = {};
    const messages = {};
    questions.map(function(question) {
      rules[question._id] = {};
      rules[question._id].required = true;

      messages[question._id] = {};
      messages[question._id].required = 'A value is required';
    });

    validate(component.form, {
      rules,
      messages,
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  handleValueChange(event) {
    let type = this.state[event.target.name].type;
    let value = event.target.value;

    let stateChange = {};
    stateChange[event.target.name] = {
      label: getAnswerLabel(value, type),
      value: value,
      type: type
    };

    this.setState(stateChange);
  }

  handleSubmit() {
    const component = this;
    const {history, questions} = this.props;

    questions.map(function(question) {
      const answer = {
        _id: question._id + '_' + Meteor.userId(),
        competitionId: question.competitionId,
        userId: Meteor.userId(),
        questionId: question._id,
        value: component[question._id].value.trim(),
        timestamp: new Date()
      };

      Meteor.call('answers.upsert', answer, (error, answerId) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Answers saved', 'success');
          history.push(`/competitions`);
        }
      });
    });
  }

  controlElement(question) {
    let options = question.options.split(':');
    switch (question.type) {
      case 'DURATION':
      case 'NUMBER':
        return (
          <div>
            <ControlLabel>{question.description}&nbsp;{this.state[question._id].label}</ControlLabel>
            <input type="range" className="form-control" name={question._id} ref={input => (this[question._id] = input)} defaultValue={this.state[question._id].value} min={options[0]} max={options[1]} onChange={this.handleValueChange}/>
          </div>
        )
      default:
        return (
          <div>
            <ControlLabel>{question.description}</ControlLabel>
            <input type="text" className="form-control" name={question._id} ref={input => (this[question._id] = input)} defaultValue={this.state[question._id].value} onChange={this.handleValueChange}/>
          </div>
        )
    }
  }

  render() {
    const {competition, questions, answers} = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        {questions.map((question) => (
          <FormGroup key={question._id}>
            {this.controlElement(question)}
          </FormGroup>
        ))}
        <Button type="submit" bsStyle="success">Save Changes</Button>
      </form>
    );
  }
}

CompetitionEditor.propTypes = {
  competition: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default CompetitionEditor;
