export interface InitialState {
  msrp: string | number,
  lowestComp: string | number,
  discount: string | number,
}

export interface BCVCalculated {
  bcv: number,
  highestTargetPrice: number,
}

export interface MarkersType {
  cents: number | string,
  msrp: number,
}

export interface MarkersDataType {
  msrp: number,
  bcv: number,
  fifty: number,
  seventyFive: number,
  name: string,
}

