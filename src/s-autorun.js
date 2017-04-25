import dependenceManager from './s-dependence-manager';

const autorun = function(handler) {
    //收集依赖
    dependenceManager.beginCollect(handler);
    handler();
    dependenceManager.endCollect();
};

export default autorun;
