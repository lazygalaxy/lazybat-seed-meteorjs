import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Competitions from './Competitions';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'competitions.upsert': function competitionsUpsert(competition) {
    check(competition, {
      _id: String,
      label: String,
      description: String,
      startDate: Date,
      endDate: Date,
      admins: Array
    });

    try {
      return Competitions.upsert({
        _id: competition._id
      }, {$set: competition});
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  }
});

rateLimit({methods: ['competitions.upsert'], limit: 5, timeRange: 1000});
