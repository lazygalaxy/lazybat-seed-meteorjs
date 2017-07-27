import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';

import EditCompetition from '../pages/EditCompetition.js';

import Competitions from '../../api/competitions/competitions.js';
import Questions from '../../api/questions/questions.js';
import Answers from '../../api/answers/answers.js';

import Loading from '../components/Loading.js';

const composer = ({
  params
}, onData) => {
  const competitionSub = Meteor.subscribe('competitions.view', params._id);
  const questionSub = Meteor.subscribe('questions.view', params._id);
  const answerSub = Meteor.subscribe('answers.view', params._id, Meteor.userId());

  if (competitionSub.ready() && questionSub.ready() && answerSub.ready()) {
    const competition = Competitions.findOne(params._id);
    const questions = Questions.find();
    const answers = Answers.find();
    onData(null, {competition, questions, answers});
  }
};

export default composeWithTracker(composer, Loading)(EditCompetition);
