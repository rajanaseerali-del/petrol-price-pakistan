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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h4 className="text-base font-bold text-slate-900 tracking-tight">
            {productName} Rate Trend (PKR / Litre)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified official revision curve from authorized publications
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Verified Government Revisions</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={val => `Rs. ${val}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs rounded-xl shadow-lg p-3 border border-slate-800">
                      <p className="font-bold text-emerald-400">{data.date}</p>
                      <p className="text-sm font-black mt-1">Rs. {Number(data.price).toFixed(2)} / L</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{data.identifier}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#047857"
              strokeWidth={3}
              dot={{ r: 4, fill: '#047857', stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#065f46', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
