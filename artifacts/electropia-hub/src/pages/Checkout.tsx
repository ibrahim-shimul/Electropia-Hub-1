import { useState, useEffect } from "react";
import { CheckCircle2, ChevronRight, MapPin, Truck, CreditCard, Receipt, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation, useRoute } from "wouter";

// Steps based on the mockups: Address -> Shipping -> Payment -> Review
const STEPS = [
  { id: 1, name: "address", label: "Address", icon: MapPin },
  { id: 2, name: "shipping", label: "Shipping", icon: Truck },
  { id: 3, name: "payment", label: "Payment", icon: CreditCard },
  { id: 4, name: "review", label: "Review", icon: Receipt },
];

export default function Checkout() {
  const [, params] = useRoute("/checkout/:step?");
  const [, setLocation] = useLocation();
  
  // Determine current step based on URL, default to 1 (address)
  const currentStepString = params?.step || "address";
  const matchedStep = STEPS.find(s => s.name === currentStepString);
  const currentStep = matchedStep ? matchedStep.id : 1;

  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedShipping, setSelectedShipping] = useState<Record<string, string>>({
    "store-1": "standard",
    "store-2": "express"
  });
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(300);

  const goToStep = (stepName: string) => {
    setLocation(`/checkout/${stepName}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-6 pb-12 mt-6 max-w-[1000px] mx-auto">
      
      {/* Checkout Header & Progress */}
      <div className="mb-6">
        <h1 className="font-heading font-black text-2xl text-slate-900 mb-6">Checkout</h1>
        <div className="flex items-center flex-wrap gap-2 text-sm font-semibold">
          {STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            
            return (
              <div key={step.id} className="flex items-center gap-2">
                <button 
                  onClick={() => goToStep(step.name)}
                  disabled={step.id > currentStep && step.id !== currentStep + 1}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                  isCompleted ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/20 cursor-pointer' :
                  isCurrent ? 'bg-[#6c2bd9] border-[#6c2bd9] text-white shadow-sm shadow-purple-500/20' :
                  step.id === currentStep + 1 ? 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 cursor-pointer' :
                  'bg-white border-slate-100 text-slate-300 cursor-not-allowed opacity-70'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 text-[10px]">{step.id}</span>}
                  {step.label}
                </button>
                {idx < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 mx-1" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (Left) */}
        <div className="lg:col-span-7">
          
          {/* STEP 1: ADDRESS */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-4">Delivery address</h2>
              <p className="text-sm text-slate-500 mb-6">Select a saved address or add a new one.</p>
              
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { id: "home", label: "Home", name: "Joynul Abedin", phone: "+88 01911761617", address: "District: Gazipur, Upzilla: Kapasia, Courier Village/Area: Kamargaon, Moholla/Holding: Pashchim, Para, House/Apartment: Moulovi Baari.", courier: "Fastrack, Courier Hub: Moulovi Baari" },
                  { id: "work", label: "Work", name: "Joynul Abedin", phone: "+88 01911761617", address: "District: Gazipur, Upzilla: Kapasia, Courier Village/Area: Kamargaon, Moholla/Holding: Pashchim, Para, House/Apartment: Moulovi Baari.", courier: "Fastrack, Courier Hub: Moulovi Baari" },
                ].map((addr) => (
                  <div key={addr.id} className={`relative rounded-xl border-2 p-5 cursor-pointer transition-colors ${selectedAddress === addr.id ? 'border-[#6c2bd9] bg-purple-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
                    <RadioGroupItem value={addr.id} id={addr.id} className="absolute top-5 left-5 text-[#6c2bd9] border-slate-300" />
                    <div className="pl-8">
                      <Label htmlFor={addr.id} className="font-bold text-slate-900 cursor-pointer text-base mb-3 block">{addr.label}</Label>
                      <div className="space-y-1.5 text-[13px] text-slate-600 leading-relaxed">
                        <p>Phone: <span className="font-medium text-slate-800">{addr.phone}</span></p>
                        <p>Name: <span className="font-medium text-slate-800">{addr.name}</span></p>
                        <p className="mt-2">{addr.address}</p>
                        <p className="mt-2 text-slate-500 text-[11px] font-medium">Courier Company: {addr.courier}</p>
                      </div>
                      <div className="flex gap-4 mt-4 text-[13px] font-bold">
                        <button className="text-[#6c2bd9] hover:underline">Edit</button>
                        <button className="text-rose-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              
              <Button variant="outline" className="border-slate-200 text-slate-700 font-bold mb-6">
                + Add New Address
              </Button>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-8">
                <Label className="text-sm font-bold text-slate-700 mb-2 block">Special delivery instructions (optional)</Label>
                <Input placeholder="e.g. Leave at guard house" className="bg-white border-slate-200" />
              </div>
              
              <Button onClick={() => goToStep("shipping")} className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-12 px-8 shadow-md">
                Continue to Shipping
              </Button>
            </div>
          )}

          {/* STEP 2: SHIPPING */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-6">Select Shipping Options</h2>
              
              <div className="space-y-6 mb-8">
                {/* Store 1 */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Tech Gadgets BD</h3>
                    <p className="text-[11px] text-slate-500">Samsung Galaxy A54 5G, Wireless Earbuds Pro</p>
                  </div>
                  <RadioGroup value={selectedShipping["store-1"]} onValueChange={(v) => setSelectedShipping({...selectedShipping, "store-1": v})} className="p-5 space-y-3">
                    <div className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedShipping["store-1"] === "standard" ? "border-[#6c2bd9] bg-purple-50/30" : "border-slate-200 hover:border-slate-300"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="s1-standard" className="text-[#6c2bd9]" />
                        <Label htmlFor="s1-standard" className="cursor-pointer">
                          <span className="font-bold block text-sm">Standard Delivery</span>
                          <span className="text-[11px] text-slate-500">Est. delivery: 3-5 days • ★ 4</span>
                        </Label>
                      </div>
                      <span className="font-bold text-slate-900">৳120</span>
                    </div>
                    <div className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedShipping["store-1"] === "express" ? "border-[#6c2bd9] bg-purple-50/30" : "border-slate-200 hover:border-slate-300"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="express" id="s1-express" className="text-[#6c2bd9]" />
                        <Label htmlFor="s1-express" className="cursor-pointer">
                          <span className="font-bold block text-sm">Express Delivery</span>
                          <span className="text-[11px] text-slate-500">Est. delivery: 1-2 days • ★ 5</span>
                        </Label>
                      </div>
                      <span className="font-bold text-slate-900">৳250</span>
                    </div>
                  </RadioGroup>
                </div>

                {/* Store 2 */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">ElectroHub</h3>
                    <p className="text-[11px] text-slate-500">Power Bank 20000mAh</p>
                  </div>
                  <RadioGroup value={selectedShipping["store-2"]} onValueChange={(v) => setSelectedShipping({...selectedShipping, "store-2": v})} className="p-5 space-y-3">
                    <div className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedShipping["store-2"] === "standard" ? "border-[#6c2bd9] bg-purple-50/30" : "border-slate-200 hover:border-slate-300"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="s2-standard" className="text-[#6c2bd9]" />
                        <Label htmlFor="s2-standard" className="cursor-pointer">
                          <span className="font-bold block text-sm">Standard Delivery</span>
                          <span className="text-[11px] text-slate-500">Est. delivery: 3-5 days</span>
                        </Label>
                      </div>
                      <span className="font-bold text-slate-900">৳80</span>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => goToStep("address")} className="font-bold h-12">
                  Back to Address
                </Button>
                <Button onClick={() => goToStep("payment")} className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-12 px-8 shadow-md">
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-6">Payment method</h2>
              
              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4 mb-8">
                {/* Pay Full */}
                <div className={`flex items-center gap-3 p-5 rounded-xl border-2 transition-colors cursor-pointer ${selectedPayment === 'full' ? 'border-[#6c2bd9] bg-purple-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                  <RadioGroupItem value="full" id="pay-full" className="text-[#6c2bd9]" />
                  <Label htmlFor="pay-full" className="cursor-pointer flex-1">
                    <span className="font-bold text-slate-900 block mb-1">Pay Full Amount In Advance <Badge className="ml-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">1% Extra Discount</Badge></span>
                    <span className="text-xs text-slate-500">Pay tk 46,303/- , Save tk 467/-</span>
                  </Label>
                </div>
                
                {/* COD */}
                <div className={`flex items-center gap-3 p-5 rounded-xl border-2 transition-colors cursor-pointer ${selectedPayment === 'cod' ? 'border-[#6c2bd9] bg-purple-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                  <RadioGroupItem value="cod" id="pay-cod" className="text-[#6c2bd9]" />
                  <Label htmlFor="pay-cod" className="cursor-pointer flex-1">
                    <span className="font-bold text-slate-900 block mb-1">Cash on Delivery (COD)</span>
                    <span className="text-xs text-slate-500">(Pay tk 200/- Only for Order Confirmation, Pay rest of tk 46,570/- on COD)</span>
                  </Label>
                </div>

                {/* EMI */}
                <div className={`p-5 rounded-xl border-2 transition-colors ${selectedPayment === 'emi' ? 'border-[#6c2bd9] bg-purple-50/30' : 'border-slate-100 bg-white'}`}>
                  <div className="flex items-start gap-3 mb-4 cursor-pointer">
                    <RadioGroupItem value="emi" id="pay-emi" className="text-[#6c2bd9] mt-1" />
                    <Label htmlFor="pay-emi" className="cursor-pointer flex-1">
                      <span className="font-bold text-slate-900 block mb-1">Purchase with EMI facilities</span>
                      <span className="text-xs text-slate-500">Pay tk 3391/- monthly for 16months, tk 54,254/- in total</span>
                    </Label>
                  </div>
                  
                  {selectedPayment === 'emi' && (
                    <div className="grid grid-cols-2 gap-4 pl-7 animate-in fade-in duration-300">
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">EMI Bank</Label>
                        <select className="w-full border border-slate-200 rounded-lg text-sm px-3 py-2.5 bg-white focus:outline-none focus:border-[#6c2bd9]">
                          <option>City Bank</option>
                          <option>BRAC Bank</option>
                          <option>Standard Chartered</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">EMI Tenure</Label>
                        <select className="w-full border border-slate-200 rounded-lg text-sm px-3 py-2.5 bg-white focus:outline-none focus:border-[#6c2bd9]">
                          <option>121466.00 • 36 Months Convenience fee 16%</option>
                          <option>121466.00 • 24 Months Convenience fee 12%</option>
                          <option>121466.00 • 12 Months Convenience fee 8%</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>

              {/* Sub-Payment Gateways shown if 'full' is selected */}
              {selectedPayment === 'full' && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-2">
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 h-16 bg-white border border-slate-200 hover:border-pink-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors relative">
                      <img src="https://download.logo.wine/logo/bkash/bkash-logo.png" className="h-8 object-contain" />
                      <span className="text-[10px] font-bold text-slate-500 mt-1">5% Off upto 300/-</span>
                    </div>
                    <div className="flex-1 h-16 bg-white border border-slate-200 hover:border-orange-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors">
                      <img src="https://download.logo.wine/logo/nagad/nagad-logo.png" className="h-7 object-contain" />
                      <span className="text-[10px] font-bold text-slate-500 mt-1">7% Off upto 1000/-</span>
                    </div>
                    <div className="flex-1 h-16 bg-white border border-slate-200 hover:border-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors px-2">
                      <img src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png" className="w-full h-6 object-contain" />
                      <span className="text-[10px] font-bold text-slate-500 mt-1">Cards & Net Banking</span>
                    </div>
                    <div className="flex-1 h-16 bg-white border border-[#6c2bd9] rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors bg-purple-50/30">
                      <span className="font-heading font-black text-[#6c2bd9] text-sm">BANK TRANSFER</span>
                    </div>
                  </div>

                  {/* Bank Transfer Form */}
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Bank Transfer Details</h3>
                    <p className="text-xs text-slate-500 mb-6">Deposit Cash directly at the Bank Counter or Transfer Online and submit with details below.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">Amount</Label>
                        <Input placeholder="e.g. 14000" className="bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">Transaction ID</Label>
                        <Input placeholder="164874585 89787" className="bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">A/C No</Label>
                        <Input placeholder="Account number" className="bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">A/C Name</Label>
                        <Input placeholder="Account holder name" className="bg-white" />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">
                          Routing No
                          <span className="text-[11px] font-normal text-slate-400 ml-1">(on Input, rest of the fields will be automatically filled.)</span>
                        </Label>
                        <Input placeholder="Enter routing number" className="bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">District/Zone</Label>
                        <Input placeholder="district/zone" className="bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">Bank Name</Label>
                        <Input placeholder="bank name" className="bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700 mb-1.5 block">Branch Name</Label>
                        <Input placeholder="branch name" className="bg-white" />
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      </div>
                      <p className="text-sm font-bold text-slate-700 mb-1">Image/PDF upload of the Bank Deposit/Transfer Slip.</p>
                      <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => goToStep("shipping")} className="font-bold h-12">
                  Back
                </Button>
                <Button onClick={() => goToStep("review")} className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-12 px-8 shadow-md">
                  Continue to Review
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUCCESS */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[850px] mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              
              {/* Success Header */}
              <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-dashed border-slate-200">
                <div className="w-20 h-20 bg-[#10b981] text-white rounded-full flex items-center justify-center mb-5 shadow-[0_0_0_8px_rgba(16,185,129,0.1)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-heading font-black text-3xl text-slate-900 mb-2">Order Confirmed!</h2>
                <p className="text-slate-500 font-medium mb-4">Thank you for shopping with Electropia.</p>
                
                {/* Barcode Mockup */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg border border-slate-200 w-full max-w-sm">
                   <div className="h-12 w-full flex justify-between px-2 opacity-80 mb-2">
                     {/* CSS-based Barcode simulation */}
                     {[...Array(40)].map((_, i) => (
                       <div key={i} className="bg-slate-800 h-full" style={{ width: `${Math.max(1, Math.random() * 4)}px`, marginRight: `${Math.random() * 3}px` }}></div>
                     ))}
                   </div>
                   <p className="font-mono text-sm tracking-[0.2em] font-bold text-slate-900">E0803269999900</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Master Order Info */}
                <div className="pr-4 md:pr-8">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">INVOICE DETAILS</h3>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Invoice Number:</span>
                      <span className="font-bold text-slate-900 text-sm">E0803269999900</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Date & Time:</span>
                      <span className="text-slate-900">08 Mar 2026, 14:30:45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Payment Method:</span>
                      <span className="text-slate-900">EMI (City Bank)</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-500">Payment Status:</span>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-2.5 py-0 font-semibold text-xs shadow-none border-none">Paid</Badge>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">SHIPPING DETAILS</h3>
                  <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-100 text-sm">
                    <p className="font-bold text-slate-900 text-[15px] mb-1">Joynul Abedin</p>
                    <p className="text-slate-600 mb-3 font-medium">+88 01911761617</p>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      District: Gazipur, Upzilla: Kapasia<br/>
                      Village/Area: Kamargaon, Moholla: Pashchim<br/>
                      House/Apartment: Moulovi Baari.
                    </p>
                  </div>
                </div>
              </div>

              {/* Multi-Vendor Items List */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Order Items by Vendor</h3>
                
                {/* Vendor 1 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">Tech Gadgets BD <span className="text-slate-400 font-normal text-xs">(ID: S-1045)</span></p>
                      <p className="text-[10px] text-slate-500">Sub Order ID: <span className="font-mono font-bold text-slate-700">E0803269999911</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-600 uppercase">Courier Info</p>
                      <p className="text-[11px] text-slate-500">Steadfast, Hub: Golokpur Bazar</p>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 text-[11px] border-b border-slate-100 bg-white">
                        <th className="py-2 pl-5 font-medium">Product & Variant</th>
                        <th className="py-2 font-medium text-center">SKU</th>
                        <th className="py-2 font-medium text-center">Price</th>
                        <th className="py-2 font-medium text-center">Qty</th>
                        <th className="py-2 pr-5 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="py-3 pl-5">
                          <p className="text-slate-900 font-medium text-xs">Samsung Galaxy A54 5G</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Color: Awesome Graphite, Storage: 8GB/128GB</p>
                        </td>
                        <td className="py-3 text-center text-slate-500 text-[10px] font-mono">SM-A546E</td>
                        <td className="py-3 text-center text-slate-600 text-xs">৳42,990</td>
                        <td className="py-3 text-center text-slate-600 text-xs">2</td>
                        <td className="py-3 pr-5 text-right font-bold text-slate-900 text-xs">৳85,980</td>
                      </tr>
                      <tr>
                        <td className="py-3 pl-5">
                          <p className="text-slate-900 font-medium text-xs">Wireless Earbuds Pro</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Color: White, ANC: Yes</p>
                        </td>
                        <td className="py-3 text-center text-slate-500 text-[10px] font-mono">WEP-W-01</td>
                        <td className="py-3 text-center text-slate-600 text-xs">৳2,490</td>
                        <td className="py-3 text-center text-slate-600 text-xs">1</td>
                        <td className="py-3 pr-5 text-right font-bold text-slate-900 text-xs">৳2,490</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Vendor 2 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">ElectroHub <span className="text-slate-400 font-normal text-xs">(ID: S-2201)</span></p>
                      <p className="text-[10px] text-slate-500">Sub Order ID: <span className="font-mono font-bold text-slate-700">E0803269999912</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-600 uppercase">Courier Info</p>
                      <p className="text-[11px] text-slate-500">Pathao, Hub: Gulshan</p>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="py-3 pl-5 w-[40%]">
                          <p className="text-slate-900 font-medium text-xs">Power Bank 20000mAh</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Color: Black, Output: 22.5W Fast Charge</p>
                        </td>
                        <td className="py-3 text-center text-slate-500 text-[10px] font-mono w-[15%]">PB-20K-BLK</td>
                        <td className="py-3 text-center text-slate-600 text-xs w-[15%]">৳1,890</td>
                        <td className="py-3 text-center text-slate-600 text-xs w-[10%]">3</td>
                        <td className="py-3 pr-5 text-right font-bold text-slate-900 text-xs w-[20%]">৳5,670</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Table */}
                <div className="flex justify-end mt-8">
                  <div className="bg-white rounded-xl p-6 border border-slate-100 w-full md:w-[320px] shadow-sm">
                    <div className="space-y-3 text-[13px]">
                      <div className="flex justify-between text-slate-600">
                        <span>Sub Total</span>
                        <span className="text-slate-900">৳94,140</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Total Shipping</span>
                        <span className="text-slate-900">৳200</span>
                      </div>
                      <div className="flex justify-between text-rose-600 font-medium">
                        <span>Total Discount</span>
                        <span>-৳800</span>
                      </div>
                      <div className="flex justify-between text-slate-600 pb-3">
                        <span>EMI Convenience Fee</span>
                        <span className="text-slate-900">৳7,484</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                        <span className="font-bold text-slate-900 text-base">Grand Total</span>
                        <span className="font-heading font-black text-2xl text-[#6c2bd9]">৳101,024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4 mt-10 pt-8 border-t border-slate-100">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 px-8">
                  <Receipt className="w-4 h-4 mr-2" /> Download PDF Invoice
                </Button>
                <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-12 px-8">
                  Go to Dashboard
                </Button>
                <Button variant="outline" className="font-bold h-12 px-8">
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* Order Summary Sidebar (Right) */}
        {currentStep < 4 && (
          <div className="lg:col-span-5">
             <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-24">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-6">Order summary</h3>
                
                {/* Wallet usage mockup */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <Label className="text-sm font-bold text-slate-800 block mb-1">Use Wallet Balance</Label>
                  <p className="text-xs text-slate-500 mb-3">You have ৳12,450 Wallet Balance available</p>
                  <div className="flex gap-2 mb-3">
                    <Input placeholder="Enter amount" className="bg-white focus-visible:ring-[#6c2bd9]/20" />
                    <Button className="bg-[#6c2bd9] hover:bg-[#5821b0]">Apply</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="use-max" className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" />
                    <Label htmlFor="use-max" className="text-sm cursor-pointer">Use maximum Wallet Balance</Label>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <Label className="text-sm font-bold text-slate-800 block mb-2">Promo/Referral Code</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code" 
                      className="bg-white focus-visible:ring-[#6c2bd9]/20"
                    />
                    <Button variant="outline" className="border-slate-300 font-bold px-6">Apply</Button>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between items-center mt-3 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                      <span>Applied Discount (BOOM30)</span>
                      <span>(-) ৳{appliedDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="text-[13px] mb-2">

                  {/* Regular price + discount lines */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-700">
                      <span>Regular Price <span className="text-slate-400 text-[11px]">(06 items)</span></span>
                      <span className="font-medium text-slate-900 tabular-nums">: ৳ 47,370</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Discount (Promo BOOM30)</span>
                      <span className="tabular-nums text-slate-700">: -৳ 300</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Discount (Refferal 2254152)</span>
                      <span className="tabular-nums text-slate-700">: -৳ 300</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Discount (5% Off Visa Card)</span>
                      <span className="tabular-nums text-slate-700">: -৳ 500</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Discount (1% dis on Adv Pay)</span>
                      <span className="tabular-nums text-slate-700">: -৳ 300</span>
                    </div>
                  </div>

                  {/* Checkout Lowest */}
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-200">
                    <span className="font-bold text-slate-900">Checkout Lowest</span>
                    <span className="font-bold text-slate-900 tabular-nums">: ৳ 45,970/-</span>
                  </div>

                  {/* Wallet + Sub Total block */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Paid by Wallet Balance:</span>
                      <span className="font-medium text-slate-900 tabular-nums">: ৳ 1500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Sub Total</span>
                      <span className="font-bold text-slate-900 tabular-nums">: ৳ 44,470/-</span>
                    </div>
                  </div>

                  {/* Fees + Shipping block */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-2.5">
                    <div className="flex justify-between text-slate-600">
                      <span className="leading-snug">
                        EMI Convenience Fee
                        <span className="block text-[11px] text-slate-400">(The City Bank, 36M @16%)</span>
                      </span>
                      <span className={`font-medium tabular-nums shrink-0 ml-3 ${selectedPayment === 'emi' ? 'text-slate-900' : 'text-slate-300'}`}>
                        : ৳ {selectedPayment === 'emi' ? '7,484' : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>SSLCOMMERZ Gateway Charge (1.5%)</span>
                      <span className={`font-medium tabular-nums shrink-0 ml-3 ${selectedPayment === 'full' ? 'text-slate-900' : 'text-slate-300'}`}>
                        : ৳ {selectedPayment === 'full' ? '802' : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-medium text-slate-900 tabular-nums">: ৳ 200</span>
                    </div>
                  </div>

                  {/* Payable Total */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-slate-900">
                    <span className="font-black text-slate-900 uppercase tracking-wide text-[13px]">Payable Total</span>
                    <span className="font-heading font-black text-[#6c2bd9] text-lg tabular-nums">
                      : ৳ {selectedPayment === 'emi' ? '52,956' : selectedPayment === 'full' ? '45,472' : '44,670'}
                    </span>
                  </div>
                </div>

                {/* Footnote */}
                <p className="text-[11px] text-slate-500 leading-relaxed mt-4 mb-4">
                  *All discounts are subject to proper use of promo codes and methods fulfilling eligibility.
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p>Safe and secure payments. 100% Authentic products.</p>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
