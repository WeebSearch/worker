import * as R from "ramda";

export const containsSublist = (blacklist: string[], checking: string[]) =>
  R.intersection(blacklist.map(R.toLower), checking.map(R.toLower)).length !== 0;

export const toPromise = async <T, K>(func: (T, args) => K) => R.curry(func);

export const tally = (items: string[]): Tallied => items.reduce((coll, item) => {
  if (coll[item] === undefined) {
    coll[item] = 0;
  }
  coll[item] += 1;
  return coll;
}, {});

