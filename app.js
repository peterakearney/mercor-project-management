// ─── Project Parameters ───────────────────────────────────────────────────────
const P = {
  goal: 600,
  weeksTotal: 4,
  snapshotWeek: 2,
  trainerWeeklyHourCap: 30,
  reviewerWeeklyHourCap: 60,
  hoursToWrite: 6,
  hoursToReview: 2,
  hoursToRevise: 1.5,
  expectedRevisionCycles: 2,
};

// ─── Trainer Data ─────────────────────────────────────────────────────────────
const TRAINERS = [
  { id: "Trainer1",  claimed: 6,  completed: 21, fixingDone: 0,  needsWork: 8,  signedOff: 0,  minorIssues: 21,  majorIssues: 42  },
  { id: "Trainer2",  claimed: 6,  completed: 6,  fixingDone: 2,  needsWork: 5,  signedOff: 0,  minorIssues: 8,   majorIssues: 26  },
  { id: "Trainer3",  claimed: 5,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer4",  claimed: 6,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer5",  claimed: 6,  completed: 5,  fixingDone: 2,  needsWork: 3,  signedOff: 0,  minorIssues: 4,   majorIssues: 49  },
  { id: "Trainer6",  claimed: 8,  completed: 8,  fixingDone: 3,  needsWork: 6,  signedOff: 2,  minorIssues: 7,   majorIssues: 50  },
  { id: "Trainer7",  claimed: 9,  completed: 6,  fixingDone: 3,  needsWork: 3,  signedOff: 0,  minorIssues: 7,   majorIssues: 22  },
  { id: "Trainer8",  claimed: 9,  completed: 8,  fixingDone: 3,  needsWork: 5,  signedOff: 3,  minorIssues: 17,  majorIssues: 48  },
  { id: "Trainer9",  claimed: 2,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer10", claimed: 2,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer11", claimed: 17, completed: 17, fixingDone: 3,  needsWork: 5,  signedOff: 0,  minorIssues: 31,  majorIssues: 28  },
  { id: "Trainer12", claimed: 2,  completed: 2,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer13", claimed: 47, completed: 6,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 1,   majorIssues: 21  },
  { id: "Trainer14", claimed: 12, completed: 11, fixingDone: 5,  needsWork: 9,  signedOff: 3,  minorIssues: 23,  majorIssues: 158 },
  { id: "Trainer15", claimed: 2,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer16", claimed: 5,  completed: 5,  fixingDone: 2,  needsWork: 5,  signedOff: 0,  minorIssues: 6,   majorIssues: 24  },
  { id: "Trainer17", claimed: 2,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer18", claimed: 5,  completed: 3,  fixingDone: 3,  needsWork: 3,  signedOff: 2,  minorIssues: 2,   majorIssues: 24  },
  { id: "Trainer19", claimed: 14, completed: 20, fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer20", claimed: 3,  completed: 2,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 3,   majorIssues: 4   },
  { id: "Trainer21", claimed: 11, completed: 8,  fixingDone: 6,  needsWork: 6,  signedOff: 3,  minorIssues: 15,  majorIssues: 49  },
  { id: "Trainer22", claimed: 6,  completed: 3,  fixingDone: 2,  needsWork: 3,  signedOff: 2,  minorIssues: 9,   majorIssues: 17  },
  { id: "Trainer23", claimed: 3,  completed: 2,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 0,   majorIssues: 20  },
  { id: "Trainer24", claimed: 15, completed: 14, fixingDone: 0,  needsWork: 3,  signedOff: 0,  minorIssues: 14,  majorIssues: 2   },
  { id: "Trainer25", claimed: 6,  completed: 5,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer26", claimed: 5,  completed: 5,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 2,   majorIssues: 29  },
  { id: "Trainer27", claimed: 6,  completed: 5,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 35,  majorIssues: 7   },
  { id: "Trainer28", claimed: 9,  completed: 3,  fixingDone: 5,  needsWork: 3,  signedOff: 5,  minorIssues: 1,   majorIssues: 46  },
  { id: "Trainer29", claimed: 5,  completed: 2,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 0,   majorIssues: 18  },
  { id: "Trainer30", claimed: 5,  completed: 3,  fixingDone: 2,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer31", claimed: 3,  completed: 3,  fixingDone: 3,  needsWork: 3,  signedOff: 2,  minorIssues: 7,   majorIssues: 16  },
  { id: "Trainer32", claimed: 9,  completed: 6,  fixingDone: 3,  needsWork: 5,  signedOff: 3,  minorIssues: 13,  majorIssues: 29  },
  { id: "Trainer33", claimed: 6,  completed: 2,  fixingDone: 2,  needsWork: 2,  signedOff: 2,  minorIssues: 17,  majorIssues: 12  },
  { id: "Trainer34", claimed: 14, completed: 23, fixingDone: 3,  needsWork: 0,  signedOff: 2,  minorIssues: 1,   majorIssues: 0   },
  { id: "Trainer35", claimed: 8,  completed: 3,  fixingDone: 2,  needsWork: 3,  signedOff: 0,  minorIssues: 28,  majorIssues: 13  },
  { id: "Trainer36", claimed: 9,  completed: 9,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 7,   majorIssues: 9   },
  { id: "Trainer37", claimed: 12, completed: 9,  fixingDone: 5,  needsWork: 6,  signedOff: 2,  minorIssues: 18,  majorIssues: 87  },
  { id: "Trainer38", claimed: 12, completed: 8,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer39", claimed: 8,  completed: 0,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 39,  majorIssues: 12  },
  { id: "Trainer40", claimed: 8,  completed: 6,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 1,   majorIssues: 9   },
  { id: "Trainer41", claimed: 9,  completed: 5,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 0,   majorIssues: 14  },
  { id: "Trainer42", claimed: 2,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer43", claimed: 9,  completed: 2,  fixingDone: 3,  needsWork: 3,  signedOff: 2,  minorIssues: 13,  majorIssues: 7   },
  { id: "Trainer44", claimed: 32, completed: 12, fixingDone: 5,  needsWork: 3,  signedOff: 0,  minorIssues: 9,   majorIssues: 25  },
  { id: "Trainer45", claimed: 5,  completed: 3,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer46", claimed: 6,  completed: 5,  fixingDone: 5,  needsWork: 6,  signedOff: 3,  minorIssues: 21,  majorIssues: 46  },
  { id: "Trainer47", claimed: 6,  completed: 3,  fixingDone: 2,  needsWork: 3,  signedOff: 2,  minorIssues: 36,  majorIssues: 27  },
  { id: "Trainer48", claimed: 14, completed: 15, fixingDone: 3,  needsWork: 2,  signedOff: 2,  minorIssues: 8,   majorIssues: 7   },
  { id: "Trainer49", claimed: 6,  completed: 14, fixingDone: 3,  needsWork: 6,  signedOff: 6,  minorIssues: 14,  majorIssues: 2   },
  { id: "Trainer50", claimed: 3,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer51", claimed: 6,  completed: 2,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 0,   majorIssues: 6   },
  { id: "Trainer52", claimed: 0,  completed: 12, fixingDone: 8,  needsWork: 2,  signedOff: 0,  minorIssues: 3,   majorIssues: 23  },
  { id: "Trainer53", claimed: 24, completed: 23, fixingDone: 9,  needsWork: 9,  signedOff: 6,  minorIssues: 22,  majorIssues: 49  },
  { id: "Trainer54", claimed: 8,  completed: 12, fixingDone: 5,  needsWork: 11, signedOff: 3,  minorIssues: 7,   majorIssues: 39  },
  { id: "Trainer55", claimed: 6,  completed: 5,  fixingDone: 3,  needsWork: 3,  signedOff: 0,  minorIssues: 3,   majorIssues: 7   },
  { id: "Trainer56", claimed: 26, completed: 12, fixingDone: 8,  needsWork: 8,  signedOff: 5,  minorIssues: 11,  majorIssues: 21  },
  { id: "Trainer57", claimed: 3,  completed: 3,  fixingDone: 2,  needsWork: 2,  signedOff: 2,  minorIssues: 37,  majorIssues: 14  },
  { id: "Trainer58", claimed: 11, completed: 3,  fixingDone: 3,  needsWork: 5,  signedOff: 0,  minorIssues: 25,  majorIssues: 30  },
  { id: "Trainer59", claimed: 2,  completed: 0,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer60", claimed: 5,  completed: 3,  fixingDone: 3,  needsWork: 3,  signedOff: 2,  minorIssues: 4,   majorIssues: 12  },
  { id: "Trainer61", claimed: 12, completed: 2,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer62", claimed: 21, completed: 20, fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 0,   majorIssues: 1   },
  { id: "Trainer63", claimed: 8,  completed: 6,  fixingDone: 2,  needsWork: 3,  signedOff: 2,  minorIssues: 16,  majorIssues: 13  },
  { id: "Trainer64", claimed: 6,  completed: 5,  fixingDone: 3,  needsWork: 5,  signedOff: 0,  minorIssues: 18,  majorIssues: 42  },
  { id: "Trainer65", claimed: 20, completed: 17, fixingDone: 3,  needsWork: 2,  signedOff: 2,  minorIssues: 1,   majorIssues: 0   },
  { id: "Trainer66", claimed: 5,  completed: 2,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 8,   majorIssues: 34  },
  { id: "Trainer67", claimed: 0,  completed: 8,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer68", claimed: 5,  completed: 2,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer69", claimed: 3,  completed: 2,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer70", claimed: 5,  completed: 2,  fixingDone: 2,  needsWork: 2,  signedOff: 2,  minorIssues: 4,   majorIssues: 16  },
  { id: "Trainer71", claimed: 3,  completed: 14, fixingDone: 2,  needsWork: 8,  signedOff: 3,  minorIssues: 5,   majorIssues: 9   },
  { id: "Trainer72", claimed: 8,  completed: 5,  fixingDone: 2,  needsWork: 2,  signedOff: 0,  minorIssues: 0,   majorIssues: 6   },
  { id: "Trainer73", claimed: 9,  completed: 5,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 2,   majorIssues: 9   },
  { id: "Trainer74", claimed: 6,  completed: 6,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 4,   majorIssues: 10  },
  { id: "Trainer75", claimed: 17, completed: 14, fixingDone: 11, needsWork: 12, signedOff: 5,  minorIssues: 35,  majorIssues: 139 },
  { id: "Trainer76", claimed: 20, completed: 6,  fixingDone: 2,  needsWork: 2,  signedOff: 2,  minorIssues: 4,   majorIssues: 12  },
  { id: "Trainer77", claimed: 12, completed: 14, fixingDone: 6,  needsWork: 8,  signedOff: 9,  minorIssues: 12,  majorIssues: 10  },
  { id: "Trainer78", claimed: 3,  completed: 2,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 5,   majorIssues: 9   },
  { id: "Trainer79", claimed: 3,  completed: 2,  fixingDone: 0,  needsWork: 2,  signedOff: 0,  minorIssues: 5,   majorIssues: 7   },
  { id: "Trainer80", claimed: 5,  completed: 2,  fixingDone: 3,  needsWork: 3,  signedOff: 0,  minorIssues: 7,   majorIssues: 26  },
  { id: "Trainer81", claimed: 20, completed: 11, fixingDone: 8,  needsWork: 8,  signedOff: 6,  minorIssues: 18,  majorIssues: 68  },
  { id: "Trainer82", claimed: 6,  completed: 2,  fixingDone: 0,  needsWork: 0,  signedOff: 0,  minorIssues: 0,   majorIssues: 0   },
  { id: "Trainer83", claimed: 12, completed: 12, fixingDone: 6,  needsWork: 9,  signedOff: 2,  minorIssues: 41,  majorIssues: 52  },
  { id: "Trainer84", claimed: 6,  completed: 3,  fixingDone: 5,  needsWork: 3,  signedOff: 2,  minorIssues: 17,  majorIssues: 26  },
  { id: "Trainer85", claimed: 14, completed: 12, fixingDone: 0,  needsWork: 0,  signedOff: 3,  minorIssues: 1,   majorIssues: 1   },
];

// ─── Reviewer Data ────────────────────────────────────────────────────────────
const REVIEWERS = [
  { id: "Reviewer1",  reviewsCompleted: 80,  minorIssues: 68,  majorIssues: 119, status: "OVER"  },
  { id: "Reviewer2",  reviewsCompleted: 8,   minorIssues: 3,   majorIssues: 1,   status: "UNDER" },
  { id: "Reviewer3",  reviewsCompleted: 95,  minorIssues: 100, majorIssues: 290, status: "OVER"  },
  { id: "Reviewer4",  reviewsCompleted: 8,   minorIssues: 9,   majorIssues: 24,  status: "UNDER" },
  { id: "Reviewer5",  reviewsCompleted: 13,  minorIssues: 5,   majorIssues: 6,   status: "UNDER" },
  { id: "Reviewer6",  reviewsCompleted: 103, minorIssues: 53,  majorIssues: 173, status: "OVER"  },
  { id: "Reviewer7",  reviewsCompleted: 75,  minorIssues: 19,  majorIssues: 128, status: "OVER"  },
  { id: "Reviewer8",  reviewsCompleted: 60,  minorIssues: 24,  majorIssues: 16,  status: "UNDER" },
  { id: "Reviewer9",  reviewsCompleted: 20,  minorIssues: 4,   majorIssues: 21,  status: "UNDER" },
  { id: "Reviewer10", reviewsCompleted: 28,  minorIssues: 46,  majorIssues: 33,  status: "UNDER" },
  { id: "Reviewer11", reviewsCompleted: 20,  minorIssues: 12,  majorIssues: 67,  status: "UNDER" },
  { id: "Reviewer12", reviewsCompleted: 0,   minorIssues: 0,   majorIssues: 0,   status: "UNDER" },
  { id: "Reviewer13", reviewsCompleted: 65,  minorIssues: 35,  majorIssues: 28,  status: "OVER"  },
  { id: "Reviewer14", reviewsCompleted: 0,   minorIssues: 0,   majorIssues: 0,   status: "UNDER" },
  { id: "Reviewer15", reviewsCompleted: 15,  minorIssues: 6,   majorIssues: 19,  status: "UNDER" },
  { id: "Reviewer16", reviewsCompleted: 125, minorIssues: 131, majorIssues: 86,  status: "OVER"  },
  { id: "Reviewer17", reviewsCompleted: 58,  minorIssues: 7,   majorIssues: 160, status: "UNDER" },
  { id: "Reviewer18", reviewsCompleted: 68,  minorIssues: 59,  majorIssues: 64,  status: "OVER"  },
  { id: "Reviewer19", reviewsCompleted: 68,  minorIssues: 9,   majorIssues: 150, status: "OVER"  },
  { id: "Reviewer20", reviewsCompleted: 88,  minorIssues: 163, majorIssues: 305, status: "OVER"  },
];

// ─── Calculations ─────────────────────────────────────────────────────────────
const weeksRemaining = P.weeksTotal - P.snapshotWeek; // 2
const trainerHoursPerTask = P.hoursToWrite + P.expectedRevisionCycles * P.hoursToRevise; // 9
const reviewerHoursPerTask = P.expectedRevisionCycles * P.hoursToReview; // 4

// Totals
const totalSignedOff    = TRAINERS.reduce((s, t) => s + t.signedOff, 0);
const totalCompleted    = TRAINERS.reduce((s, t) => s + t.completed, 0);
const totalNeedsWork    = TRAINERS.reduce((s, t) => s + t.needsWork, 0);
const totalFixingDone   = TRAINERS.reduce((s, t) => s + t.fixingDone, 0);
const totalClaimed      = TRAINERS.reduce((s, t) => s + t.claimed, 0);
const totalMajorIssues  = TRAINERS.reduce((s, t) => s + t.majorIssues, 0);
const totalReviewsDone  = REVIEWERS.reduce((s, r) => s + r.reviewsCompleted, 0);
const totalRevMajors    = REVIEWERS.reduce((s, r) => s + r.majorIssues, 0);

// Per-trainer metrics
const trainerData = TRAINERS.map(t => {
  const majorsPerTask    = t.completed > 0 ? t.majorIssues / t.completed : null;
  const isHighError      = majorsPerTask !== null && majorsPerTask > 5;
  const isInactive       = t.completed === 0 && t.claimed > 0;
  return { ...t, majorsPerTask, isHighError, isInactive };
});

// Per-reviewer metrics
const avgMajorsPerReview = totalReviewsDone > 0 ? totalRevMajors / totalReviewsDone : 0;
const reviewerData = REVIEWERS.map(r => {
  const majorsPerReview  = r.reviewsCompleted > 0 ? r.majorIssues / r.reviewsCompleted : null;
  const isOverFlagging   = majorsPerReview !== null && majorsPerReview > avgMajorsPerReview;
  return { ...r, majorsPerReview, isOverFlagging };
});

// Q1 diagnosis numbers
const avgReviewsPerSignOff = totalSignedOff > 0 ? totalReviewsDone / totalSignedOff : null;

const trainerHoursRemaining   = TRAINERS.length * weeksRemaining * P.trainerWeeklyHourCap;
const trainerEstCompletions   = trainerHoursRemaining / trainerHoursPerTask;

const reviewerHoursRemaining  = REVIEWERS.length * weeksRemaining * P.reviewerWeeklyHourCap;
const rawReviewCapacity       = reviewerHoursRemaining / P.hoursToReview;
const effectiveSignOffCap     = avgReviewsPerSignOff ? rawReviewCapacity / avgReviewsPerSignOff : rawReviewCapacity;
const projectedTotal          = totalSignedOff + Math.min(trainerEstCompletions, effectiveSignOffCap);

const highErrorTrainers  = trainerData.filter(t => t.isHighError);
const inactiveTrainers   = trainerData.filter(t => t.isInactive);
const overFlaggingRevs   = reviewerData.filter(r => r.isOverFlagging);

// Q2 lever uplifts
const improvedReviewsPerSignOff = 5.5;
const uplift1 = (rawReviewCapacity / improvedReviewsPerSignOff) - effectiveSignOffCap;
const uplift2 = inactiveTrainers.length * (weeksRemaining * P.trainerWeeklyHourCap) / trainerHoursPerTask;
const uplift3 = highErrorTrainers.length * (weeksRemaining * P.trainerWeeklyHourCap) / trainerHoursPerTask * 0.5;

// ─── Render summary cards ─────────────────────────────────────────────────────
const cardDefs = [
  { label: 'Signed Off',      value: totalSignedOff,                          sub: `of ${P.goal} goal`,              color: 'red'    },
  { label: 'Remaining',       value: P.goal - totalSignedOff,                  sub: 'tasks still needed',             color: 'amber'  },
  { label: 'Completed',       value: totalCompleted,                           sub: 'written, pending review'                          },
  { label: 'Needs Work',      value: totalNeedsWork,                           sub: 'back with trainers',             color: 'amber'  },
  { label: 'Fixing Done',     value: totalFixingDone,                          sub: 'awaiting re-review'                               },
  { label: 'Total Claimed',   value: totalClaimed,                             sub: `across ${TRAINERS.length} trainers`               },
  { label: 'Reviews Done',    value: totalReviewsDone,                         sub: `by ${REVIEWERS.length} reviewers`, color: 'accent'},
  { label: 'Major Issues',    value: totalMajorIssues,                         sub: 'flagged total',                  color: 'red'    },
];

document.getElementById('summary-cards').innerHTML = cardDefs.map(c => `
  <div class="card">
    <div class="card-label">${c.label}</div>
    <div class="card-value ${c.color || ''}">${c.value.toLocaleString()}</div>
    <div class="card-sub">${c.sub}</div>
  </div>
`).join('');

// ─── On-track badge ───────────────────────────────────────────────────────────
document.getElementById('on-track-badge').innerHTML = `
  <span class="badge badge-${projectedTotal >= P.goal ? 'green' : 'red'}">
    ${projectedTotal >= P.goal ? 'On Track' : 'Off Track'} · Projected ${Math.round(projectedTotal)} / ${P.goal}
  </span>`;

// ─── Q1 Diagnosis ─────────────────────────────────────────────────────────────
document.getElementById('q1-content').innerHTML = `
  <div class="diagnosis-grid">
    <div class="diag-block">
      <h3>Progress vs Target</h3>
      <div class="diag-row"><span>Signed off at week 2</span><span class="val bad">${totalSignedOff}</span></div>
      <div class="diag-row"><span>Goal (end of week 4)</span><span class="val">${P.goal}</span></div>
      <div class="diag-row"><span>Gap remaining</span><span class="val bad">${P.goal - totalSignedOff}</span></div>
      <div class="diag-row"><span>Weeks remaining</span><span class="val">${weeksRemaining}</span></div>
      <div class="diag-row"><span>Projected total at current pace</span><span class="val bad">~${Math.round(projectedTotal)}</span></div>
    </div>
    <div class="diag-block">
      <h3>Root Cause: Review Cycle Bloat</h3>
      <div class="diag-row"><span>Expected reviews / sign-off</span><span class="val good">${P.expectedRevisionCycles}</span></div>
      <div class="diag-row"><span>Actual reviews / sign-off</span><span class="val bad">${avgReviewsPerSignOff ? avgReviewsPerSignOff.toFixed(2) : '—'}</span></div>
      <div class="diag-row"><span>Total reviews completed</span><span class="val">${totalReviewsDone}</span></div>
      <div class="diag-row"><span>Total major issues flagged</span><span class="val bad">${totalRevMajors.toLocaleString()}</span></div>
      <div class="diag-row"><span>Avg majors / review</span><span class="val warn">${avgMajorsPerReview.toFixed(2)}</span></div>
    </div>
    <div class="diag-block">
      <h3>Trainer Quality Issues</h3>
      <div class="diag-row"><span>High error trainers (&gt;5 majors/task)</span><span class="val bad">${highErrorTrainers.length} (${Math.round(highErrorTrainers.length / TRAINERS.length * 100)}%)</span></div>
      <div class="diag-row"><span>Inactive trainers (0 completed)</span><span class="val warn">${inactiveTrainers.length} (${Math.round(inactiveTrainers.length / TRAINERS.length * 100)}%)</span></div>
      <div class="diag-row"><span>Total major issues from trainers</span><span class="val bad">${totalMajorIssues.toLocaleString()}</span></div>
    </div>
    <div class="diag-block">
      <h3>Reviewer Behaviour</h3>
      <div class="diag-row"><span>Reviewers above avg major rate</span><span class="val warn">${overFlaggingRevs.length} (${Math.round(overFlaggingRevs.length / REVIEWERS.length * 100)}%)</span></div>
      <div class="diag-row"><span>Reviewers with 0 reviews done</span><span class="val bad">${REVIEWERS.filter(r => r.reviewsCompleted === 0).length}</span></div>
      <div class="diag-row"><span>Avg majors / review (all reviewers)</span><span class="val warn">${avgMajorsPerReview.toFixed(2)}</span></div>
    </div>
  </div>
`;

document.getElementById('q1-workings').innerHTML = `
  <span class="section-head">Pipeline hours per task (from project parameters)</span>
  <div class="line"><span class="label">Trainer hours / task</span><span class="formula">= ${P.hoursToWrite}h write + (${P.expectedRevisionCycles} cycles × ${P.hoursToRevise}h revise)</span><span class="result">= ${trainerHoursPerTask}h</span></div>
  <div class="line"><span class="label">Reviewer hours / task</span><span class="formula">= ${P.expectedRevisionCycles} cycles × ${P.hoursToReview}h review</span><span class="result">= ${reviewerHoursPerTask}h</span></div>

  <span class="section-head">Trainer capacity (weeks 3–4)</span>
  <div class="line"><span class="label">Total trainer hours remaining</span><span class="formula">= ${TRAINERS.length} trainers × ${weeksRemaining} weeks × ${P.trainerWeeklyHourCap}h cap</span><span class="result">= ${trainerHoursRemaining.toLocaleString()}h</span></div>
  <div class="line"><span class="label">Est. trainer completions</span><span class="formula">= ${trainerHoursRemaining.toLocaleString()}h ÷ ${trainerHoursPerTask}h per task</span><span class="result">= ${Math.round(trainerEstCompletions)}</span></div>

  <span class="section-head">Reviewer capacity (weeks 3–4)</span>
  <div class="line"><span class="label">Total reviewer hours remaining</span><span class="formula">= ${REVIEWERS.length} reviewers × ${weeksRemaining} weeks × ${P.reviewerWeeklyHourCap}h cap</span><span class="result">= ${reviewerHoursRemaining.toLocaleString()}h</span></div>
  <div class="line"><span class="label">Raw review capacity</span><span class="formula">= ${reviewerHoursRemaining.toLocaleString()}h ÷ ${P.hoursToReview}h per review</span><span class="result">= ${Math.round(rawReviewCapacity)} reviews</span></div>
  <div class="line"><span class="label">Effective sign-offs at current rate</span><span class="formula">= ${Math.round(rawReviewCapacity)} ÷ ${avgReviewsPerSignOff ? avgReviewsPerSignOff.toFixed(2) : '—'} reviews/sign-off</span><span class="result">= ${Math.round(effectiveSignOffCap)}</span></div>

  <span class="section-head">Projected total sign-offs</span>
  <div class="line"><span class="label">Already signed off</span><span class="formula"></span><span class="result">${totalSignedOff}</span></div>
  <div class="line"><span class="label">Bottleneck = min(trainer capacity, reviewer capacity)</span><span class="formula">= min(${Math.round(trainerEstCompletions)}, ${Math.round(effectiveSignOffCap)})</span><span class="result">${Math.round(effectiveSignOffCap)}</span></div>
  <div class="line"><span class="label">Projected total</span><span class="formula">= ${totalSignedOff} + ${Math.round(effectiveSignOffCap)}</span><span class="result"><strong>${Math.round(projectedTotal)}</strong> vs goal of ${P.goal}</span></div>
`;

// ─── Q2 Action plan ───────────────────────────────────────────────────────────
document.getElementById('q2-content').innerHTML = `
  <p style="margin-bottom:1rem; color:var(--muted); font-size:.85rem;">
    Shortfall: <strong style="color:var(--red)">${Math.round(P.goal - projectedTotal)} tasks</strong> below target at current pace.
    Three levers prioritised by estimated impact:
  </p>
  <div class="levers">
    <div class="lever">
      <h3>1. Refocus reviewers on low-error tasks</h3>
      <p>Reduce avg reviews/sign-off from <strong>${avgReviewsPerSignOff ? avgReviewsPerSignOff.toFixed(1) : '—'} → 5.5</strong> by routing reviewer capacity to high-quality trainer output first.</p>
      <div class="uplift">+${Math.round(uplift1)}</div>
      <div class="uplift-label">estimated additional sign-offs</div>
    </div>
    <div class="lever">
      <h3>2. Activate underdelivering trainers</h3>
      <p><strong>${inactiveTrainers.length} trainers</strong> have claimed tasks but completed zero. Chasing these recovers significant lost writing capacity.</p>
      <div class="uplift">+${Math.round(uplift2)}</div>
      <div class="uplift-label">estimated additional sign-offs</div>
    </div>
    <div class="lever">
      <h3>3. Replace / re-train high-error trainers</h3>
      <p><strong>${highErrorTrainers.length} trainers</strong> have &gt;5 majors/task, consuming disproportionate reviewer hours. Replacing with quality writers cuts review cycles.</p>
      <div class="uplift">+${Math.round(uplift3)}</div>
      <div class="uplift-label">estimated additional sign-offs (conservative)</div>
    </div>
  </div>
`;

document.getElementById('q2-workings').innerHTML = `
  <span class="section-head">Lever 1 — Refocus reviewers</span>
  <div class="line"><span class="label">Target reviews/sign-off</span><span class="formula">reduce ${avgReviewsPerSignOff ? avgReviewsPerSignOff.toFixed(2) : '—'} → 5.5 (realistic if high-error tasks deprioritised)</span></div>
  <div class="line"><span class="label">Sign-offs at 5.5 rate</span><span class="formula">= ${Math.round(rawReviewCapacity)} reviews ÷ 5.5</span><span class="result">= ${Math.round(rawReviewCapacity / improvedReviewsPerSignOff)}</span></div>
  <div class="line"><span class="label">Uplift vs baseline</span><span class="formula">= ${Math.round(rawReviewCapacity / improvedReviewsPerSignOff)} − ${Math.round(effectiveSignOffCap)}</span><span class="result">= +${Math.round(uplift1)}</span></div>

  <span class="section-head">Lever 2 — Activate inactive trainers</span>
  <div class="line"><span class="label">Inactive trainers</span><span class="formula">claimed > 0 AND completed = 0</span><span class="result">${inactiveTrainers.length}</span></div>
  <div class="line"><span class="label">Hours per trainer (2 weeks)</span><span class="formula">= ${weeksRemaining} × ${P.trainerWeeklyHourCap}h</span><span class="result">= ${weeksRemaining * P.trainerWeeklyHourCap}h</span></div>
  <div class="line"><span class="label">Tasks per trainer</span><span class="formula">= ${weeksRemaining * P.trainerWeeklyHourCap}h ÷ ${trainerHoursPerTask}h</span><span class="result">= ${(weeksRemaining * P.trainerWeeklyHourCap / trainerHoursPerTask).toFixed(1)}</span></div>
  <div class="line"><span class="label">Total uplift</span><span class="formula">= ${inactiveTrainers.length} × ${(weeksRemaining * P.trainerWeeklyHourCap / trainerHoursPerTask).toFixed(1)}</span><span class="result">= +${Math.round(uplift2)}</span></div>

  <span class="section-head">Lever 3 — High-error trainers</span>
  <div class="line"><span class="label">High-error trainers (>5 majors/task)</span><span class="formula"></span><span class="result">${highErrorTrainers.length}</span></div>
  <div class="line"><span class="label">Conservative uplift (50% efficiency gain)</span><span class="formula">= ${highErrorTrainers.length} × ${(weeksRemaining * P.trainerWeeklyHourCap / trainerHoursPerTask).toFixed(1)} × 0.5</span><span class="result">= +${Math.round(uplift3)}</span></div>
`;

// ─── Trainer table ────────────────────────────────────────────────────────────
function renderTrainerTable(data) {
  document.getElementById('trainer-tbody').innerHTML = data.map(t => {
    const rowClass  = t.isHighError ? 'row-high-error' : t.isInactive ? 'row-inactive' : '';
    const majors    = t.majorsPerTask !== null ? t.majorsPerTask.toFixed(1) : '—';
    const status    = t.isHighError
      ? '<span class="badge badge-red">High errors</span>'
      : t.isInactive
      ? '<span class="badge badge-amber">Inactive</span>'
      : t.signedOff > 0
      ? '<span class="badge badge-green">Delivering</span>'
      : '<span class="badge">In progress</span>';
    return `<tr class="${rowClass}">
      <td>${t.id}</td>
      <td>${t.claimed}</td>
      <td>${t.completed}</td>
      <td>${t.fixingDone}</td>
      <td>${t.needsWork}</td>
      <td><strong>${t.signedOff}</strong></td>
      <td>${t.majorIssues}</td>
      <td>${majors}</td>
      <td>${status}</td>
    </tr>`;
  }).join('');
}

renderTrainerTable(trainerData);

function applyTrainerFilters() {
  const q      = document.getElementById('trainer-search').value.toLowerCase();
  const filter = document.getElementById('trainer-filter').value;
  let data = trainerData;
  if (filter === 'high-error') data = data.filter(t => t.isHighError);
  else if (filter === 'inactive') data = data.filter(t => t.isInactive);
  else if (filter === 'signed-off') data = data.filter(t => t.signedOff > 0);
  if (q) data = data.filter(t => t.id.toLowerCase().includes(q));
  renderTrainerTable(data);
}

document.getElementById('trainer-search').addEventListener('input', applyTrainerFilters);
document.getElementById('trainer-filter').addEventListener('change', applyTrainerFilters);

// ─── Reviewer table ───────────────────────────────────────────────────────────
document.getElementById('reviewer-tbody').innerHTML = reviewerData.map(r => {
  const majors = r.majorsPerReview !== null ? r.majorsPerReview.toFixed(2) : '—';
  const statusClass = r.status === 'OVER' ? 'badge-green' : 'badge-amber';
  return `<tr class="${r.isOverFlagging ? 'row-high-error' : ''}">
    <td>${r.id}</td>
    <td>${r.reviewsCompleted}</td>
    <td>${r.minorIssues}</td>
    <td>${r.majorIssues}</td>
    <td style="font-weight:${r.isOverFlagging ? 700 : 400}; color:${r.isOverFlagging ? 'var(--red)' : 'inherit'}">${majors}</td>
    <td>
      <span class="badge ${statusClass}">${r.status}</span>
      ${r.isOverFlagging ? '<span class="badge badge-red" style="margin-left:4px">Over-flagging</span>' : ''}
    </td>
  </tr>`;
}).join('');

// ─── Toggle workings ──────────────────────────────────────────────────────────
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    target.classList.toggle('hidden');
    btn.textContent = target.classList.contains('hidden') ? 'Show workings' : 'Hide workings';
  });
});
