//load the competitions
let competitions = Assets.getText('competitions.csv').split(/\r\n|\n/);
competitions.forEach(function(entry) {
  if (entry) {
    let fields = entry.split(';');

    let upsert = {
      _id: fields[0],
      label: fields[1],
      description: fields[2],
      startDate: new Date(fields[3]),
      endDate: new Date(fields[4]),
      admins: fields[5].split(':')
    }

    Meteor.call('competitions.upsert', upsert, (error, competitionId) => {
      if (error) {
        console.error(error);
      } else {
        console.info('competition upserted: ' + JSON.stringify(upsert));
      }
    });
  }
});

//load the questions
// let questions = Assets.getText('questions.csv').split(/\r\n|\n/);
// questions.forEach(function(entry) {
//   if (entry) {
//     let fields = entry.split(';');
//
//     let upsert = {
//       _id: fields[0],
//       competitionId: fields[1],
//       description: fields[2],
//       type: fields[3],
//       options: fields[4]
//     }
//
//     upsertQuestion.call(upsert, (error, response) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.info('question upserted: ' + JSON.stringify(upsert));
//       }
//     });
//   }
// });
