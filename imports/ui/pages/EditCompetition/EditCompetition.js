import React from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import Competitions from '../../../api/Competitions/Competitions';
import Questions from '../../../api/Questions/Questions';
import Answers from '../../../api/Answers/Answers';
import CompetitionEditor from '../../components/CompetitionEditor/CompetitionEditor';
import Loading from '../../components/Loading/Loading';

const EditCompetition = ({loading, competition, questions, answers, history}) => (!loading
  ? (
    <div className="EditCompetition">
      <h4 className="page-header">{`Editing "${competition.label}"`}</h4>
      <CompetitionEditor competition={competition} questions={questions} answers={answers} history={history}/>
    </div>
  )
  : <Loading/>);

EditCompetition.propTypes = {
  loading: PropTypes.bool.isRequired,
  competition: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(({match}) => {
  const competitionId = match.params._id;

  const competitionSub = Meteor.subscribe('competitions.view', competitionId);
  const questionSub = Meteor.subscribe('questions', competitionId);
  const answerSub = Meteor.subscribe('answers', competitionId, Meteor.userId());

  return {
    loading: !competitionSub.ready() || !questionSub.ready() || !answerSub.ready(),
    competition: Competitions.findOne(competitionId),
    questions: Questions.find().fetch(),
    answers: Answers.find().fetch()
  };
}, EditCompetition);
