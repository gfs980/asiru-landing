export type FxRateSource = "static" | "bank";

export type FxRateResponse = {
  pair: "THB/RUB";
  /** RUB per 1 THB — how many rubles the client pays for each baht you receive */
  thbToRub: number;
  /** THB per 1 RUB — inverse rate */
  rubToThb: number;
  feePercent: number;
  lockMinutes: number;
  source: FxRateSource;
  updatedAt: string;
};

export type FxQuote = {
  receiveThb: number;
  clientPaysRub: number;
  feeRub: number;
  subtotalRub: number;
  rate: FxRateResponse;
};
