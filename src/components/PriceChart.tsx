'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PriceRecord } from '@/types/fuel';

interface PriceChartProps {
  records: PriceRecord[];
  productName: string;
}

export function PriceChart({ records, productName }: PriceChartProps) {
  if (!records || records.length === 0) {
    return null;
  }

  // Format records chronologically for chart display
  const chartData = [...records]
    .sort((a, b) => new Date(a.effectiveStart).getTime() - new Date(b.effectiveStart).getTime())
    .map(r => {
      const d = new Date(r.effectiveStart);
      const label = `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })}`;
      return {
        date: label,
        price: r.pricePkr,
        identifier: r.notificationIdentifier || 'Notification',
      };
    });

  const minPrice = Math.floor(Math.min(...chartData.map(d => d.price)) - 5);
  const maxPrice = Math.ceil(Math.max(...chartData.map(d => d.price)) + 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm sm:shadow-lg p-4 sm:p-7 md:p-9 transition-colors w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-slate-100 dark:border-slate-800 gap-2.5 sm:gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {productName} Rate Trend (PKR / Litre)
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 mt-0.5 sm:mt-1 font-medium">
            Verified official revision curve from authorized government publications
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Official Notified Curve</span>
        </div>
      </div>

      <div className="h-60 sm:h-72 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              fontWeight={700}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              stroke="#64748b"
              fontSize={12}
              fontWeight={700}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={value => `Rs.${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-950 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs sm:text-sm">
                      <span className="font-extrabold text-emerald-400 block">{data.date}</span>
                      <span className="font-black text-base sm:text-lg block mt-0.5">Rs. {Number(data.price).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 font-bold block">{data.identifier}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
