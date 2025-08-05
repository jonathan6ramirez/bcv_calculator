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

export interface CalculatedMarkers {
  bcv: number | string,
  fiftyPercent: number | string,
  seventyFivePercent: number | string,
}

export interface MarkersDataType {
  msrp: number,
  bcv: number,
  fifty: number,
  seventyFive: number,
  name: string,
}

export interface Comp {
  price: number,
  id: string,
};

export interface CalculatedDealerMargins {
  avg: number,
  avgSalePrice: number,
  avgTradeIn: number,
}

export interface CalculatedSpreads {
  bcv: number,

  avg: number,
  avgTradeIn: number,
  lowRetail: number,

  upside: CalculatedUpside,
  downside: CalculatedDownside,
}

export interface CalculatedUpside {
  amount: number,
  percentage: string,
}

export interface CalculatedDownside {
  amount: number,
  percentage: string,
}
