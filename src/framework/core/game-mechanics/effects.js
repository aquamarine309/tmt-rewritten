import Decimal from "break_eternity.js";

export const Effects = {
  /**
   * @param effectSources
   * @return {Number}
   */
  sum(...effectSources) {
    let result = new Decimal(0);
    applyEffectsOf(effectSources, v => result = result.add(v));
    return result;
  },
  /**
   * @param effectSources
   * @return {Number}
   */
  product(...effectSources) {
    let result = new Decimal(1);
    applyEffectsOf(effectSources, v => result = result.times(v));
    return result;
  },
  /**
   * @param {Number} defaultValue
   * @param effectSources
   * @return {Number}
   */
  last(defaultValue, ...effectSources) {
    let result = defaultValue;
    let foundLast = false;
    const reversedSources = effectSources
      .filter(s => s !== null && s !== undefined)
      .reverse();
    const reducer = v => {
      result = v;
      foundLast = true;
    };
    for (const effectSource of reversedSources) {
      effectSource.applyEffect(reducer);
      if (foundLast) break;
    }
    return result;
  },
  /**
   * @param {Number} defaultValue
   * @param effectSources
   * @return {Number}
   */
  max(defaultValue, ...effectSources) {
    let result = defaultValue;
    applyEffectsOf(effectSources, v => result = result.max(v));
    return result;
  },
  /**
   * @param {Number} defaultValue
   * @param effectSources
   * @return {Number}
   */
  min(defaultValue, ...effectSources) {
    let result = defaultValue;
    applyEffectsOf(effectSources, v => result = result.min(v));
    return result;
  }
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.plusEffectOf = function(effectSource) {
  // eslint-disable-next-line consistent-this
  let result = this;
  effectSource.applyEffect(v => result = result.plus(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.plusEffectsOf = function(...effectSources) {
  // eslint-disable-next-line consistent-this
  let result = this;
  applyEffectsOf(effectSources, v => result = result.plus(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.minusEffectOf = function(effectSource) {
  // eslint-disable-next-line consistent-this
  let result = this;
  effectSource.applyEffect(v => result = result.minus(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.minusEffectsOf = function(...effectSources) {
  // eslint-disable-next-line consistent-this
  let result = this;
  applyEffectsOf(effectSources, v => result = result.minus(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.timesEffectOf = function(effectSource) {
  // eslint-disable-next-line consistent-this
  let result = this;
  effectSource.applyEffect(v => result = result.times(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.timesEffectsOf = function(...effectSources) {
  // eslint-disable-next-line consistent-this
  let result = this;
  applyEffectsOf(effectSources, v => result = result.times(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.dividedByEffectOf = function(effectSource) {
  // eslint-disable-next-line consistent-this
  let result = this;
  effectSource.applyEffect(v => result = result.dividedBy(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.dividedByEffectsOf = function(...effectSources) {
  // eslint-disable-next-line consistent-this
  let result = this;
  applyEffectsOf(effectSources, v => result = result.dividedBy(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.powEffectOf = function(effectSource) {
  // eslint-disable-next-line consistent-this
  let result = this;
  effectSource.applyEffect(v => result = result.pow(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.powEffectsOf = function(...effectSources) {
  // eslint-disable-next-line consistent-this
  const result = this;
  let power = new Decimal(1);
  applyEffectsOf(effectSources, v => power = power.mul(v));
  return result.pow(power);
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.rootEffectOf = function(effectSource) {
  // eslint-disable-next-line consistent-this
  let result = this;
  effectSource.applyEffect(v => result = result.root(v));
  return result;
};

/**
 * @returns {Decimal}
 */
Decimal.prototype.rootEffectsOf = function(...effectSources) {
  // eslint-disable-next-line consistent-this
  const result = this;
  let power = new Decimal(1);
  applyEffectsOf(effectSources, v => power = power.mul(v));
  return result.root(power);
};

function applyEffectsOf(effectSources, applyFn) {
  for (const effectSource of effectSources) {
    if (effectSource !== null && effectSource !== undefined) effectSource.applyEffect(applyFn);
  }
}
