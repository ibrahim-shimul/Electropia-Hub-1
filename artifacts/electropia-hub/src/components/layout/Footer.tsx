import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl leading-none">e</div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">electropia</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Electropia Limited is a fast-growing Home Appliances & Electronics brand in Bangladesh. Delivering quality and trust.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-heading font-bold mb-4">Our Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* E-commerce */}
          <div>
            <h4 className="text-white font-heading font-bold mb-4">E-commerce</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/seller" className="hover:text-primary transition-colors">Become a Seller</Link></li>
              <li><Link href="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</Link></li>
              <li><Link href="/bulk" className="hover:text-primary transition-colors">Bulk Purchase (B2B)</Link></li>
              <li><Link href="/group-deals" className="hover:text-primary transition-colors">Group Deals</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-heading font-bold mb-4">Get Exciting Updates</h4>
            <p className="text-sm text-slate-400 mb-4">Join our mailing list to receive the latest updates and promotions.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md font-semibold text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Electropia Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <div className="h-6 w-10 bg-slate-800 rounded"></div>
            <div className="h-6 w-10 bg-slate-800 rounded"></div>
            <div className="h-6 w-10 bg-slate-800 rounded"></div>
            <div className="h-6 w-10 bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
