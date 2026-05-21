import { PROJECT_PARAMS as P, TRAINERS, REVIEWERS } from './data.js';
import { trainerMetrics, reviewerMetrics, q1Diagnosis, q2Uplifts, totals, pipelineHoursPerTask } from './calculations.js';

// ─── Toggle workings ──────────────────────────────────────────────────────────
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    target.classList.toggle('hidden');
    btn.textContent = target.classList.contains('hidden') ? 'Show workings' : 'Hide workings';
  });
});

// ─── Summary cards ────────────────────────────────────────────────────────────
const t = totals();
const cards = [
  { label: 'Signed Off', value: t.totalSignedOff, sub: `of ${P.goal} goal`, color: t.totalSignedOff < P.goal * 0.5 ? 'red' : 'green' },
  { label: 'Remaining', value: P.goal - t.totalSignedOff, sub: 'to hit target', color: 'amber' },
  { label: 'Completed Tasks', value: t.totalCompleted, sub: 'awaiting review' },
  { label: 'Needs Work', value: t.totalNeedsWork, sub: 'back with trainers', color: 'amber' },
  { label: 'Fixing Done', value: t.totalFixingDone, sub: 'awaiting re-review' },
  { label: 'Total Claimed', value: t.totalClaimed, sub: `across ${t.totalTrainers} trainers` },
  { label: 'Reviews Done', value: t.totalReviewsDone, sub: `by ${t.totalReviewers} reviewers`, color: 'accent' },
  { label: 'Major Issues', value: t.totalMajorIssues, sub: 'flagged total', color: 'red' },
];

document.getElementById('summary-cards').innerHTML = cards.map(c => `
  <div class="card">
    <div class="card-label">${c.label}</div>
    <div class="card-value ${c.color || ''}">${c.value.toLocaleString()}</div>
    <div class="card-sub">${c.sub}</div>
  </div>
`).join('');

// ─── On-track badge ───────────────────────────────────────────────────────────
const diag = q1Diagnosis();
const badge = document.getElementById('on-track-badge');
badge.innerHTML = `<span class="badge badge-${diag.onTrack ? 'green' : 'red'}">
  ${diag.onTrack ? 'On Track' : 'Off Track'} · Projected ${diag.projectedTotal} / ${P.goal}
</span>`;

// ─── Q1 Diagnosis content ─────────────────────────────────────────────────────
document.getElementById('q1-content').innerHTML = `
  <div class="diagnosis-grid">
    <div class="diag-block">
      <h3>Progress vs Target</h3>
      <div class="diag-row"><span>Signed off (week 2)</span><span class="val bad">${diag.currentSignedOff}</span></div>
      <div class="diag-row"><span>Goal (week 4)</span><span class="val">${P.goal}</span></div>
      <div class="diag-row"><span>Gap remaining</span><span class="val bad">${diag.gap}</span></div>
      <div class="diag-row"><span>Weeks remaining</span><span class="val">${diag.weeksRemaining}</span></div>
      <div class="diag-row"><span>Projected sign-offs at current pace</span><span class="val bad">~${diag.projectedTotal}</span></div>
    </div>
    <div class="diag-block">
      <h3>Root Cause: Review Cycle Bloat</h3>
      <div class="diag-row"><span>Expected reviews / sign-off</span><span class="val good">${diag.expectedReviewsPerSignOff}</span></div>
      <div class="diag-row"><span>Actual reviews / sign-off</span><span class="val bad">${diag.avgReviewsPerSignOff}</span></div>
      <div class="diag-row"><span>Total reviews done</span><span class="val">${diag.totalReviewsDone}</span></div>
      <div class="diag-row"><span>Total major issues flagged</span><span class="val bad">${diag.totalMajorIssues}</span></div>
      <div class="diag-row"><span>Avg majors / review</span><span class="val warn">${diag.avgMajorsPerReview}</span></div>
    </div>
    <div class="diag-block">
      <h3>Trainer Quality Issues</h3>
      <div class="diag-row"><span>High error trainers (&gt;5 majors/task)</span><span class="val bad">${diag.highErrorTrainerCount} (${diag.highErrorTrainerPct}%)</span></div>
      <div class="diag-row"><span>Inactive trainers (0 completed)</span><span class="val warn">${diag.inactiveTrainerCount} (${diag.inactiveTrainerPct}%)</span></div>
    </div>
    <div class="diag-block">
      <h3>Reviewer Behaviour</h3>
      <div class="diag-row"><span>Reviewers flagging above avg major rate</span><span class="val warn">${diag.overFlaggingReviewerCount} (${diag.overFlaggingReviewerPct}%)</span></div>
      <div class="diag-row"><span>Reviewers with 0 reviews done</span><span class="val bad">2</span></div>
    </div>
  </div>
`;

