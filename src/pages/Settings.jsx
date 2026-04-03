import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, Info, Shield } from "lucide-react";

export default function Settings() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLogout = () => {
    base44.auth.logout("/");
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    // Notify admin then logout
    await base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: "⚠️ Account Deletion Request — Waiyaki",
      body: "A user has requested account deletion from the Waiyaki app. Please review and remove the account from the admin panel.",
    }).catch(() => {});
    base44.auth.logout("/");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="font-black text-gray-900 text-2xl mb-6">Settings</h1>

      {/* App Info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Info className="w-5 h-5 text-amber-500" />
          <h2 className="font-bold text-gray-800">About Waiyaki</h2>
        </div>
        <p className="text-sm text-gray-600">Tyre service dispatch platform for the Limuru area, Nairobi Kenya.</p>
        <p className="text-sm text-gray-600 mt-1">Operated by <strong>Waiyaki House LLC</strong></p>
        <p className="text-sm text-gray-600 mt-1">Contact: <a href="tel:0712550245" className="text-amber-600 font-semibold">0712 550 245</a></p>
        <p className="text-xs text-gray-400 mt-3">Version 1.0 · Final Release</p>
      </div>

      {/* Privacy */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-5 h-5 text-green-600" />
          <h2 className="font-bold text-gray-800">Privacy</h2>
        </div>
        <p className="text-sm text-gray-600">Your name, phone number, and location are only used to dispatch tyre service. They are never shared with third parties.</p>
      </div>

      {/* Account Actions */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-4 space-y-3">
        <h2 className="font-bold text-gray-800 mb-1">Account</h2>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-start text-gray-700"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
        <Button
          variant="outline"
          className={`w-full flex items-center gap-2 justify-start transition-colors ${confirmDelete ? "border-red-400 bg-red-50 text-red-700" : "border-red-200 text-red-600 hover:bg-red-50"}`}
          onClick={handleDeleteAccount}
          disabled={deleting}
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Processing..." : confirmDelete ? "⚠️ Tap again to confirm deletion" : "Delete Account"}
        </Button>
        {confirmDelete && (
          <p className="text-xs text-red-500">Deleting your account will notify Waiyaki House and sign you out. This cannot be undone.</p>
        )}
      </div>
    </div>
  );
}