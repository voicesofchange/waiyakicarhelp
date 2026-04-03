import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export default function MobileSelect({ value, onValueChange, options, placeholder, className = "" }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => (o.value ?? o) === value);
  const label = selected ? (selected.label ?? selected) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring ${className}`}
      >
        <span className={label ? "text-foreground" : "text-muted-foreground"}>
          {label ?? placeholder ?? "Select..."}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="pb-2">
            <DrawerTitle>{placeholder ?? "Select an option"}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-1 max-h-80 overflow-y-auto">
            {options.map(opt => {
              const val = opt.value ?? opt;
              const lbl = opt.label ?? opt;
              const active = val === value;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => { onValueChange(val); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? "bg-amber-50 text-amber-800 border border-amber-300" : "hover:bg-gray-50 text-gray-800"}`}
                >
                  {lbl}
                  {active && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}