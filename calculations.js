import { PROJECT_PARAMS, TRAINERS, REVIEWERS } from './data.js';

const P = PROJECT_PARAMS;

// ─── Pipeline hours per task (from the Key tab) ───────────────────────────────
// A task takes: 6h write + 2 review cycles × (2h review + 1.5h revise) = 13h trainer, 4h reviewer
export function pipelineHoursPerTask() {
  const trainerHours = P.hoursToWrite + P.expectedRevisionCycles * P.hoursToRevise; // 6 + 3 = 9
  const reviewerHours = P.expectedRevisionCycles * P.hoursToReview; // 4
  return { trainerHours, reviewerHours };
}

// ─── Trainer metrics ──────────────────────────────────────────────────────────
export function trainerMetrics() {
  return TRAINERS.map(t => {
    const inPipeline = t.claimed + t.completed + t.fixingDone + t.needsWork;
    const majorsPerTask = t.completed > 0 ? t.majorIssues / t.completed : null;
    const completionRate = t.claimed > 0 ? t.completed / t.claimed : null;

    // Hours consumed so far (approximate)
    const hoursUsed =
      t.claimed * P.hoursToWrite +
      t.completed * P.hoursToWrite +
      t.fixingDone * (P.hoursToWrite + P.hoursToRevise) +
      t.needsWork * P.hoursToRevise;

    // Remaining capacity (2 weeks left)
    const weeksRemaining = P.weeksTotal - P.snapshotWeek;
    const remainingHours = weeksRemaining * P.trainerWeeklyHourCap;
    const estimatedFurtherCompletions = remainingHours / (P.hoursToWrite + P.expectedRevisionCycles * P.hoursToRevise);

    return {
      ...t,
      inPipeline,
      majorsPerTask,
      completionRate,
      hoursUsed,
      remainingHours,
      estimatedFurtherCompletions,
      isHighErrorRate: majorsPerTask !== null && majorsPerTask > 5,
      isUnderdelivering: t.completed === 0 && t.claimed > 0,
    };
  });
}

// ─── Reviewer metrics ─────────────────────────────────────────────────────────
export function reviewerMetrics() {
  const totalReviews = REVIEWERS.reduce((s, r) => s + r.reviewsCompleted, 0);
  const totalMajors = REVIEWERS.reduce((s, r) => s + r.majorIssues, 0);
  const avgMajorsPerReview = totalReviews > 0 ? totalMajors / totalReviews : 0;

  return REVIEWERS.map(r => {
    const majorsPerReview = r.reviewsCompleted > 0 ? r.majorIssues / r.reviewsCompleted : null;
    const isOverFlagging = majorsPerReview !== null && majorsPerReview > avgMajorsPerReview;

    // Capacity: 2 weeks × 60h / 2h per review
    const weeksRemaining = P.weeksTotal - P.snapshotWeek;
    const remainingCapacity = (weeksRemaining * P.reviewerWeeklyHourCap) / P.hoursToReview;

    return {
      ...r,
      majorsPerReview,
      isOverFlagging,
      remainingCapacity,
    };
  });
}

// ─── Q1 Diagnosis ─────────────────────────────────────────────────────────────
export function q1Diagnosis() {
  const weeksRemaining = P.weeksTotal - P.snapshotWeek; // 2
  const currentSignedOff = TRAINERS.reduce((s, t) => s + t.signedOff, 0); // 102
  const gap = P.goal - currentSignedOff; // 498

  // Total reviews done so far
  const totalReviewsDone = REVIEWERS.reduce((s, r) => s + r.reviewsCompleted, 0); // 997
  const totalMajorIssues = REVIEWERS.reduce((s, r) => s + r.majorIssues, 0); // 1690

  // Average reviews per sign-off (actual vs expected 2)
  const avgReviewsPerSignOff = currentSignedOff > 0 ? totalReviewsDone / currentSignedOff : null;

  // Trainer capacity remaining
  const trainerHoursRemaining = TRAINERS.length * weeksRemaining * P.trainerWeeklyHourCap;
  const { trainerHours: hoursPerTask } = pipelineHoursPerTask();
  const trainerEstimatedCompletions = trainerHoursRemaining / hoursPerTask;

  // Reviewer capacity remaining
  const reviewerHoursRemaining = REVIEWERS.length * weeksRemaining * P.reviewerWeeklyHourCap;
  const reviewerEstimatedCompletions = reviewerHoursRemaining / P.hoursToReview;

  // At current review cycle rate, how many sign-offs can we get?
  // Each sign-off currently takes avgReviewsPerSignOff reviews
  const effectiveReviewerCapacity = avgReviewsPerSignOff
    ? reviewerEstimatedCompletions / avgReviewsPerSignOff
    : reviewerEstimatedCompletions;

  const projectedTotal = currentSignedOff + Math.min(trainerEstimatedCompletions, effectiveReviewerCapacity);

  // High error trainers (majors/completed > 5)
  const tm = trainerMetrics();
  const highErrorTrainers = tm.filter(t => t.isHighErrorRate);
  const inactiveTrainers = tm.filter(t => t.isUnderdelivering);

  // Over-flagging reviewers
  const rm = reviewerMetrics();
  const overFlaggingReviewers = rm.filter(r => r.isOverFlagging);
  const avgMajorsPerReview = totalMajorIssues / totalReviewsDone;

  return {
    currentSignedOff,
    gap,
    weeksRemaining,
    totalReviewsDone,
    totalMajorIssues,
    avgReviewsPerSignOff: avgReviewsPerSignOff?.toFixed(2),
    expectedReviewsPerSignOff: P.expectedRevisionCycles,
    trainerEstimatedCompletions: trainerEstimatedCompletions.toFixed(0),
    effectiveReviewerCapacity: effectiveReviewerCapacity.toFixed(0),
    projectedTotal: projectedTotal.toFixed(0),
    onTrack: projectedTotal >= P.goal,
    highErrorTrainerCount: highErrorTrainers.length,
    highErrorTrainerPct: ((highErrorTrainers.length / TRAINERS.length) * 100).toFixed(0),
    inactiveTrainerCount: inactiveTrainers.length,
    inactiveTrainerPct: ((inactiveTrainers.length / TRAINERS.length) * 100).toFixed(0),
    overFlaggingReviewerCount: overFlaggingReviewers.length,
    overFlaggingReviewerPct: ((overFlaggingReviewers.length / REVIEWERS.length) * 100).toFixed(0),
    avgMajorsPerReview: avgMajorsPerReview.toFixed(2),
  };
}

