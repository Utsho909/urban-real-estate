import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 py-12 md:py-20 text-foreground relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-serif font-bold tracking-wider block mb-6">
            URBANA
          </Link>
          <p className="text-foreground/60 max-w-sm mb-8">
            Redefining luxury living through visionary architecture, modern design, and an unwavering commitment to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Subscribe to our newsletter" 
              className="bg-charcoal/50 border border-white/10 px-4 py-3 outline-none focus:border-copper transition-colors w-full max-w-xs text-sm"
            />
            <button className="bg-copper hover:bg-copper/80 text-background px-6 py-3 text-sm font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-champagne">Company</h4>
          <ul className="space-y-4 text-foreground/70">
            <li><Link href="/about" className="hover:text-copper transition-colors">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-copper transition-colors">Projects</Link></li>
            <li><Link href="/gallery" className="hover:text-copper transition-colors">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-copper transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-champagne">Connect</h4>
          <ul className="space-y-4 text-foreground/70">
            <li>
              <a href="#" className="flex items-center gap-1 hover:text-copper transition-colors">
                Instagram <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1 hover:text-copper transition-colors">
                LinkedIn <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1 hover:text-copper transition-colors">
                Twitter <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/40">
        <p>&copy; {new Date().getFullYear()} Urbana Real Estate Ltd. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
