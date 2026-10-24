import { FAQItem } from '@/components/FAQSection';

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'How often are petrol and diesel prices revised in Pakistan?',
    answer:
      'In Pakistan, petroleum products are officially revised on a fortnightly schedule by the Oil & Gas Regulatory Authority (OGRA) and the Ministry of Energy (Petroleum Division). Official notifications are announced on the 15th/16th and the last day of each month, taking legal effect at 12:00 AM midnight.',
  },
  {
    question: 'Why are petrol prices uniform across all cities in Pakistan?',
    answer:
      'Under the Inland Freight Equalization Margin (IFEM) mechanism regulated by OGRA, transport freight costs across depots and refineries are pooled. This equalizes consumer pump rates for Super Petrol and High-Speed Diesel so citizens in Karachi, Lahore, Islamabad, and Peshawar pay the exact same regulated ex-depot rate.',
  },
  {
    question: 'Is Hi-Octane (RON 97) regulated by the government?',
    answer:
      'No. Hi-Octane (RON 97) was deregulated by the federal government. Oil Marketing Companies (OMCs) like PSO and Shell determine and announce commercial retail rates independently based on import premiums and specific city locations.',
  },
  {
    question: 'How does our automated crawler verify fuel rates?',
    answer:
      'Our autonomous system queries authorized regulatory sources including the OGRA official notified prices portal, Ministry of Energy official releases, and PSO retail circulars every midnight at 12:00 AM and every 6 hours to immediately detect, verify, and reflect confirmed adjustments.',
  },
  {
    question: 'What taxes are currently included in Pakistan petrol prices?',
    answer:
      'Retail consumer prices include the base ex-refinery cost, Inland Freight Equalization Margin (IFEM), Oil Marketing Company (OMC) margin, dealers commission, and the Petroleum Development Levy (PDL). Sales tax on motor gasoline currently stands at 0%.',
  },
];

export function getPetrolPageFaqs(currentPrice?: number): FAQItem[] {
  const formattedPrice = currentPrice ? `Rs. ${currentPrice.toFixed(2)}` : 'Rs. 377.71';
  return [
    {
      question: 'What is the current official price of Petrol in Pakistan today?',
      answer: `The current notified rate for Petrol (Super / Motor Spirit 92 RON) is officially published at ${formattedPrice} per litre as notified under government circulars by OGRA and the Ministry of Energy.`,
    },
    {
      question: 'What vehicle types use Petrol in Pakistan?',
      answer:
        'Petrol powers the vast majority of personal passenger cars (Suzuki Alto, Cultus, Toyota Corolla, Honda Civic), motorbikes (Honda CD 70, CG 125), and light urban commercial transport across Pakistan.',
    },
    {
      question: 'How can I calculate my journey petrol cost?',
      answer:
        'Use our interactive Fuel & Trip Cost Calculator. Select your vehicle preset (e.g. Alto 660cc, Corolla GLi, or Honda CD 70), enter the distance in kilometres, and get instant calculations for required litres, cost per KM, and total rupees required.',
    },
  ];
}

export const PETROL_PAGE_FAQS: FAQItem[] = getPetrolPageFaqs(377.71);

export function getDieselPageFaqs(currentPrice?: number): FAQItem[] {
  const formattedPrice = currentPrice ? `Rs. ${currentPrice.toFixed(2)}` : 'Rs. 393.66';
  return [
    {
      question: 'What is the current official price of Diesel in Pakistan today?',
      answer: `The current notified rate for High-Speed Diesel is officially published at ${formattedPrice} per litre as notified under government circulars by OGRA and the Ministry of Energy.`,
    },
    {
      question: 'What is Diesel used for in Pakistan?',
      answer:
        'Diesel is the backbone of Pakistan’s transport economy, powering heavy freight trucks, intercity passenger buses, agricultural tractors, tube-wells, and diesel 4x4 vehicles such as Toyota Hilux Revo and Fortuner.',
    },
    {
      question: 'Why does a diesel price increase affect general inflation in Pakistan?',
      answer:
        'Because all commercial goods, agricultural produce, and raw materials are transported across the country using diesel freight trucks, any change in diesel directly impacts food prices and consumer inflation rates.',
    },
  ];
}

export const DIESEL_PAGE_FAQS: FAQItem[] = getDieselPageFaqs(393.66);

export const HISTORY_PAGE_FAQS: FAQItem[] = [
  {
    question: 'Where is the historical pricing data sourced from?',
    answer:
      'Every historical entry in our database is compiled from official gazette notifications and circulars issued by OGRA and the Finance Division spanning from January 2026 to the present.',
  },
  {
    question: 'Why did fuel prices fluctuate sharply during 2026?',
    answer:
      'In early 2026, severe Middle East regional shipping choke points and international crude shocks led to temporary price spikes, reaching historical highs in April 2026 before cooling down through government levy adjustments.',
  },
];

export const CALCULATOR_PAGE_FAQS: FAQItem[] = [
  {
    question: 'How accurate is the vehicle mileage estimate in the calculator?',
    answer:
      'Our calculator uses real-world reported averages from Pakistani motorists (accounting for city traffic, road conditions, and summer AC usage) rather than inflated manufacturer brochure claims.',
  },
  {
    question: 'Can I calculate two-way journey costs?',
    answer:
      'Yes! Simply check the "Return trip (double the distance)" option to automatically double the mileage and total fuel budget for round trips.',
  },
];

export const CITY_PAGE_FAQS: FAQItem[] = [
  {
    question: 'Why is petrol priced the same in Karachi, Lahore, and Islamabad?',
    answer:
      'Under OGRA’s Inland Freight Equalization Margin (IFEM), inter-city transport costs are averaged and pooled across Pakistan, meaning ex-depot consumer prices for regulated petrol and diesel remain identical across designated pumps nationwide.',
  },
  {
    question: 'Does any fuel price differ between cities in Pakistan?',
    answer:
      'Yes. Deregulated products such as Hi-Octane (RON 97) and CNG may carry regional variations set independently by oil marketing companies based on local depot transport logistics.',
  },
  {
    question: 'Are remote areas charged extra freight?',
    answer:
      'Retail petrol pumps within designated IFEM supply zones charge the uniform notified rates. In very remote mountainous areas located beyond designated storage depots, slight provincial cartage margins may apply as approved by local administration.',
  },
];