// ─── Q2 Action plan uplifts ────────────────────────────────────────────────────
export function q2Uplifts() {
  const diagnosis = q1Diagnosis();
  const projectedBase = parseFloat(diagnosis.projectedTotal);
  const targetUplift = P.goal - projectedBase;

  // Lever 1: Refocus reviewer hours on low-error trainer tasks
  // If avg reviews/sign-off drops from 9.77 → 5.5 (realistic target)
  const improvedReviewsPerSignOff = 5.5;
  const weeksRemaining = P.weeksTotal - P.snapshotWeek;
  const reviewerHoursRemaining = REVIEWERS.length * weeksRemaining * P.reviewerWeeklyHourCap;
  const reviewerCapacityReviews = reviewerHoursRemaining / P.hoursToReview;
  const uplift1SignOffs = reviewerCapacityReviews / improvedReviewsPerSignOff;
  const uplift1 = uplift1SignOffs - parseFloat(diagnosis.effectiveReviewerCapacity);

  // Lever 2: Activate underdelivering trainers
  const tm = trainerMetrics();
  const inactiveTrainers = tm.filter(t => t.isUnderdelivering);
  const { trainerHours: hoursPerTask } = pipelineHoursPerTask();
  const uplift2 = inactiveTrainers.length * (weeksRemaining * P.trainerWeeklyHourCap) / hoursPerTask;

  // Lever 3: Remove / re-train high-error trainers
  const highErrorTrainers = tm.filter(t => t.isHighErrorRate);
  const uplift3 = highErrorTrainers.length * (weeksRemaining * P.trainerWeeklyHourCap) / hoursPerTask * 0.5; // conservative

  return {
    targetUplift: targetUplift.toFixed(0),
    lever1: {
      name: "Refocus reviewers on low-error tasks",
      mechanism: `Reduce avg reviews/sign-off from ${diagnosis.avgReviewsPerSignOff} → ${improvedReviewsPerSignOff} by deprioritising high-error trainer tasks`,
      estimatedUplift: uplift1.toFixed(0),
    },
    lever2: {
      name: "Activate underdelivering trainers",
      mechanism: `${inactiveTrainers.length} trainers have claimed tasks but completed 0 — chasing these recovers lost capacity`,
      estimatedUplift: uplift2.toFixed(0),
    },
    lever3: {
      name: "Re-train or replace high-error trainers",
      mechanism: `${highErrorTrainers.length} trainers have >5 majors/task — replacing with quality writers cuts review cycles`,
      estimatedUplift: uplift3.toFixed(0),
    },
  };
}

// ─── Totals for summary cards ─────────────────────────────────────────────────
export function totals() {
  return {
    totalTrainers: TRAINERS.length,
    totalReviewers: REVIEWERS.length,
    totalClaimed: TRAINERS.reduce((s, t) => s + t.claimed, 0),
    totalCompleted: TRAINERS.reduce((s, t) => s + t.completed, 0),
    totalSignedOff: TRAINERS.reduce((s, t) => s + t.signedOff, 0),
    totalNeedsWork: TRAINERS.reduce((s, t) => s + t.needsWork, 0),
    totalFixingDone: TRAINERS.reduce((s, t) => s + t.fixingDone, 0),
    totalMajorIssues: TRAINERS.reduce((s, t) => s + t.majorIssues, 0),
    totalReviewsDone: REVIEWERS.reduce((s, r) => s + r.reviewsCompleted, 0),
  };
}
