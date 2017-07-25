import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Questions from './Questions';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'questions.upsert': function questionsUpsert(question) {
    check(question, {
      _id: String,
      competitionId: String,
      description: String,
      type: String,
      options: String
    });

    try {
      return Questions.upsert({
        _id: question._id
      }, {$set: question});
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  }
});

rateLimit({methods: ['questions.upsert'], limit: 5, timeRange: 1000});
