import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Answers from '../Answers';

Meteor.publish('answers', function answers(competitionId, userId) {
  check(competitionId, String);
  check(userId, String);
  return Answers.find({competitionId: competitionId, userId: userId});
});
