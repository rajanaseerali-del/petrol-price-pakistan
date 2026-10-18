import { PriceRecord, FuelProduct, VerificationPipelineResult } from '@/types/fuel';

/**
 * Verification Pipeline Engine for Pakistan Petroleum Rates
 * Ensures mathematical precision using integer paisas (1 PKR = 100 Paisa),
 * enforces strict date causality (new rate must be effective on or after current active rate),
 * and prevents silent overwrites or fictitious price updates.
 */

export class VerificationEngine {
  /**
   * Calculates price difference and percentage change using exact integer paisa arithmetic.
   */
  static calculateChange(currentPricePaisa: number, previousPricePaisa?: number | null) {
    if (!previousPricePaisa || previousPricePaisa <= 0) {
      return { changePaisa: 0, changePkr: 0, percentage: 0, direction: 'UNCHANGED' as const };
    }
    const changePaisa = currentPricePaisa - previousPricePaisa;
    const changePkr = changePaisa / 100;
    const percentage = Number(((changePaisa / previousPricePaisa) * 100).toFixed(2));
    const direction = changePaisa > 0 ? ('INCREASE' as const) : changePaisa < 0 ? ('DECREASE' as const) : ('UNCHANGED' as const);

    return { changePaisa, changePkr, percentage, direction };
  }

  /**
   * Verifies an incoming candidate price record against an existing active record.
   * Rejects malformed records, out-of-bounds prices, or backdated revisions.
   */
  static verifyCandidate(
    candidate: Omit<PriceRecord, 'id' | 'pricePkr'> & { id?: string },
    currentActive?: PriceRecord | null,
    secondaryCandidate?: PriceRecord | null
  ): VerificationPipelineResult {
    // 1. Structural and plausibility validation
    // Prices in Pakistan are strictly bounded (e.g. 50 PKR to 1,000 PKR / 5,000 to 100,000 Paisa)
    if (!candidate.pricePaisa || candidate.pricePaisa < 5000 || candidate.pricePaisa > 100000) {
      return {
        accepted: false,
        requiresReview: true,
        conflictReason: `Price value ${candidate.pricePaisa} paisa (Rs. ${candidate.pricePaisa / 100}) is outside plausible government bounds (50 - 1000 PKR).`,
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

    // 2. Chronological sequence check
    if (currentActive) {
      const activeEffectiveDate = new Date(currentActive.effectiveStart).getTime();
      
      // If incoming record has an earlier effective date than active record, it must NOT overwrite current active rate
      if (candidateEffectiveDate < activeEffectiveDate) {
        return {
          accepted: false,
          requiresReview: true,
          conflictReason: `Candidate effective date (${candidate.effectiveStart}) is older than current active record (${currentActive.effectiveStart}). Historical insertion requires manual admin review.`,
        };
      }

      // If duplicate notification for the exact same effective date
      if (candidateEffectiveDate === activeEffectiveDate) {
        if (candidate.pricePaisa === currentActive.pricePaisa) {
          return {
            accepted: true,
            requiresReview: false,
            record: {
              ...currentActive,
              verificationTimestamp: new Date().toISOString(), // refresh verified heartbeat
            },
          };
        } else {
          // Same effective date but conflicting price!
          return {
            accepted: false,
            requiresReview: true,
            conflictReason: `Conflict: New price ${candidate.pricePaisa / 100} PKR differs from existing record ${currentActive.pricePkr} PKR for the same effective date. Overwrite prevented.`,
          };
        }
      }
    }

    // 3. Secondary source cross-verification (if available)
    if (secondaryCandidate) {
      if (secondaryCandidate.pricePaisa !== candidate.pricePaisa) {
        return {
          accepted: false,
          requiresReview: true,
          conflictReason: `Source Disagreement: Primary source reports ${candidate.pricePaisa / 100} PKR but Secondary source reports ${secondaryCandidate.pricePaisa / 100} PKR. Flagged for admin verification.`,
        };
      }
    }

    // 4. Calculate change relative to current active record
    const change = this.calculateChange(
      candidate.pricePaisa,
      currentActive ? currentActive.pricePaisa : candidate.previousPricePaisa
    );

    const verifiedRecord: PriceRecord = {
      id: candidate.id || crypto.randomUUID(),
      productId: candidate.productId,
      pricePaisa: candidate.pricePaisa,
      pricePkr: candidate.pricePaisa / 100,
      currency: 'PKR',
      effectiveStart: candidate.effectiveStart,
      effectiveEnd: candidate.effectiveEnd,
      sourcePublicationDate: candidate.sourcePublicationDate,
      verificationTimestamp: new Date().toISOString(),
      sourceUrl: candidate.sourceUrl,
      sourceType: candidate.sourceType,
      extractionMethod: candidate.extractionMethod,
      verificationStatus: 'APPROVED',
      notificationIdentifier: candidate.notificationIdentifier,
      previousPricePaisa: currentActive ? currentActive.pricePaisa : candidate.previousPricePaisa ?? null,
      priceChangePaisa: change.changePaisa,
      notes: candidate.notes,
    };

    return {
      accepted: true,
      requiresReview: false,
      record: verifiedRecord,
    };
  }

  /**
   * Determine data freshness based on configured threshold in hours (default 72 hours).
   */
  static checkFreshness(verificationTimestamp: string, thresholdHours: number = 72) {
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
