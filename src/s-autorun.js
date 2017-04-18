import derivationManagers from './s-derivation-manager';

var id = 1;
const autorun = function(handler) {
  derivationManagers.beginCollect(handler);
  console.log('begin collect')
  handler();
  console.log('end collect')
  derivationManagers.endCollect();
}

export default autorun;
