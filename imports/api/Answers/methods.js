import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Answers from './Answers';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'answers.upsert': function answersUpsert(answer) {
    check(answer, {
      _id: String,
      competitionId: String,
      userId: String,
      questionId: String,
      value: String,
      timestamp: Date
    });

    try {
      return Answers.upsert({
        _id: answer._id
      }, {$set: answer});
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  }
});

rateLimit({methods: ['answers.upsert'], limit: 5, timeRange: 1000});
