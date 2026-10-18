import { describe, it } from 'node:test';
import assert from 'node:assert';
import { VerificationEngine } from '../src/lib/verification-engine';
import { PriceRecord } from '../src/types/fuel';

describe('Verification Engine Unit Tests', () => {
  const activeRecord: PriceRecord = {
    id: 'rec-petrol-active',
    productId: 'petrol',
    pricePaisa: 38630,
    pricePkr: 386.30,
    currency: 'PKR',
    effectiveStart: '2026-10-17T00:00:00+05:00',
    effectiveEnd: null,
    sourcePublicationDate: '2026-10-16T22:30:00+05:00',
    verificationTimestamp: '2026-10-18T18:00:00Z',
    sourceUrl: 'https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified',
    sourceType: 'OGRA_NOTIFIED',
    extractionMethod: 'PRESS_RELEASE_AUTOMATED',
    verificationStatus: 'APPROVED',
    notificationIdentifier: 'OGRA-OCT-17-2026',
    previousPricePaisa: 39023,
    priceChangePaisa: -393,
  };

  it('calculates price decreases accurately with integer paisa precision', () => {
    const result = VerificationEngine.calculateChange(38630, 39023);
    assert.strictEqual(result.changePaisa, -393);
    assert.strictEqual(result.changePkr, -3.93);
    assert.strictEqual(result.direction, 'DECREASE');
  });

  it('calculates price increases accurately with integer paisa precision', () => {
    const result = VerificationEngine.calculateChange(39696, 39624);
    assert.strictEqual(result.changePaisa, 72);
    assert.strictEqual(result.changePkr, 0.72);
    assert.strictEqual(result.direction, 'INCREASE');
  });

  it('rejects candidate prices with implausible values', () => {
    const malformed = {
      productId: 'petrol' as const,
      pricePaisa: 450, // 4.50 PKR
      currency: 'PKR' as const,
      effectiveStart: '2026-11-01T00:00:00+05:00',
      sourcePublicationDate: '2026-10-31T23:00:00+05:00',
      verificationTimestamp: new Date().toISOString(),
      sourceUrl: 'https://price.ogra.org.pk',
      sourceType: 'OGRA_NOTIFIED' as const,
      extractionMethod: 'PORTAL_AUTOMATED' as const,
      verificationStatus: 'APPROVED' as const,
    };

    const verification = VerificationEngine.verifyCandidate(malformed, activeRecord);
    assert.strictEqual(verification.accepted, false);
    assert.strictEqual(verification.requiresReview, true);
    assert.match(verification.conflictReason || '', /outside plausible government bounds/);
  });

  it('prevents older notifications from silently overwriting newer active rates', () => {
    const backdated = {
      productId: 'petrol' as const,
      pricePaisa: 39896,
      currency: 'PKR' as const,
      effectiveStart: '2026-10-01T00:00:00+05:00',
      sourcePublicationDate: '2026-09-30T22:00:00+05:00',
      verificationTimestamp: new Date().toISOString(),
      sourceUrl: 'https://price.ogra.org.pk',
      sourceType: 'OGRA_NOTIFIED' as const,
      extractionMethod: 'PORTAL_AUTOMATED' as const,
      verificationStatus: 'APPROVED' as const,
    };

    const verification = VerificationEngine.verifyCandidate(backdated, activeRecord);
    assert.strictEqual(verification.accepted, false);
    assert.strictEqual(verification.requiresReview, true);
    assert.match(verification.conflictReason || '', /older than current active record/);
  });

  it('flags conflict if primary and secondary sources report different prices', () => {
    const primaryCandidate = {
      productId: 'petrol' as const,
      pricePaisa: 39500,
      currency: 'PKR' as const,
      effectiveStart: '2026-11-01T00:00:00+05:00',
      sourcePublicationDate: '2026-10-31T22:00:00+05:00',
      verificationTimestamp: new Date().toISOString(),
      sourceUrl: 'https://price.ogra.org.pk',
      sourceType: 'OGRA_NOTIFIED' as const,
      extractionMethod: 'PORTAL_AUTOMATED' as const,
      verificationStatus: 'APPROVED' as const,
    };

    const secondaryCandidate: PriceRecord = {
      ...activeRecord,
      pricePaisa: 39200,
      effectiveStart: '2026-11-01T00:00:00+05:00',
    };

    const verification = VerificationEngine.verifyCandidate(
      primaryCandidate,
      activeRecord,
      secondaryCandidate
    );
    assert.strictEqual(verification.accepted, false);
    assert.strictEqual(verification.requiresReview, true);
    assert.match(verification.conflictReason || '', /Source Disagreement/);
  });

  it('warns when verification timestamp exceeds freshness threshold', () => {
    const oldTimestamp = new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString();
    const freshness = VerificationEngine.checkFreshness(oldTimestamp, 72);

    assert.strictEqual(freshness.isFresh, false);
    assert.match(freshness.warning || '', /older than 72 hours/);
  });
});
