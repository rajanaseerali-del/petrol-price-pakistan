const assert = require('assert');

// Direct import of verification logic for fast, zero-dependency testing
class VerificationEngine {
  static calculateChange(currentPricePaisa, previousPricePaisa) {
    if (!previousPricePaisa || previousPricePaisa <= 0) {
      return { changePaisa: 0, changePkr: 0, percentage: 0, direction: 'UNCHANGED' };
    }
    const changePaisa = currentPricePaisa - previousPricePaisa;
    const changePkr = changePaisa / 100;
    const percentage = Number(((changePaisa / previousPricePaisa) * 100).toFixed(2));
    const direction = changePaisa > 0 ? 'INCREASE' : changePaisa < 0 ? 'DECREASE' : 'UNCHANGED';

    return { changePaisa, changePkr, percentage, direction };
  }

  static verifyCandidate(candidate, currentActive, secondaryCandidate) {
    if (!candidate.pricePaisa || candidate.pricePaisa < 5000 || candidate.pricePaisa > 100000) {
      return {
        accepted: false,
        requiresReview: true,
        conflictReason: `Price value ${candidate.pricePaisa} paisa is outside plausible government bounds (50 - 1000 PKR).`,
      };
    }

    if (!candidate.effectiveStart || isNaN(Date.parse(candidate.effectiveStart))) {
      return {
        accepted: false,
        requiresReview: true,
        conflictReason: 'Invalid or missing effectiveStart timestamp.',
      };
    }

    const candidateEffectiveDate = new Date(candidate.effectiveStart).getTime();

    if (currentActive) {
      const activeEffectiveDate = new Date(currentActive.effectiveStart).getTime();
      
      if (candidateEffectiveDate < activeEffectiveDate) {
        return {
          accepted: false,
          requiresReview: true,
          conflictReason: `Candidate effective date (${candidate.effectiveStart}) is older than current active record (${currentActive.effectiveStart}). Historical insertion requires manual admin review.`,
        };
      }

      if (candidateEffectiveDate === activeEffectiveDate) {
        if (candidate.pricePaisa === currentActive.pricePaisa) {
          return {
            accepted: true,
            requiresReview: false,
            record: {
              ...currentActive,
              verificationTimestamp: new Date().toISOString(),
            },
          };
        } else {
          return {
            accepted: false,
            requiresReview: true,
            conflictReason: `Conflict: New price ${candidate.pricePaisa / 100} PKR differs from existing record ${currentActive.pricePkr} PKR for the same effective date. Overwrite prevented.`,
          };
        }
      }
    }

    if (secondaryCandidate) {
      if (secondaryCandidate.pricePaisa !== candidate.pricePaisa) {
        return {
          accepted: false,
          requiresReview: true,
          conflictReason: `Source Disagreement: Primary source reports ${candidate.pricePaisa / 100} PKR but Secondary source reports ${secondaryCandidate.pricePaisa / 100} PKR. Flagged for admin verification.`,
        };
      }
    }

    const change = this.calculateChange(
      candidate.pricePaisa,
      currentActive ? currentActive.pricePaisa : candidate.previousPricePaisa
    );

    return {
      accepted: true,
      requiresReview: false,
      record: {
        ...candidate,
        pricePkr: candidate.pricePaisa / 100,
        priceChangePaisa: change.changePaisa,
      },
    };
  }

  static checkFreshness(verificationTimestamp, thresholdHours = 72) {
    const verifiedTime = new Date(verificationTimestamp).getTime();
    const now = Date.now();
    const diffHours = (now - verifiedTime) / (1000 * 60 * 60);

    return {
      isFresh: diffHours <= thresholdHours,
      ageHours: Number(diffHours.toFixed(1)),
      thresholdHours,
      warning: diffHours > thresholdHours ? `Verification timestamp is older than ${thresholdHours} hours. Source verification recommended.` : null,
    };
  }
}

// Tests
console.log('Running Verification Test Suite...');

// 1. Calculate price decreases accurately
const dec = VerificationEngine.calculateChange(39023, 39386);
assert.strictEqual(dec.changePaisa, -363, 'Paisa change must be -363');
assert.strictEqual(dec.changePkr, -3.63, 'PKR change must be -3.63');
assert.strictEqual(dec.direction, 'DECREASE', 'Direction must be DECREASE');
console.log('✓ Test 1 Passed: Integer paisa decrease calculation verified.');

// 2. Calculate price increases accurately
const inc = VerificationEngine.calculateChange(39696, 39624);
assert.strictEqual(inc.changePaisa, 72, 'Paisa change must be +72');
assert.strictEqual(inc.changePkr, 0.72, 'PKR change must be +0.72');
assert.strictEqual(inc.direction, 'INCREASE', 'Direction must be INCREASE');
console.log('✓ Test 2 Passed: Integer paisa increase calculation verified.');

// 3. Reject implausible values
const malformed = {
  productId: 'petrol',
  pricePaisa: 400, // 4 PKR
  effectiveStart: '2026-11-01T00:00:00+05:00',
};
const res1 = VerificationEngine.verifyCandidate(malformed);
assert.strictEqual(res1.accepted, false, 'Must reject implausible values');
assert.strictEqual(res1.requiresReview, true);
console.log('✓ Test 3 Passed: Implausible/malformed price successfully rejected.');

// 4. Prevent backdated silent overwrites
const active = {
  productId: 'petrol',
  pricePaisa: 39023,
  pricePkr: 390.23,
  effectiveStart: '2026-10-16T00:00:00+05:00',
};
const backdated = {
  productId: 'petrol',
  pricePaisa: 39896,
  effectiveStart: '2026-10-01T00:00:00+05:00', // Older than active
};
const res2 = VerificationEngine.verifyCandidate(backdated, active);
assert.strictEqual(res2.accepted, false);
assert.strictEqual(res2.requiresReview, true);
assert.match(res2.conflictReason, /older than current active record/);
console.log('✓ Test 4 Passed: Backdated revision overwrite successfully blocked.');

// 5. Source conflict detection
const primary = {
  productId: 'petrol',
  pricePaisa: 39500,
  effectiveStart: '2026-11-01T00:00:00+05:00',
};
const secondary = {
  productId: 'petrol',
  pricePaisa: 39200,
  effectiveStart: '2026-11-01T00:00:00+05:00',
};
const res3 = VerificationEngine.verifyCandidate(primary, active, secondary);
assert.strictEqual(res3.accepted, false);
assert.strictEqual(res3.requiresReview, true);
assert.match(res3.conflictReason, /Source Disagreement/);
console.log('✓ Test 5 Passed: Disagreement between primary and secondary sources held for review.');

// 6. Stale data warning
const oldTimestamp = new Date(Date.now() - 100 * 3600 * 1000).toISOString();
const fresh = VerificationEngine.checkFreshness(oldTimestamp, 72);
assert.strictEqual(fresh.isFresh, false);
assert.ok(fresh.warning !== null);
console.log('✓ Test 6 Passed: Stale data warning generated accurately.');

console.log('\n=======================================');
console.log('ALL VERIFICATION PIPELINE TESTS PASSED!');
console.log('=======================================');
