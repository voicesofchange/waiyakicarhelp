import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Loader2, TrendingUp, Star, MapPin, Clock, Zap } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Legend
} from "recharts";
import { format, differenceInMinutes, subDays, startOfDay } from "date-fns";

export default function MechanicInsights() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Job.filter({ status: "completed" }, "-completed_at", 200).then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F]">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
    </div>
  );

  // --- Response Time Data (last 14 days) ---
  const responseTimes = jobs
    .filter(j => j.accepted_at && j.created_date)
    .map(j => ({
      date: format(new Date(j.created_date), "dd MMM"),
      minutes: differenceInMinutes(new Date(j.accepted_at), new Date(j.created_date)),
    }))
    .filter(j => j.minutes >= 0 && j.minutes < 120);

  // Group by date for chart
  const rtByDay = {};
  responseTimes.forEach(({ date, minutes }) => {
    if (!rtByDay[date]) rtByDay[date] = { total: 0, count: 0 };
    rtByDay[date].total += minutes;
    rtByDay[date].count += 1;
  });
  const responseChartData = Object.entries(rtByDay)
    .map(([date, { total, count }]) => ({ date, avg: Math.round(total / count) }))
    .slice(-10);

  const avgResponse = responseTimes.length > 0
    ? Math.round(responseTimes.reduce((s, j) => s + j.minutes, 0) / responseTimes.length)
    : null;

  // --- Rating Trend (last 30 days) ---
  const ratedJobs = jobs.filter(j => j.rating_stars && j.created_date);
  const ratingByDay = {};
  ratedJobs.forEach(j => {
    const date = format(new Date(j.created_date), "dd MMM");
    if (!ratingByDay[date]) ratingByDay[date] = { total: 0, count: 0 };
    ratingByDay[date].total += j.rating_stars;
    ratingByDay[date].count += 1;
  });
  const ratingChartData = Object.entries(ratingByDay)
    .map(([date, { total, count }]) => ({ date, avg: parseFloat((total / count).toFixed(1)) }))
    .slice(-10);

  const overallRating = ratedJobs.length > 0
    ? (ratedJobs.reduce((s, j) => s + j.rating_stars, 0) / ratedJobs.length).toFixed(1)
    : null;

  // --- Hotspot Areas ---
  const areaCounts = {};
  jobs.forEach(j => {
    if (!j.location_description) return;
    // Extract first meaningful keyword from location
    const area = j.location_description.split(/[,\n]/)[0].trim() || "Unknown";
    areaCounts[area] = (areaCounts[area] || 0) + 1;
  });
  const hotspots = Object.entries(areaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([area, count]) => ({ area, count }));

  const maxCount = hotspots[0]?.count || 1;

  // --- Service Type Breakdown ---
  const serviceCounts = {};
  jobs.forEach(j => {
    if (!j.service_type_name) return;
    serviceCounts[j.service_type_name] = (serviceCounts[j.service_type_name] || 0) + 1;
  });
  const serviceData = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name: name.length > 20 ? name.slice(0, 18) + "…" : name, count }));

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex items-center gap-3">
        <Link to="/mechanic" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-gray-300" />
        </Link>
        <div>
          <p className="text-white font-black text-lg">Performance Insights</p>
          <p className="text-gray-400 text-xs">Based on {jobs.length} completed jobs</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="px-5 pb-5 grid grid-cols-3 gap-3">
        <div className="bg-amber-500 rounded-2xl p-4 text-center">
          <Zap className="w-5 h-5 text-black mx-auto mb-1" />
          <p className="text-black font-black text-xl">{avgResponse != null ? `${avgResponse}m` : "—"}</p>
          <p className="text-black/70 text-xs font-medium">Avg Response</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-white font-black text-xl">{overallRating || "—"}</p>
          <p className="text-gray-400 text-xs">Avg Rating</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <p className="text-white font-black text-xl">{jobs.length}</p>
          <p className="text-gray-400 text-xs">Jobs Done</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl px-5 pt-6 pb-16 min-h-[65vh] space-y-8">

        {/* Response Time Chart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-amber-500" />
            <p className="font-black text-gray-900">Response Time Trend</p>
          </div>
          {responseChartData.length > 0 ? (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 mb-3">Average minutes from job request to acceptance</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={responseChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="m" />
                  <Tooltip formatter={v => [`${v} min`, "Avg Response"]} />
                  <Line type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b" }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-gray-400">Target: &lt; 20 min</span>
                <span className={`font-bold ${avgResponse != null && avgResponse <= 20 ? "text-green-600" : "text-amber-600"}`}>
                  {avgResponse != null ? (avgResponse <= 20 ? "✓ On Target" : `${avgResponse - 20}m over target`) : "—"}
                </span>
              </div>
            </div>
          ) : (
            <EmptyState icon={<Clock className="w-8 h-8 text-gray-200" />} text="No response time data yet." />
          )}
        </div>

        {/* Rating Trend Chart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500" />
            <p className="font-black text-gray-900">Customer Rating Trend</p>
          </div>
          {ratingChartData.length > 0 ? (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 mb-3">Daily average customer rating (out of 5)</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={ratingChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={[1, 5]} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={v => [`${v} ⭐`, "Rating"]} />
                  <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
              {/* Star distribution */}
              <div className="mt-4 space-y-1.5">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = ratedJobs.filter(j => j.rating_stars === star).length;
                  const pct = ratedJobs.length > 0 ? Math.round((count / ratedJobs.length) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 w-8">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-gray-400 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState icon={<Star className="w-8 h-8 text-gray-200" />} text="No ratings received yet." />
          )}
        </div>

        {/* Hotspot Areas */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-amber-500" />
            <p className="font-black text-gray-900">Job Hotspot Areas</p>
          </div>
          {hotspots.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-gray-400">Locations where you receive the most job requests</p>
              {hotspots.map(({ area, count }, i) => (
                <div key={area} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${i === 0 ? "bg-amber-500 text-black" : "bg-gray-100 text-gray-500"}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800 truncate">{area}</span>
                      <span className="text-xs text-gray-400 ml-2 shrink-0">{count} job{count !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${i === 0 ? "bg-amber-500" : "bg-gray-300"}`}
                        style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-2">
                <p className="text-amber-800 font-bold text-sm mb-1">💡 Tip</p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Position yourself near <strong>{hotspots[0]?.area}</strong> during peak hours to maximise your job acceptance rate.
                </p>
              </div>
            </div>
          ) : (
            <EmptyState icon={<MapPin className="w-8 h-8 text-gray-200" />} text="No location data yet." />
          )}
        </div>

        {/* Service Type Breakdown */}
        {serviceData.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <p className="font-black text-gray-900">Most Requested Services</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={serviceData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={110} />
                  <Tooltip formatter={v => [v, "Jobs"]} />
                  <Bar dataKey="count" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="text-gray-400 text-sm">{text}</p>
      <p className="text-gray-300 text-xs mt-1">Complete more jobs to see insights here.</p>
    </div>
  );
}