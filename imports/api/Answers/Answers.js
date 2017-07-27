import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Answers = new Mongo.Collection('Answers');

Answers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Answers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Answers.schema = new SimpleSchema({
  competitionId: {
    type: String,
    label: 'The id of the competition.'
  },
  userId: {
    type: String,
    label: 'The id of the user.'
  },
  questionId: {
    type: String,
    label: 'The id of the question.'
  },
  value: {
    type: String,
    label: 'The answers to the question.'
  },
  timestamp: {
    type: Date,
    label: 'The timestamp of the answer to the question.'
  }
});

Answers.attachSchema(Answers.schema);

export default Answers;
