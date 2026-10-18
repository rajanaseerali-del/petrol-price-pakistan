import { z } from 'zod';

export type ProductId = 'petrol' | 'diesel' | 'hi-octane' | 'kerosene' | 'ldo' | 'lpg';

export const FuelProductSchema = z.object({
  id: z.enum(['petrol', 'diesel', 'hi-octane', 'kerosene', 'ldo', 'lpg']),
  displayName: z.string(),
  displayNameUr: z.string().optional(),
  slug: z.string(),
  unit: z.string().default('Litre'),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export type FuelProduct = z.infer<typeof FuelProductSchema>;

export const SourceTypeSchema = z.enum([
  'OGRA_NOTIFIED',
  'PETROLEUM_DIVISION_ANNOUNCEMENT',
  'PSO_OFFICIAL',
  'MANUAL_VERIFIED',
]);
export type SourceType = z.infer<typeof SourceTypeSchema>;

export const ExtractionMethodSchema = z.enum([
  'PORTAL_AUTOMATED',
  'PRESS_RELEASE_AUTOMATED',
  'ADMIN_MANUAL_ENTRY',
]);
export type ExtractionMethod = z.infer<typeof ExtractionMethodSchema>;

export const VerificationStatusSchema = z.enum([
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'CONFLICT_FLAGGED',
]);
export type VerificationStatus = z.infer<typeof VerificationStatusSchema>;

export const PriceRecordSchema = z.object({
  id: z.string(),
  productId: z.enum(['petrol', 'diesel', 'hi-octane', 'kerosene', 'ldo', 'lpg']),
  pricePaisa: z.number().int().positive(), // e.g. 39023 for 390.23 PKR
  pricePkr: z.number().positive(),
  currency: z.literal('PKR').default('PKR'),
  effectiveStart: z.string(), // ISO string
  effectiveEnd: z.string().nullable().optional(),
  sourcePublicationDate: z.string(), // ISO string
  verificationTimestamp: z.string(), // ISO string
  sourceUrl: z.string().url(),
  sourceType: SourceTypeSchema,
  extractionMethod: ExtractionMethodSchema,
  verificationStatus: VerificationStatusSchema,
  notificationIdentifier: z.string().optional(),
  previousPricePaisa: z.number().int().nullable().optional(),
  priceChangePaisa: z.number().int().nullable().optional(),
  notes: z.string().optional(),
});

export type PriceRecord = z.infer<typeof PriceRecordSchema>;

export interface SourceCheckResult {
  sourceIdentifier: 'OGRA' | 'PETROLEUM_DIVISION' | 'PSO';
  timestamp: string;
  isSuccess: boolean;
  httpStatus?: number;
  responseTimeMs?: number;
  recordsDiscovered: number;
  recordsIngested: number;
  errorDetails?: string;
  discoveredRecords?: PriceRecord[];
  metadata?: Record<string, unknown>;
}

export interface AdminAuditEntry {
  id: string;
  adminUserId: string;
  adminEmail?: string;
  action: 'CREATE_PRICE' | 'EDIT_PRICE' | 'APPROVE_RECORD' | 'REJECT_RECORD' | 'TRIGGER_SOURCE_CHECK';
  targetRecordId?: string;
  targetTable: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  timestamp: string;
}

export interface VerificationPipelineResult {
  accepted: boolean;
  requiresReview: boolean;
  conflictReason?: string;
  record?: PriceRecord;
}
