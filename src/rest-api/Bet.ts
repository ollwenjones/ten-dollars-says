import { Party } from "./Party";

/**
 * Define model object type and selector functions for a "Bet"
 *
 * (in "API" because the back-end determines the model)
 */

/**
 * Bet data type
 */
export interface Bet {
  name: string;
  // created_on_date: string; // is there a UTC string typescript type? e.g. "2018-11-12T10:12:36.29"
  description: string;
  parties: Party[];
  judge: string;
  betId: string;
  deadline: string; // ISO string
  completed: boolean;
  notes: string;
}

/* 
  Example "selector" functions - a functional pattern common in "Redux"
  architectures, which limit storing derived data, but limit refactoring
  of model access.
  
  Functional programming, ftw.
  
  Robust implementations include memoization. 
*/

export const getBetName = (bet: Bet) => bet.name;
export const getBetDeadline = (bet: Bet) => bet.deadline;
export const getBetId = (bet: Bet) => bet.betId;
export const getBetJudge = (bet: Bet) => bet.judge;
export const getBetNotes = (bet: Bet) => bet.notes;
export const getBetDescription = (bet: Bet) => bet.description;
export const getBetCompleted = (bet: Bet) => bet.completed;
export const getBetParties = (bet: Bet) => bet.parties;