document.getElementById('q1-workings').innerHTML = `
  <span class="section-head">Pipeline hours per task</span>
  <div class="line"><span class="label">Trainer hours / task</span><span class="formula">= ${P.hoursToWrite}h write + (${P.expectedRevisionCycles} cycles × ${P.hoursToRevise}h revise)</span><span class="result">= ${pipelineHoursPerTask().trainerHours}h</span></div>
  <div class="line"><span class="label">Reviewer hours / task</span><span class="formula">= ${P.expectedRevisionCycles} cycles × ${P.hoursToReview}h review</span><span class="result">= ${pipelineHoursPerTask().reviewerHours}h</span></div>

  <span class="section-head">Trainer capacity (weeks 3-4)</span>
  <div class="line"><span class="label">Trainer remaining hours</span><span class="formula">= ${TRAINERS.length} trainers × ${diag.weeksRemaining} weeks × ${P.trainerWeeklyHourCap}h</span><span class="result">= ${TRAINERS.length * diag.weeksRemaining * P.trainerWeeklyHourCap}h</span></div>
  <div class="line"><span class="label">Estimated trainer completions</span><span class="formula">= ${TRAINERS.length * diag.weeksRemaining * P.trainerWeeklyHourCap}h ÷ ${pipelineHoursPerTask().trainerHours}h</span><span class="result">= ${diag.trainerEstimatedCompletions}</span></div>

  <span class="section-head">Reviewer capacity (weeks 3-4)</span>
  <div class="line"><span class="label">Reviewer remaining hours</span><span class="formula">= ${REVIEWERS.length} reviewers × ${diag.weeksRemaining} weeks × ${P.reviewerWeeklyHourCap}h</span><span class="result">= ${REVIEWERS.length * diag.weeksRemaining * P.reviewerWeeklyHourCap}h</span></div>
  <div class="line"><span class="label">Raw review capacity</span><span class="formula">= ${REVIEWERS.length * diag.weeksRemaining * P.reviewerWeeklyHourCap}h ÷ ${P.hoursToReview}h per review</span><span class="result">= ${(REVIEWERS.length * diag.weeksRemaining * P.reviewerWeeklyHourCap / P.hoursToReview).toFixed(0)} reviews</span></div>
  <div class="line"><span class="label">Effective sign-offs (at current rate)</span><span class="formula">= ${(REVIEWERS.length * diag.weeksRemaining * P.reviewerWeeklyHourCap / P.hoursToReview).toFixed(0)} ÷ ${diag.avgReviewsPerSignOff} reviews/sign-off</span><span class="result">= ${diag.effectiveReviewerCapacity}</span></div>

  <span class="section-head">Projected total</span>
  <div class="line"><span class="label">Already signed off</span><span class="formula"></span><span class="result">${diag.currentSignedOff}</span></div>
  <div class="line"><span class="label">+ bottleneck capacity (min of trainer/reviewer)</span><span class="formula">= min(${diag.trainerEstimatedCompletions}, ${diag.effectiveReviewerCapacity})</span><span class="result">${diag.effectiveReviewerCapacity}</span></div>
  <div class="line"><span class="label">Projected total sign-offs</span><span class="formula">= ${diag.currentSignedOff} + ${diag.effectiveReviewerCapacity}</span><span class="result">${diag.projectedTotal}</span></div>
`;

// ─── Q2 Action plan ───────────────────────────────────────────────────────────
const uplifts = q2Uplifts();
document.getElementById('q2-content').innerHTML = `
  <p style="margin-bottom:1rem; color:var(--muted); font-size:.85rem;">
    Projected shortfall: <strong style="color:var(--red)">${uplifts.targetUplift} tasks</strong> below target.
    Three levers, prioritised by impact:
  </p>
  <div class="levers">
    <div class="lever">
      <h3>1. ${uplifts.lever1.name}</h3>
      <p>${uplifts.lever1.mechanism}</p>
      <div class="uplift">+${uplifts.lever1.estimatedUplift}</div>
      <div class="uplift-label">estimated additional sign-offs</div>
    </div>
    <div class="lever">
      <h3>2. ${uplifts.lever2.name}</h3>
      <p>${uplifts.lever2.mechanism}</p>
      <div class="uplift">+${uplifts.lever2.estimatedUplift}</div>
      <div class="uplift-label">estimated additional sign-offs</div>
    </div>
    <div class="lever">
      <h3>3. ${uplifts.lever3.name}</h3>
      <p>${uplifts.lever3.mechanism}</p>
      <div class="uplift">+${uplifts.lever3.estimatedUplift}</div>
      <div class="uplift-label">estimated additional sign-offs (conservative)</div>
    </div>
  </div>
`;

