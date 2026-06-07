import {useState, useEffect} from 'react';
import {NavLink, useLocation} from 'react-router';
import {motion, AnimatePresence} from 'motion/react';
import {IconHome, IconBox, IconUser, IconMail} from '~/components/ztweaks/Icons';
import { FaDiscord } from 'react-icons/fa';

const links = [
  {label: 'Home',     to: '/',         icon: <IconHome filled={false} />,  iconActive: <IconHome filled={true} />},
  {label: 'Products', to: '/products', icon: <IconBox  filled={false} />,  iconActive: <IconBox  filled={true} />},
  {label: 'About',    to: '/about',    icon: <IconUser filled={false} />,  iconActive: <IconUser filled={true} />},
  {label: 'Contact',  to: '/contact',  icon: <IconMail filled={false} />,  iconActive: <IconMail filled={true} />},
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const compact = scrolled;

  return (
    <motion.header
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-5 pointer-events-none"
    >
      <div className="flex items-center justify-between pointer-events-auto">

        {/* Logo */}
        <motion.div
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
          className="shrink-0"
        >
          <NavLink to="/"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/10 bg-white/4 backdrop-blur-xl hover:border-white/20 hover:bg-white/8 transition-all duration-300">
            <img src="/favicon.svg" alt="ZTweaks" className="w-8 h-8" />
          </NavLink>
        </motion.div>

        {/* Center pill */}
        <motion.div
          initial={{opacity: 0, y: -12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1]}}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <div className={`flex items-center gap-0.5 px-1.5 py-1.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/5 backdrop-blur-2xl border border-white/9 shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
              : 'bg-white/3 backdrop-blur-xl border border-white/6'
          }`}>
            {links.map((link) => {
              const active = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-2 rounded-full text-[13px] font-medium tracking-wide transition-colors duration-300 overflow-hidden ${
                    active ? 'text-white' : 'text-white/45 hover:text-white/75'
                  }`}
                  style={{
                    padding: compact ? '7px 10px' : '7px 18px',
                    transition: 'padding 0.4s cubic-bezier(0.22,1,0.36,1), color 0.3s',
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/9 border border-white/10"
                      transition={{type: 'spring', bounce: 0.25, duration: 0.4}}
                    />
                  )}
                  <span className="relative z-10 flex items-center shrink-0">
                    {active ? link.iconActive : link.icon}
                  </span>
                  <AnimatePresence initial={false}>
                    {!compact && (
                      <motion.span
                        key="label"
                        initial={{opacity: 0, width: 0}}
                        animate={{opacity: 1, width: 'auto'}}
                        exit={{opacity: 0, width: 0}}
                        transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                        className="relative z-10 overflow-hidden whitespace-nowrap hidden sm:block"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </div>
        </motion.div>

        {/* Discord */}
        <motion.div
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
          className="shrink-0"
        >
          <a
            href="https://discord.gg/Nm7ZRQddBP"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-full text-white font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_28px_rgba(88,101,242,0.5)] hover:-translate-y-0.5 backdrop-blur-xl border border-white/8"
            style={{background: '#5865F2', padding: '8px 10px'}}
          >
            <FaDiscord size={15} />
            <span className="hidden sm:block text-[13px] pr-1">Discord</span>
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
}
