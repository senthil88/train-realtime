/*! * Module dependencies. */

exports.index = function(req, res) {
  res.render('home/index', {
    title: 'Train Realtime',
    trains: [
      ['12007', 'SHATABDI EXP', [13.040997, 80.254518]],
      ['22625', 'DOUBLE DECKER', [14.161013, 79.236853]],
      ['12639', 'BRINDAVAN EXP', [12.124562, 79.194559]],
      ['12609', 'MYS EXPRESS', [13.124562, 78.040997]],
      ['12607', 'LALBAGH EXP', [11.124562, 77.040997]]
  ]
  });
};


exports.admin = function(req, res) {
  res.render('home/admin', {
    title: 'Train Realtime',
    trains: [
      ['12007', 'SHATABDI EXP', [13.040997, 80.254518]],
      ['22625', 'DOUBLE DECKER', [14.161013, 79.236853]],
      ['12639', 'BRINDAVAN EXP', [12.124562, 79.194559]],
      ['12609', 'MYS EXPRESS', [13.124562, 78.040997]],
      ['12607', 'LALBAGH EXP', [11.124562, 77.040997]]
    ],
    events: [ 
      'Reached', 
      'Will be reached in 5 minutes',
      'Will be reached in 10 minutes',
      'Will be reached in 15 minutes',
      'Will be reached in 20 minutes',
      'Will be reached in 25 minutes',
      'Will be reached in 30 minutes',    
    ]
  });
}