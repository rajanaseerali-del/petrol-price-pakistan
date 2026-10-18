import { SourceCheckResult, PriceRecord } from '@/types/fuel';

export interface SourceAdapter {
  sourceIdentifier: 'OGRA' | 'PETROLEUM_DIVISION' | 'PSO';
  sourceName: string;
  officialUrl: string;
  checkAndExtract(): Promise<SourceCheckResult>;
}

/**
 * OGRA Source Adapter
 * Queries the official OGRA Notified Petroleum Prices Portal.
 * Extracts official publication metadata, dates, and document download links.
 * Note: OGRA provides notifications as scanned Konica Minolta PDF documents.
 * Portal extraction parses the notification metadata from the portal listing.
 */
export class OgraSourceAdapter implements SourceAdapter {
  sourceIdentifier = 'OGRA' as const;
  sourceName = 'Oil & Gas Regulatory Authority (OGRA)';
  officialUrl = 'https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified';

  async checkAndExtract(): Promise<SourceCheckResult> {
    const startTime = Date.now();
    try {
      const response = await fetch(this.officialUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        next: { revalidate: 0 },
      });

      const responseTimeMs = Date.now() - startTime;

      if (!response.ok) {
        return {
          sourceIdentifier: this.sourceIdentifier,
          timestamp: new Date().toISOString(),
          isSuccess: false,
          httpStatus: response.status,
          responseTimeMs,
          recordsDiscovered: 0,
          recordsIngested: 0,
          errorDetails: `OGRA portal responded with HTTP ${response.status}`,
        };
      }

      const html = await response.text();

      // Extract publication titles like: "Notified Petroleum Prices Effective Dated October 10, 2026"
      const publicationMatches = [...html.matchAll(/<span class="current-site-publication-title">([^<]+)<\/span>/gi)];
      const fileLinkMatches = [...html.matchAll(/<a href="(\/document\/\d+\/file\?lang=\w+)"[^>]*>([A-Z]+)<\/a>/gi)];

      const discoveredPublications = publicationMatches.map((m, idx) => ({
        title: m[1].trim(),
        fileUrl: fileLinkMatches[idx] ? `https://price.ogra.org.pk${fileLinkMatches[idx][1]}` : null,
      }));

      return {
        sourceIdentifier: this.sourceIdentifier,
        timestamp: new Date().toISOString(),
        isSuccess: true,
        httpStatus: response.status,
        responseTimeMs,
        recordsDiscovered: discoveredPublications.length,
        recordsIngested: 0, // Automated OCR not executed blindly without verified extraction
        metadata: {
          discoveredPublications,
          note: 'OGRA publishes scanned image notifications. Metadata extracted; values require verified pipeline.',
        },
      };
    } catch (error: unknown) {
      return {
        sourceIdentifier: this.sourceIdentifier,
        timestamp: new Date().toISOString(),
        isSuccess: false,
        responseTimeMs: Date.now() - startTime,
        recordsDiscovered: 0,
        recordsIngested: 0,
        errorDetails: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

/**
 * Petroleum Division Source Adapter
 * Monitors the Ministry of Energy (Petroleum Division) official press releases.
 */
export class PetroleumDivisionSourceAdapter implements SourceAdapter {
  sourceIdentifier = 'PETROLEUM_DIVISION' as const;
  sourceName = 'Ministry of Energy (Petroleum Division)';
  officialUrl = 'https://www.petroleum.gov.pk/LatestNews';

  async checkAndExtract(): Promise<SourceCheckResult> {
    const startTime = Date.now();
    try {
      const response = await fetch(this.officialUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        },
        next: { revalidate: 0 },
      });

      const responseTimeMs = Date.now() - startTime;

      if (!response.ok) {
        return {
          sourceIdentifier: this.sourceIdentifier,
          timestamp: new Date().toISOString(),
          isSuccess: false,
          httpStatus: response.status,
          responseTimeMs,
          recordsDiscovered: 0,
          recordsIngested: 0,
          errorDetails: `Petroleum Division responded with HTTP ${response.status}`,
        };
      }

      const html = await response.text();

      // Look for cards with "Prices of Petroleum Products on..."
      const newsMatches = [...html.matchAll(/<h4>(Prices of Petroleum Products[^<]+)<\/h4>[\s\S]*?<a href="(\/NewsDetail\/[^"]+)"/gi)];

      const discoveredAnnouncements = newsMatches.map(m => ({
        headline: m[1].trim(),
        detailUrl: `https://www.petroleum.gov.pk${m[2]}`,
      }));

      return {
        sourceIdentifier: this.sourceIdentifier,
        timestamp: new Date().toISOString(),
        isSuccess: true,
        httpStatus: response.status,
        responseTimeMs,
        recordsDiscovered: discoveredAnnouncements.length,
        recordsIngested: 0,
        metadata: {
          discoveredAnnouncements,
        },
      };
    } catch (error: unknown) {
      return {
        sourceIdentifier: this.sourceIdentifier,
        timestamp: new Date().toISOString(),
        isSuccess: false,
        responseTimeMs: Date.now() - startTime,
        recordsDiscovered: 0,
        recordsIngested: 0,
        errorDetails: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

/**
 * PSO Source Adapter
 * Checks Pakistan State Oil published consumer rates.
 */
export class PsoSourceAdapter implements SourceAdapter {
  sourceIdentifier = 'PSO' as const;
  sourceName = 'Pakistan State Oil (PSO)';
  officialUrl = 'https://psopk.com/en/fuels/fuel-prices';

  async checkAndExtract(): Promise<SourceCheckResult> {
    const startTime = Date.now();
    try {
      const response = await fetch(this.officialUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        next: { revalidate: 0 },
      });

      const responseTimeMs = Date.now() - startTime;

      return {
        sourceIdentifier: this.sourceIdentifier,
        timestamp: new Date().toISOString(),
        isSuccess: response.ok,
        httpStatus: response.status,
        responseTimeMs,
        recordsDiscovered: response.ok ? 1 : 0,
        recordsIngested: 0,
      };
    } catch (error: unknown) {
      return {
        sourceIdentifier: this.sourceIdentifier,
        timestamp: new Date().toISOString(),
        isSuccess: false,
        responseTimeMs: Date.now() - startTime,
        recordsDiscovered: 0,
        recordsIngested: 0,
        errorDetails: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
