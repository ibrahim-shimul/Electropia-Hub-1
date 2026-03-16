import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-6">Profile & Address</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Profile Form */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+880 1711-000000" />
            </div>

            <Button className="w-full mt-4 bg-[#6c2bd9] hover:bg-[#5821b0]">Save Changes</Button>
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-lg text-slate-800">Manage Addresses</h3>
            <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-[#6c2bd9] text-[#6c2bd9]">
              <Plus className="w-3 h-3 mr-1" /> Add New
            </Button>
          </div>

          <div className="space-y-4">
            {/* Address Card */}
            <div className="border border-slate-200 rounded-lg p-4 relative bg-slate-50">
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="text-slate-400 hover:text-[#6c2bd9]"><Edit2 className="w-4 h-4" /></button>
                <button className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6c2bd9] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900">Home</span>
                    <span className="bg-[#6c2bd9]/10 text-[#6c2bd9] text-[10px] font-bold px-2 py-0.5 rounded">Default</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    House 42, Road 7, Block C<br/>
                    Banani, Dhaka - 1213<br/>
                    Bangladesh
                  </p>
                  <p className="text-xs font-semibold text-slate-500">+880 1711-000000</p>
                </div>
              </div>
            </div>

            {/* Address Card 2 */}
            <div className="border border-slate-200 rounded-lg p-4 relative hover:border-[#6c2bd9]/50 transition-colors">
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="text-slate-400 hover:text-[#6c2bd9]"><Edit2 className="w-4 h-4" /></button>
                <button className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900">Office</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Level 5, Electropia Tower<br/>
                    Gulshan Avenue, Dhaka - 1212<br/>
                    Bangladesh
                  </p>
                  <p className="text-xs font-semibold text-slate-500">+880 1822-111222</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
