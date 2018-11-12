/**
 * Define model object type and selector functions for a "Bet"
 *
 * (in "API" because the back-end determines the model)
 */

/**
 * Bet data type
 */
export interface Bet {
  bet_name: string;
  created_on_date: string; // is there a UTC string typescript type? e.g. "2018-11-12T10:12:36.29"
  entity_id: string;
  entity_type_name: string;
  judge: string;
}

/* 
  Example "selector" functions - a functional pattern common in "Redux"
  architectures, which limit storing derived data, but limit refactoring
  of model access.
  
  Functional programming, ftw.
  
  Robust implementations include memoization. 
*/

export const getBetName = (bet: Bet) => bet.bet_name;
export const getBetDateCreated = (bet: Bet) => bet.created_on_date;
export const getBetId = (bet: Bet) => bet.entity_id;
export const getBetJudge = (bet: Bet) => bet.judge;
