import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Competitions from '../Competitions';

Meteor.publish('competitions', function competitions() {
  return Competitions.find();
});

Meteor.publish('competitions.view', function competitionsView(competitionId) {
  check(competitionId, String);
  return Competitions.find(competitionId);
});
