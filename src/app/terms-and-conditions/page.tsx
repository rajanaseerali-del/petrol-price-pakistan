import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Petrol Price Pakistan',
  description:
    'Terms and Conditions for using Petrol Price Pakistan. Review user responsibilities, intellectual property, disclaimers, and terms of service.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 w-full">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Last Updated: October 2026. Please read these terms carefully before using our platform.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using <strong className="text-slate-900 dark:text-white">Petrol Price Pakistan</strong> (the &quot;Website&quot;), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please refrain from using the Website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            2. Informational Purpose Only
          </h2>
          <p>
            All fuel rates, historical price archives, tax breakdowns, and calculation outputs provided on this Website are published for general informational and reference purposes only.
          </p>
          <p>
            While we strive to ensure that all information reflects official notifications issued by regulatory authorities (including the Oil and Gas Regulatory Authority — OGRA, the Ministry of Energy, and authorized Oil Marketing Companies), we do not guarantee that the content will be uninterrupted or error-free at every exact second.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            3. Use of Calculators and Tools
          </h2>
          <p>
            The fuel cost and journey calculators available on the Website are designed as self-service budgeting aids. Results are estimates based on standard fuel economy baselines and active pump rates. Actual consumption may vary based on vehicle condition, driving habits, road conditions, and local pump variances.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            4. Intellectual Property
          </h2>
          <p>
            The software, visual design, custom calculator algorithms, layout, and aggregated content on this Website are the property of Petrol Price Pakistan and are protected by applicable intellectual property laws. You may view, reference, and share our data for personal, non-commercial use provided proper attribution is maintained.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            5. Third-Party Links &amp; Advertisements
          </h2>
          <p>
            The Website may display advertisements, sponsored placements, or external links to third-party services. We do not endorse or assume responsibility for any third-party websites, products, or services. Accessing third-party links is done at your own risk.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, Petrol Price Pakistan and its operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, the information or tools provided on the Website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify or replace these Terms and Conditions at any time. Any revisions will become effective immediately upon posting on this page. Your continued use of the Website following any changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            8. Contact Information
          </h2>
          <p>
            If you have questions regarding these Terms and Conditions, please contact us via our{' '}
            <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
              Contact Us page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