document.getElementById('q2-workings').innerHTML = `
  <span class="section-head">Lever 1 — Refocus reviewers</span>
  <div class="line"><span class="label">Target reviews/sign-off</span><span class="formula">reduce from ${diag.avgReviewsPerSignOff} → 5.5</span></div>
  <div class="line"><span class="label">Reviewer capacity (reviews)</span><span class="formula">= ${REVIEWERS.length} × ${P.weeksTotal - P.snapshotWeek} × ${P.reviewerWeeklyHourCap} ÷ ${P.hoursToReview}</span><span class="result">= ${(REVIEWERS.length * (P.weeksTotal - P.snapshotWeek) * P.reviewerWeeklyHourCap / P.hoursToReview).toFixed(0)}</span></div>
  <div class="line"><span class="label">Sign-offs at improved rate</span><span class="formula">= ${(REVIEWERS.length * (P.weeksTotal - P.snapshotWeek) * P.reviewerWeeklyHourCap / P.hoursToReview).toFixed(0)} ÷ 5.5</span><span class="result">= ${uplifts.lever1.estimatedUplift} uplift vs baseline</span></div>

  <span class="section-head">Lever 2 — Activate inactive trainers</span>
  <div class="line"><span class="label">Inactive trainer count</span><span class="formula">claimed > 0 AND completed = 0</span><span class="result">${diag.inactiveTrainerCount}</span></div>
  <div class="line"><span class="label">Hours available per trainer</span><span class="formula">= ${P.weeksTotal - P.snapshotWeek} weeks × ${P.trainerWeeklyHourCap}h</span><span class="result">= ${(P.weeksTotal - P.snapshotWeek) * P.trainerWeeklyHourCap}h</span></div>
  <div class="line"><span class="label">Tasks per trainer</span><span class="formula">= ${(P.weeksTotal - P.snapshotWeek) * P.trainerWeeklyHourCap}h ÷ ${pipelineHoursPerTask().trainerHours}h</span><span class="result">= ${((P.weeksTotal - P.snapshotWeek) * P.trainerWeeklyHourCap / pipelineHoursPerTask().trainerHours).toFixed(1)}</span></div>
  <div class="line"><span class="label">Total uplift</span><span class="formula">= ${diag.inactiveTrainerCount} × ${((P.weeksTotal - P.snapshotWeek) * P.trainerWeeklyHourCap / pipelineHoursPerTask().trainerHours).toFixed(1)}</span><span class="result">= ${uplifts.lever2.estimatedUplift}</span></div>
`;

// ─── Trainer table ────────────────────────────────────────────────────────────
const tm = trainerMetrics();

function renderTrainerTable(data) {
  document.getElementById('trainer-tbody').innerHTML = data.map(t => {
    const rowClass = t.isHighErrorRate ? 'row-high-error' : t.isUnderdelivering ? 'row-inactive' : '';
    const majors = t.majorsPerTask !== null ? t.majorsPerTask.toFixed(1) : '—';
    const status = t.isHighErrorRate
      ? '<span class="badge badge-red">High errors</span>'
      : t.isUnderdelivering
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

renderTrainerTable(tm);

document.getElementById('trainer-search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filter = document.getElementById('trainer-filter').value;
  applyTrainerFilters(q, filter);
});

document.getElementById('trainer-filter').addEventListener('change', e => {
  const q = document.getElementById('trainer-search').value.toLowerCase();
  applyTrainerFilters(q, e.target.value);
});

function applyTrainerFilters(search, filter) {
  let data = tm;
  if (filter === 'high-error') data = data.filter(t => t.isHighErrorRate);
  else if (filter === 'inactive') data = data.filter(t => t.isUnderdelivering);
  else if (filter === 'signed-off') data = data.filter(t => t.signedOff > 0);
  if (search) data = data.filter(t => t.id.toLowerCase().includes(search));
  renderTrainerTable(data);
}

// ─── Reviewer table ───────────────────────────────────────────────────────────
const rm = reviewerMetrics();
document.getElementById('reviewer-tbody').innerHTML = rm.map(r => {
  const majors = r.majorsPerReview !== null ? r.majorsPerReview.toFixed(2) : '—';
  const statusClass = r.status === 'OVER' ? 'badge-green' : 'badge-amber';
  const flagClass = r.isOverFlagging ? 'badge-red' : '';
  return `<tr class="${r.isOverFlagging ? 'row-high-error' : ''}">
    <td>${r.id}</td>
    <td>${r.reviewsCompleted}</td>
    <td>${r.minorIssues}</td>
    <td>${r.majorIssues}</td>
    <td class="${r.isOverFlagging ? 'val bad' : ''}" style="font-weight:${r.isOverFlagging ? 700 : 400}">${majors}</td>
    <td><span class="badge ${statusClass}">${r.status}</span>${r.isOverFlagging ? ' <span class="badge badge-red">Over-flagging</span>' : ''}</td>
  </tr>`;
}).join('');
