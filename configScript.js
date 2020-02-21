const editFile = require('edit-file');
const {exec} = require('child_process');
//comment version guard o bitcore-lib
editFile('./node_modules/bitcore-lib/index.js', function(text = '') {
  const textInLines = text.split('\n');
  const textWithoutVersionGuard = textInLines
    .map((line, index) => (index > 5 && index < 15 ? `//${line}` : line))
    .join('\n');

  return textWithoutVersionGuard;
});

//hack node to nodefy project
exec('./node_modules/.bin/rn-nodeify --hack --install', (err, out) =>
  err ? console.log(err) : console.log(out),
);
