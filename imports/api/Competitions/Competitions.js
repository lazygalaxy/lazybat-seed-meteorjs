import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Competitions = new Mongo.Collection('Competitions');

Competitions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Competitions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Competitions.schema = new SimpleSchema({
  label: {
    type: String,
    label: 'The label of the competition.'
  },
  description: {
    type: String,
    label: 'The description of the competition.'
  },
  startDate: {
    type: Date,
    label: 'The startDate of the competition.'
  },
  endDate: {
    type: Date,
    label: 'The endDate of the competition.'
  },
  admins: {
    type: Array,
    label: 'The admins of the competition.'
  }
});

Competitions.attachSchema(Competitions.schema);

export default Competitions;
