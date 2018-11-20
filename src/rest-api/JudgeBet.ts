export interface JudgeBetPayload {
  /**
   * Array of winner names
   */
  selectedWinners: string[];
  /**
   * GUID of bet being judged.
   */
  betId: string;
}
