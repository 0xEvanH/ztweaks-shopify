import {motion} from 'motion/react';
import {FaDiscord} from 'react-icons/fa';
import {RiMailLine, RiTimeLine, RiShieldCheckLine} from 'react-icons/ri';

export const meta = () => [
  {title: 'Contact | ZTweaks'},
  {name: 'description', content: 'Get in touch with the ZTweaks team for support or general inquiries.'},
  {property: 'og:title', content: 'Contact | ZTweaks'},
  {property: 'og:description', content: 'Get in touch with the ZTweaks team for support or general inquiries.'},
];

const channels = [
  {
    icon: RiMailLine,
    title: 'Email Support',
    desc: 'Best for billing questions, refund requests, and account issues. We respond within 24 hours on business days.',
    action: 'hello@ztweaks.com',
    href: 'mailto:hello@ztweaks.com',
    label: 'Send Email',
    primary: true,
  },
  {
    icon: FaDiscord,
    title: 'Discord Community',
    desc: 'Fastest support channel. Get help from the team and 5,000+ community members in real time.',
    action: 'discord.gg/WjAZH8KUWd',
    href: 'https://discord.gg/WjAZH8KUWd',
    label: 'Join Discord',
    primary: false,
  },
];

const faqs = [
  {q: 'How fast do you respond?', a: 'Discord support is typically answered within a few hours. Email support within 24 hours on business days.'},
  {q: 'I bought a product and need help installing it.', a: 'Head to our Discord #support channel or check the Docs page for step-by-step installation guides for every product.'},
];

export default function Contact() {
  return (
    <>
      <section className="pt-36 pb-10 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
          className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4"
        >
          // contact
        </motion.div>
        <motion.h1
          initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1]}}
          className="font-display text-[clamp(48px,7vw,90px)] leading-[0.88] tracking-[0.02em] text-white mb-6"
        >
          GET IN TOUCH
        </motion.h1>
        <motion.p
          initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.15}}
          className="text-white/40 text-[14px] font-light leading-relaxed max-w-md"
        >
          Have a question, issue, or just want to say hi? We're a small team and we actually read every message.
        </motion.p>
      </section>

      {/* Contact channels */}
      <section className="px-6 md:px-12 pb-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.2 + i * 0.1}}
              >
                <div className="glass-card p-8 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 mb-5">
                    <Icon size={18} />
                  </div>
                  <h2 className="text-[16px] font-semibold text-white mb-2">{c.title}</h2>
                  <p className="text-[13px] text-white/38 font-light leading-relaxed mb-6 flex-1">{c.desc}</p>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                    className={`inline-flex items-center gap-2 px-6 py-3 text-[12px] font-semibold tracking-wider rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                      c.primary
                        ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]'
                        : 'bg-[#5865F2] hover:bg-[#6875f5] text-white hover:shadow-[0_0_40px_rgba(88,101,242,0.4)]'
                    }`}
                  >
                    {c.label} →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Response commitment */}
      <section className="px-6 md:px-12 pb-10 max-w-4xl mx-auto">
        <motion.div
          initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.4}}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {[
            {icon: RiTimeLine, label: '< 24h', desc: 'Email response time'},
            {icon: FaDiscord, label: 'Live', desc: 'Discord community support'},
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/7 flex items-center justify-center text-white/40 shrink-0">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="font-display text-[18px] tracking-wider text-white">{item.label}</div>
                  <div className="font-mono text-[9px] tracking-widest text-white/28 uppercase">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Quick answers */}
      <section className="px-6 md:px-12 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.5}}
          className="font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase mb-4"
        >
          Before you write in
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.55 + i * 0.06}}
              className="p-5 rounded-xl border border-white/[0.07] bg-white/2"
            >
              <div className="text-[13px] font-semibold text-white/75 mb-1.5">{item.q}</div>
              <div className="text-[12px] text-white/35 font-light leading-relaxed">{item.a}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
