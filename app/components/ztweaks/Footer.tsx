import {NavLink} from 'react-router';
import { FaDiscord } from 'react-icons/fa';

const nav = [
  {label: 'Home', to: '/'},
  {label: 'Products', to: '/products'},
  {label: 'About', to: '/about'},
  {label: 'Contact', to: '/contact'},
];

const resources = [
  {label: 'Documentation', to: '/docs'},
  {label: 'FAQ', to: '/faq'},
];

const legal = [
  {label: 'Terms of Service', to: '/policies/terms-of-service'},
  {label: 'Privacy Policy',   to: '/policies/privacy-policy'},
  {label: 'Refund Policy',    to: '/policies/refund-policy'},
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16">
      <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/favicon.svg" alt="ZTweaks" className="w-7 h-7 rounded-full" />
              <span className="font-display text-[20px] tracking-widest text-white/70">ZTWEAKS</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-white/20 leading-relaxed uppercase max-w-60">
              Maximum performance.<br />Zero lag.
            </p>
            <a
              href="https://discord.gg/Nm7ZRQddBP"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border text-[11px] font-semibold tracking-wide transition-all duration-300"
              style={{background: 'rgba(88,101,242,0.2)', borderColor: 'rgba(88,101,242,0.3)', color: '#8b9cf5'}}
            >
              <FaDiscord size={12} />
              Join Discord
            </a>
          </div>

          {/* Pages */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.18em] text-white/25 uppercase mb-4">Pages</div>
            <ul className="flex flex-col gap-3">
              {nav.map(({label, to}) => (
                <li key={to}>
                  <NavLink to={to} className="font-mono text-[10px] tracking-widest text-white/35 hover:text-white/65 uppercase transition-colors duration-200">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.18em] text-white/25 uppercase mb-4">Resources</div>
            <ul className="flex flex-col gap-3">
              {resources.map(({label, to}) => (
                <li key={to}>
                  <NavLink to={to} className="font-mono text-[10px] tracking-widest text-white/35 hover:text-white/65 uppercase transition-colors duration-200">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.18em] text-white/25 uppercase mb-4">Legal</div>
            <ul className="flex flex-col gap-3">
              {legal.map(({label, to}) => (
                <li key={to}>
                  <NavLink to={to} className="font-mono text-[10px] tracking-widest text-white/35 hover:text-white/65 uppercase transition-colors duration-200">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-white/5 to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[9px] tracking-[0.12em] text-white/18 uppercase">© 2026 ZTweaks. All rights reserved.</span>
          <span className="font-mono text-[9px] tracking-[0.12em] text-white/18 uppercase">
            Designed by{' '}
            <a
              href="https://x.com/synclairdesign"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/40 transition-colors duration-200"
            >
              @synclairdesign
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
