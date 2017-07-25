import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Questions = new Mongo.Collection('Questions');

Questions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Questions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Questions.schema = new SimpleSchema({
  competitionId: {
    type: String,
    label: 'The id of the competition.'
  },
  description: {
    type: String,
    label: 'The description of the question.'
  },
  type: {
    type: String,
    label: 'The type of the question.'
  },
  options: {
    type: String,
    label: 'The options of the question.'
  }
});

Questions.attachSchema(Questions.schema);

export default Questions;
