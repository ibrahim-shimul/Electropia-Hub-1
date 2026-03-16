import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Addresses() {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading font-extrabold text-2xl text-slate-900">My Addresses</h1>
        <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] font-bold h-10 gap-2">
          <Plus className="w-4 h-4" /> Add New Address
        </Button>
      </div>
      <p className="text-sm text-slate-500 mb-8">Add and manage your delivery addresses for checkout.</p>

      {/* Address list header */}
      <h2 className="font-heading font-bold text-lg text-slate-800 mb-4">Address list</h2>

      {/* Empty state */}
      <div className="bg-white border border-slate-200 rounded-xl p-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-5">
          <Plus className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
        </div>
        <h3 className="font-heading font-bold text-lg text-slate-800 mb-2">No addresses saved</h3>
        <p className="text-sm text-slate-500 mb-6">Add your first address to use it at checkout.</p>
        <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] font-bold gap-2">
          <Plus className="w-4 h-4" /> Add Your First Address
        </Button>
      </div>
    </div>
  );
}
