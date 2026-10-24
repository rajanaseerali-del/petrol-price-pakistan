'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PriceRecord } from '@/types/fuel';

interface PriceChartProps {
  records: PriceRecord[];
  productName?: string;
}

export function PriceChart({ records, productName = 'Fuel' }: PriceChartProps) {
  if (!records || records.length === 0) {
    return null;
  }

  // Sort chronological for chart display (oldest to newest)
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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            {productName} Rate Trend (PKR / Litre)
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Verified official revision curve from authorized government publications
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Official Notified Curve</span>
        </div>
      </div>

      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={13}
              fontWeight={700}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              stroke="#64748b"
              fontSize={13}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
              tickFormatter={val => `Rs. ${val}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-950 dark:bg-slate-800 text-white text-sm rounded-2xl shadow-xl p-4 border border-slate-800 dark:border-slate-700">
                      <p className="font-extrabold text-emerald-400">{data.date}</p>
                      <p className="text-lg font-black mt-1">Rs. {Number(data.price).toFixed(2)} / L</p>
                      <p className="text-xs text-slate-400 mt-0.5">{data.identifier}</p>
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
              strokeWidth={3.5}
              dot={{ r: 5, fill: '#059669', stroke: '#ffffff', strokeWidth: 2.5 }}
              activeDot={{ r: 8, fill: '#047857', stroke: '#ffffff', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
