import observerManagers from './s-observer-manager';

const autorun = function(handler) {
  observerManagers.beginCollect(handler);
  handler();
  observerManagers.endCollect();

}

export default autorun;
