import Decimal from "break_eternity.js";
import { ModInfo } from "@/mod-info";

const FORMAT_THRESHOLD = {
  EXP_NOMANTISSA: new Decimal("1e1000000"),
  EXP_WITH_MANTISSA: new Decimal("1e10000"),
  EXP_STANDARD: new Decimal(1e9),
  COMMA: new Decimal(1e3),
  SMALL: new Decimal(0.0001),
  SLOG_UPPER: new Decimal("eeee1000"),
};

/**
 * @param {Decimal} exponent
 * @returns {string}
 */
function formatExponent(exponent) {
  if (exponent.gte(1e9)) {
    return format(exponent, 3);
  }
  if (exponent.gte(10000)) {
    return commaFormat(exponent, 0);
  }
  return exponent.toStringWithDecimalPlaces(0);
}

/**
 * @param {Decimal} num
 * @param {number} precision
 * @param {boolean} includeMantissa
 * @returns {string}
 */
export function exponentialFormat(num, precision, includeMantissa = true) {
  const exponent = num.log10().floor();
  let mantissa = num.div(Decimal.pow10(exponent));
  if (mantissa.toStringWithDecimalPlaces(precision) === "10") {
    mantissa = new Decimal(1);
    exponent.add(1);
  }

  const expStr = formatExponent(exponent, precision);
  if (includeMantissa) {
    return `${mantissa.toStringWithDecimalPlaces(precision)}e${expStr}`;
  }
  return `e${expStr}`;
}

/**
 * @param {Decimal} num
 * @param {number} precision
 * @returns {string}
 */
function commaFormat(num, precision) {
  if (num === null) return "NaN";
  if (num.mag < 0.001) return (0).toFixed(precision);

  const raw = num.toStringWithDecimalPlaces(precision);
  const parts = raw.split(".");
  parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/gu, "$1,");
  return parts.length === 1 ? parts[0] : `${parts[0]}.${parts[1]}`;
}

/**
 * @param {Decimal} num
 * @param {number} precision
 * @returns {string}
 */
function regularFormat(num, precision) {
  if (num === null) return "NaN";
  if (num.mag < 0.0001) return (0).toFixed(precision);
  let actualPrecision = precision;
  if (num.mag < 0.1 && precision !== 0) {
    actualPrecision = Math.max(precision, 4);
  }
  return num.toStringWithDecimalPlaces(actualPrecision);
}

/**
 * @param {Decimal|number} decimal
 * @param {number} precision
 * @param {boolean} allowSmall
 * @returns {string}
 */
export function format(decimal, precision = 2, allowSmall) {
  allowSmall ??= ModInfo.allowSmall;
  const num = Decimal.fromValue_noAlloc(decimal);
  if (isNaN(num.sign) || isNaN(num.layer) || isNaN(num.mag)) {
    return "NaN";
  }
  if (num.sign < 0) return `-${format(num.neg(), precision, allowSmall)}`;
  if (num.mag === Number.POSITIVE_INFINITY) return "Infinity";
  if (num.gte(FORMAT_THRESHOLD.SLOG_UPPER)) {
    const slog = num.slog();
    if (slog.gte(1e6)) return `F${format(slog.floor())}`;
    const base = Decimal.pow(10, slog.sub(slog.floor()));
    return `${base.toStringWithDecimalPlaces(3)}F${commaFormat(slog.floor(), 0)}`;
  }
  if (num.gte(FORMAT_THRESHOLD.EXP_NOMANTISSA)) {
    return exponentialFormat(num, 0, false);
  }
  if (num.gte(FORMAT_THRESHOLD.EXP_WITH_MANTISSA)) {
    return exponentialFormat(num, 0, true);
  }
  if (num.gte(FORMAT_THRESHOLD.EXP_STANDARD)) {
    return exponentialFormat(num, precision, true);
  }
  if (num.gte(FORMAT_THRESHOLD.COMMA)) {
    return commaFormat(num, 0);
  }
  if (num.gte(FORMAT_THRESHOLD.SMALL) || !allowSmall) {
    return regularFormat(num, precision);
  }
  if (num.eq(0)) {
    return (0).toFixed(precision);
  }
  return formatVerySmall(num, precision);
}

/**
 * @param {Decimal} num
 * @param {number} precision
 * @returns {string}
 */
export function formatVerySmall(num, precision) {
  const transformed = invertOOM(num);

  if (transformed.lt(1e1000)) {
    const expForm = exponentialFormat(transformed, precision);
    return expForm.replace(/([^(?:e|F)]*)$/u, "-$1");
  }
  return `${format(transformed, precision)}⁻¹`;
}

/**
 * @param {Decimal} x
 * @returns {Decimal}
 */
function invertOOM(x) {
  const e = x.log10().ceil();
  const m = x.div(Decimal.pow(10, e));
  const newE = e.neg();
  return Decimal.pow(10, newE).times(m);
}

/**
 * @param {Decimal|number} decimal
 * @returns {string}
 */
export function formatInt(value) {
  if (typeof value === "number") {
    return value.toFixed(0);
  }
  if (num.gte(1e9)) return format(value, 2);
  if (num.lte(0.99) && !num.eq(0)) return format(value, 2);
  return format(value, 0);
}

export function formatAdd(value, precision, allowSmall) {
  return `+${format(value, precision, allowSmall)}`;
}

export function formatX(value, precision, allowSmall) {
  return `×${format(value, precision, allowSmall)}`;
}

export function formatPow(value, precision, allowSmall) {
  return `^${format(value, precision, allowSmall)}`;
}

export function formatPercents(value, precision, allowSmall) {
  return `${format(value.times(100), precision, allowSmall)}%`;
}

