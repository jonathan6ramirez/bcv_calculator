export interface InitialState {
  msrp: string | number,
  lowestComp: string | number,
  discount: string | number,
}

export interface BCVCalculated {
  bcv: number,
  highestTargetPrice: number
}
