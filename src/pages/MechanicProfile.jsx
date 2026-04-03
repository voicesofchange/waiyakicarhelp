import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Camera, Award, Star, CheckCircle, Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MechanicProfile() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ display_name: "", bio: "", years_experience: "", phone: "" });
  const [newCert, setNewCert] = useState("");
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [profiles, allJobs] = await Promise.all([
      base44.entities.MechanicProfile.list(),
      base44.entities.Job.filter({ status: "completed" }, "-completed_at", 50),
    ]);
    setJobs(allJobs);
    if (profiles.length > 0) {
      const p = profiles[0];
      setProfile(p);
      setForm({ display_name: p.display_name || "", bio: p.bio || "", years_experience: p.years_experience || "", phone: p.phone || "" });
      setCerts(p.certifications || []);
    } else {
      setEditing(true);
    }
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    const data = { ...form, years_experience: Number(form.years_experience) || 0, certifications: certs };
    if (profile) {
      const updated = await base44.entities.MechanicProfile.update(profile.id, data);
      setProfile(updated);
    } else {
      const created = await base44.entities.MechanicProfile.create(data);
      setProfile(created);
    }
    setEditing(false);
    setSaving(false);
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file || !profile) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const updated = await base44.entities.MechanicProfile.update(profile.id, { photo_url: file_url });
    setProfile(updated);
    setUploading(false);
  };

  const addCert = () => {
    if (!newCert.trim()) return;
    setCerts(prev => [...prev, newCert.trim()]);
    setNewCert("");
  };

  const removeCert = (i) => setCerts(prev => prev.filter((_, idx) => idx !== i));

  const completedJobs = jobs;
  const avgRating = completedJobs.filter(j => j.rating_stars).reduce((s, j, _, a) => s + j.rating_stars / a.length, 0);
  const ratedJobs = completedJobs.filter(j => j.rating_stars);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <div className="px-5 pt-12 pb-8 text-center">
        <div className="relative inline-block mb-4">
          {profile?.photo_url ? (
            <img src={profile.photo_url} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-amber-500" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-amber-500 flex items-center justify-center border-4 border-amber-300">
              <span className="text-black font-black text-4xl">W</span>
            </div>
          )}
          {profile && (
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin text-gray-600" /> : <Camera className="w-4 h-4 text-gray-600" />}
              <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
            </label>
          )}
        </div>
        <h1 className="text-white font-black text-2xl">{profile?.display_name || "Prince Waiyaki"}</h1>
        <p className="text-amber-400 text-sm font-semibold mt-1">Certified Tyre Specialist · Limuru</p>
        {avgRating > 0 && (
          <div className="flex items-center justify-center gap-1 mt-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
            ))}
            <span className="text-white font-bold text-sm ml-1">{avgRating.toFixed(1)}</span>
            <span className="text-gray-400 text-xs">({ratedJobs.length} reviews)</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-5 pb-6 grid grid-cols-3 gap-3">
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-white font-black text-2xl">{completedJobs.length}</p>
          <p className="text-gray-400 text-xs">Jobs Done</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-white font-black text-2xl">{profile?.years_experience || "—"}</p>
          <p className="text-gray-400 text-xs">Yrs Exp.</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-white font-black text-2xl">{avgRating > 0 ? avgRating.toFixed(1) : "—"}</p>
          <p className="text-gray-400 text-xs">Rating</p>
        </div>
      </div>

      {/* Content card */}
      <div className="bg-white rounded-t-3xl px-5 pt-6 pb-16 min-h-[55vh]">
        {editing ? (
          <div className="space-y-4">
            <h2 className="font-black text-gray-900 text-lg">Edit Profile</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Display Name</label>
              <Input className="h-11 rounded-xl border-2 border-gray-100" value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))} placeholder="Prince Waiyaki" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Phone</label>
              <Input className="h-11 rounded-xl border-2 border-gray-100" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="0712 550 245" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Bio</label>
              <textarea className="w-full border-2 border-gray-100 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-amber-400" rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Brief description of your experience and skills..." />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Years Experience</label>
              <Input className="h-11 rounded-xl border-2 border-gray-100" type="number" value={form.years_experience} onChange={e => setForm(f => ({ ...f, years_experience: e.target.value }))} placeholder="e.g. 8" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Certifications</label>
              <div className="flex gap-2 mb-2">
                <Input className="flex-1 h-11 rounded-xl border-2 border-gray-100" value={newCert} onChange={e => setNewCert(e.target.value)} placeholder="e.g. NTSA Certified Mechanic" onKeyDown={e => e.key === "Enter" && addCert()} />
                <Button className="h-11 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl" onClick={addCert}><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="space-y-1">
                {certs.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2"><Award className="w-4 h-4 text-green-600" /><span className="text-sm text-green-800 font-medium">{c}</span></div>
                    <button onClick={() => removeCert(i)}><X className="w-4 h-4 text-green-400 hover:text-red-400" /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 h-12 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl" onClick={save} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
              </Button>
              {profile && <Button variant="outline" className="h-12 px-4 rounded-xl" onClick={() => setEditing(false)}>Cancel</Button>}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-gray-900 text-lg">My Profile</h2>
              <Button size="sm" variant="outline" className="rounded-xl border-2" onClick={() => setEditing(true)}>Edit</Button>
            </div>

            {profile?.bio && (
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">About</p>
                <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {certs.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Certifications</p>
                <div className="space-y-2">
                  {certs.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm text-green-800 font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ratedJobs.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Customer Reviews ({ratedJobs.length})</p>
                <div className="space-y-3">
                  {ratedJobs.slice(0, 10).map(j => (
                    <div key={j.id} className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= j.rating_stars ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{j.service_type_name}</span>
                      </div>
                      {j.rating_note && <p className="text-sm text-gray-600 italic">"{j.rating_note}"</p>}
                      <p className="text-xs text-gray-400 mt-1">— {j.member_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedJobs.length > 0 && ratedJobs.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Star className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                <p className="font-medium">No reviews yet</p>
                <p className="text-sm">Complete jobs to collect customer ratings.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}