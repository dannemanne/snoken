import type { CalculateScoreOptions } from './types';

const DEFAULT_BASE_SCORE = 10;
const DEFAULT_MOVES_PENALTY_CAP = -8;
const DEFAULT_MOVES_PENALTY_MULTIPLIER = -0.1;
const DEFAULT_SCORE_MAX_CAP = 20;
const DEFAULT_SCORE_MIN_CAP = 5;
const DEFAULT_SPEED_BONUS_CAP = 10;
const DEFAULT_SPEED_MULTIPLIER = 0.3;

export const calculateScore = (
  params: {
    recentMoves: number;
    speed: number;
    totalMoves: number;
  },
  options?: CalculateScoreOptions,
): number => {
  const { recentMoves, speed } = params;
  const {
    baseScore = DEFAULT_BASE_SCORE,
    movesPenaltyCap = DEFAULT_MOVES_PENALTY_CAP,
    movesPenaltyMultiplier = DEFAULT_MOVES_PENALTY_MULTIPLIER,
    scoreMaxCap = DEFAULT_SCORE_MAX_CAP,
    scoreMinCap = DEFAULT_SCORE_MIN_CAP,
    speedBonusCap = DEFAULT_SPEED_BONUS_CAP,
    speedMultiplier = DEFAULT_SPEED_MULTIPLIER,
  } = options ?? {};

  const scoreBySpeed = Math.min(speed * speedMultiplier, speedBonusCap);
  const scorePenaltyByMoves = Math.max(recentMoves * movesPenaltyMultiplier, movesPenaltyCap);

  return Math.max(Math.min(Math.floor(baseScore + scoreBySpeed + scorePenaltyByMoves), scoreMaxCap), scoreMinCap);
};