/**
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
  const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
  const SECONDS_PER_YEAR = 365 * SECONDS_PER_DAY;

  const totalSeconds = seconds;

  const years = Math.floor(totalSeconds / SECONDS_PER_YEAR);
  const remainingAfterYears = totalSeconds % SECONDS_PER_YEAR;
  const days = Math.floor(remainingAfterYears / SECONDS_PER_DAY);
  const remainingAfterDays = remainingAfterYears % SECONDS_PER_DAY;
  const hours = Math.floor(remainingAfterDays / SECONDS_PER_HOUR);
  const remainingAfterHours = remainingAfterDays % SECONDS_PER_HOUR;
  const minutes = Math.floor(remainingAfterHours / SECONDS_PER_MINUTE);
  const secs = remainingAfterHours % SECONDS_PER_MINUTE;

  const values = [years, days, hours, minutes, secs];
  const units = ["y", "d", "h", "m", "s"];
  const formatters = [formatInt, formatInt, formatInt, formatInt, format];

  let startIndex = 0;
  while (startIndex < values.length - 1 && values[startIndex] === 0) {
    startIndex++;
  }

  const parts = [];
  for (let i = startIndex; i < values.length; i++) {
    parts.push(formatters[i](values[i]) + units[i]);
  }
  return parts.join(" ");
}

/**
 * @param {Decimal|number} x
 * @param {number} precision
 * @param {Decimal|number} maxAccepted
 * @returns {string}
 */
export function toPlaces(x, precision, maxAccepted) {
  const num = new Decimal(x);
  let result = num.toStringWithDecimalPlaces(precision);
  if (new Decimal(result).gte(maxAccepted)) {
    const step = Math.pow(0.1, precision);
    const maxVal = new Decimal(maxAccepted).sub(step);
    result = maxVal.toStringWithDecimalPlaces(precision);
  }
  return result;
}

/**
 * Check if a number or Decimal is equal to 1.
 * @param  {number|Decimal} amount
 * @return {Boolean} - if the {amount} was equal to 1.
 */
 function isSingular(amount) {
  if (typeof amount === "number") return amount === 1;
  if (amount instanceof Decimal) return amount.eq(1);
  throw `Amount must be either a number or Decimal. Instead, amount was ${amount}`;
};

// Some letters in the english language pluralize in a different manner than simply adding an 's' to the end.
// As such, the regex match should be placed in the first location, followed by the desired string it
// should be replaced with. Note that $ refers to the EndOfLine for regex, and should be included if the plural occurs
// at the end of the string provided, which will be 99% of times. Not including it is highly likely to cause mistakes,
// as it will select the first instance that matches and replace that.
const PLURAL_HELPER = new Map([
  [/y$/u, "ies"],
  [/x$/u, "xes"],
  [/$/u, "s"]
]);

// Some terms require specific (or no) handling when plural. These terms should be added, in Word Case, to this Map.
// Words will be added to this Map when a valid plural for it is found on being run through the pluralize function.
const pluralDatabase = new Map([]);

/**
 * A function that pluralizes a word based on a designated amount
 * @param  {string} word           - word to be pluralized
 * @param  {number|Decimal} amount - amount to be used to determine if the value is plural
 * @param  {string} [plural]       - if defined, a specific plural to override the generated plural
 * @return {string} - if the {amount} is anything other than one, return the {plural} provided or the
 *                    plural form of the input {word}. If the {amount} is singular, return {word}
 */
export function pluralize(word, amount, plural) {
  if (word === undefined || amount === undefined) throw "Arguments must be defined";

  if (!ModInfo.pluralization || isSingular(amount)) return word;
  const existingPlural = plural ?? pluralDatabase.get(word);
  if (existingPlural !== undefined) return existingPlural;

  const newWord = generatePlural(word);
  pluralDatabase.set(word, newWord);
  return newWord;
};

/**
 * Creates a new plural based on PLURAL_HELPER and adds it to pluralDatabase
 * @param  {string} word - a word to be pluralized using the regex in PLURAL_HELPER
 * @return {string} - returns the pluralized word. if no pluralized word is found, simply returns the word itself.
 */
export function generatePlural(word) {
  for (const [match, replaceWith] of PLURAL_HELPER.entries()) {
    const newWord = word.replace(match, replaceWith);
    if (word !== newWord) return newWord;
  }
  return word;
};

/**
 * Returns the formatted value followed by a name, pluralized based on the value input.
 * @param  {string} name                  - name to pluralize and display after {value}
 * @param  {number|Decimal} value         - number to {format}
 * @param  {number} [precision]              - number of places to display for the mantissa
 * @param  {function} [formatType=format] - how to format the {value}. defaults to format
 * @return {string} - the formatted {value} followed by the {name} after having been pluralized based on the {value}
 */
// eslint-disable-next-line max-params
export function quantify(name, value, precision, formatType = format) {
  if (name === undefined || value === undefined) throw "Arguments must be defined";

  const number = formatType(value, precision);
  const plural = pluralize(name, value);
  return `${number} ${plural}`;
};

/**
 * Returns the value formatted to formatInt followed by a name, pluralized based on the value input.
 * @param  {string} name                  - name to pluralize and display after {value}
 * @param  {number|Decimal} value         - number to format
 * @return {string} - the formatted {value} followed by the {name} after having been pluralized based on the {value}
 */
 export function quantifyInt(name, value) {
  if (name === undefined || value === undefined) throw "Arguments must be defined";

  const number = formatInt(value);
  const plural = pluralize(name, value);
  return `${number} ${plural}`;
};