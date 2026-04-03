import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const fmt = (h) => {
  if (h === 0) return "12:00 AM";
  if (h < 12) return `${h}:00 AM`;
  if (h === 12) return "12:00 PM";
  return `${h - 12}:00 PM`;
};

export default function WeeklySchedule() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newBlock, setNewBlock] = useState({ day_of_week: 1, start_hour: 8, end_hour: 17 });

  const load = useCallback(async () => {
    const data = await base44.entities.AvailabilityBlock.list("day_of_week");
    setBlocks(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addBlock = async () => {
    if (newBlock.end_hour <= newBlock.start_hour) return;
    setSaving(true);
    await base44.entities.AvailabilityBlock.create(newBlock);
    await load();
    setSaving(false);
  };

  const removeBlock = async (id) => {
    await base44.entities.AvailabilityBlock.delete(id);
    await load();
  };

  const grouped = DAYS.map((day, i) => ({
    day,
    dayIdx: i,
    blocks: blocks.filter(b => b.day_of_week === i),
  }));

  return (
    <div className="space-y-5">
      {/* Add block */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="font-bold text-gray-800 text-sm mb-3">Add Availability Window</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Day</label>
            <select
              className="w-full border-2 border-gray-100 rounded-xl h-11 px-2 text-sm focus:outline-none focus:border-amber-400"
              value={newBlock.day_of_week}
              onChange={e => setNewBlock(b => ({ ...b, day_of_week: Number(e.target.value) }))}
            >
              {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">From</label>
            <select
              className="w-full border-2 border-gray-100 rounded-xl h-11 px-2 text-sm focus:outline-none focus:border-amber-400"
              value={newBlock.start_hour}
              onChange={e => setNewBlock(b => ({ ...b, start_hour: Number(e.target.value) }))}
            >
              {HOURS.map(h => <option key={h} value={h}>{fmt(h)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">To</label>
            <select
              className="w-full border-2 border-gray-100 rounded-xl h-11 px-2 text-sm focus:outline-none focus:border-amber-400"
              value={newBlock.end_hour}
              onChange={e => setNewBlock(b => ({ ...b, end_hour: Number(e.target.value) }))}
            >
              {HOURS.filter(h => h > 0).map(h => <option key={h} value={h}>{fmt(h)}</option>)}
            </select>
          </div>
        </div>
        {newBlock.end_hour <= newBlock.start_hour && (
          <p className="text-red-500 text-xs mb-2">End time must be after start time.</p>
        )}
        <Button className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl" onClick={addBlock} disabled={saving || newBlock.end_hour <= newBlock.start_hour}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-1" />Add Window</>}
        </Button>
      </div>

      {/* Weekly grid */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>
      ) : (
        <div className="space-y-3">
          {grouped.map(({ day, dayIdx, blocks: dayBlocks }) => (
            <div key={dayIdx} className={`rounded-2xl border-2 p-4 ${dayBlocks.length > 0 ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-white"}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`font-bold text-sm ${dayBlocks.length > 0 ? "text-amber-800" : "text-gray-400"}`}>{day}</p>
                {dayBlocks.length === 0 && <span className="text-xs text-gray-300">No availability</span>}
              </div>
              {dayBlocks.length > 0 && (
                <div className="space-y-1.5">
                  {dayBlocks.map(b => (
                    <div key={b.id} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-amber-100">
                      <span className="text-sm font-semibold text-gray-800">{fmt(b.start_hour)} – {fmt(b.end_hour)}</span>
                      <button onClick={() => removeBlock(b.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
        <strong>Note:</strong> Customers can only book during these windows AND when your availability toggle is ON.
      </div>
    </div>
  );
}