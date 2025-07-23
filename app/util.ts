import { BCVCalculated } from "./types";

export function calculateBCV(price: number, lowestComp: number, discount: number): BCVCalculated {
  if (lowestComp < 2000) {
    return { bcv: 0, highestTargetPrice: 0 };
  }

  let bcv: number = Math.round(price * (1 - discount / 100));
  let highestTargetPrice: number;

  if (lowestComp - 2000 <= bcv) {
    highestTargetPrice = Math.round(lowestComp * (80 / 100));
  } else {
    highestTargetPrice = Math.round(lowestComp - 2000);
  }

  return { bcv, highestTargetPrice };
};

export function calculateCost(salePrice: number): number {
  let cost: number = 0;
  let itemFee: number = 0;

  if (salePrice <= 1000) {
    itemFee = salePrice * 0.15;
  } else if (salePrice > 1000 && salePrice <= 7500) {
    itemFee = 1000 * 0.15 + (salePrice - 1000) * 0.065;
  } else {
    itemFee = 1000 * 0.15 + 6500 * 0.065 + (salePrice - 7500) * 0.03;
  }

  cost = itemFee + 0.3;

  return parseFloat(cost.toFixed(2));
};

//* INFO: Helper Functions
export const addCommas = (num: string): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeNonNumeric = (num: string): string => num.toString().replace(/[^0-9]/g, '');
