import React from 'react';
import PropTypes from 'prop-types';
import {Table, Alert, Button, Image} from 'react-bootstrap';
import {timeago, monthDayYearAtTime} from '@cleverbeagle/dates';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Bert} from 'meteor/themeteorchef:bert';
import CompetitionsCollection from '../../../api/Competitions/Competitions';
import Loading from '../../components/Loading/Loading';

import './Competitions.scss';

const Competitions = ({loading, competitions, match, history}) => (!loading
  ? (
    <div className="Competitions">
      <div className="page-header clearfix">
        <h4 className="pull-left">Competitions</h4>
      </div>
      {competitions.length
        ? <Table responsive>
            <thead>
              <tr>
                <th>Label</th>
                <th>Image</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {competitions.map(({_id, label}) => (
                <tr key={_id}>
                  <td>{label}</td>
                  <td>
                    <Image src={_id + ".png"} style={{
                      width: '200px'
                    }} rounded responsive/></td>
                  <td>
                    <Button bsStyle="primary" onClick={() => history.push(`${match.url}/${_id}`)} block>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        : <Alert bsStyle="warning">No competitions yet!</Alert>}
    </div>
  )
  : <Loading/>);

Competitions.propTypes = {
  loading: PropTypes.bool.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('competitions');
  return {
    loading: !subscription.ready(),
    competitions: CompetitionsCollection.find().fetch()
  };
}, Competitions);
