module.exports = function(outerSource, outerTarget, options) {
  // I hope this is the last time I have to do this.
  options = options || {};
  options.overwriteUndefined = options.overwriteUndefined || false;
  options.overwriteNull = options.overwriteNull || false;

  const overlay = function(source, target) {
    const sourceKeys = Object.keys(source);
    const targetKeys = Object.keys(target);

    sourceKeys.forEach(function(key){
      const targetHasKey = targetKeys.indexOf(key) > -1;

      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (!targetHasKey) {
          target[key] = {};
          overlay(source[key], target[key]);
        }

        if (targetHasKey && typeof target[key] === "object" && !Array.isArray(target[key])) {
          overlay(source[key], target[key]);
        }

        if (targetHasKey && typeof target[key] === "undefined" && options.overwriteUndefined) {
          target[key] = {};
          overlay(source[key], target[key]);
        }

        if (targetHasKey && target[key] === null && options.overwriteNull) {
          target[key] = {};
          overlay(source[key], target[key]);
        }
      }

      if (targetHasKey && typeof target[key] === "undefined" && options.overwriteUndefined) {
        target[key] = source[key];
      }

      if (targetHasKey && typeof target[key] === null && options.overwriteNull) {
        target[key] = source[key];
      }

      if (!targetHasKey) {
        target[key] = source[key];
      }
    });

  }

  overlay(outerSource, outerTarget);

};
