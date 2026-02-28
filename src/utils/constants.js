import Decimal from "break_eternity.js";

function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    const reference = obj[prop];
    if (typeof reference === "object") deepFreeze(reference);
  });
  return Object.freeze(obj);
}

export const DC = deepFreeze({
  D0: new Decimal("0"),
  
  D0_1: new Decimal("0.1"),
  D0_2: new Decimal("0.2"),
  D0_3: new Decimal("0.3"),
  D0_4: new Decimal("0.4"),
  D0_5: new Decimal("0.5"),
  D0_6: new Decimal("0.6"),
  D0_7: new Decimal("0.7"),
  D0_8: new Decimal("0.8"),
  D0_9: new Decimal("0.9"),
  
  D1: new Decimal("1"),
  D2: new Decimal("2"),
  D3: new Decimal("3"),
  D4: new Decimal("4"),
  D5: new Decimal("5"),
  D6: new Decimal("6"),
  D7: new Decimal("7"),
  D8: new Decimal("8"),
  D9: new Decimal("9"),
  
  D20: new Decimal("20"),
  D30: new Decimal("30"),
  D40: new Decimal("40"),
  D50: new Decimal("50"),
  D60: new Decimal("60"),
  D70: new Decimal("70"),
  D80: new Decimal("80"),
  D90: new Decimal("90"),
  
  E1: new Decimal("1e1"),
  E2: new Decimal("1e2"),
  E3: new Decimal("1e3"),
  E4: new Decimal("1e4"),
  E5: new Decimal("1e5"),
  E6: new Decimal("1e6"),
  E7: new Decimal("1e7"),
  E8: new Decimal("1e8"),
  E9: new Decimal("1e9"),
  E10: new Decimal("1e10"),
});

export const LAYER_TYPE = {
  NORMAL: 0,
  STATIC: 1
};