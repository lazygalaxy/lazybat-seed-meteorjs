import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Questions from '../Questions';

Meteor.publish('questions', function questions(competitionId) {
  check(competitionId, String);
  return Questions.find({competitionId: competitionId});
});
