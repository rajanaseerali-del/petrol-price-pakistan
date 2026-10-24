import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs: FAQItem[];
}

export function FAQSection({
  title = 'Frequently Asked Questions (FAQs)',
  subtitle,
  description,
  faqs,
}: FAQSectionProps) {
  const displaySubtitle = description || subtitle || 'Everything you need to know about fuel pricing, OGRA notifications, and price revisions in Pakistan.';

  // Generate FAQ schema.org structured data for SEO rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-label="Frequently Asked Questions" className="my-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-lg transition-colors">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-black tracking-wide uppercase mb-3">
            <span>❓ Official Answers &amp; Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group py-6 transition-all cursor-pointer"
            >
              <summary className="flex justify-between items-center text-lg sm:text-xl font-black text-slate-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 select-none list-none pr-3">
                <span className="leading-snug">{faq.question}</span>
                <span className="ml-5 flex-shrink-0 w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-open:rotate-180 transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl pr-6 font-normal">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
