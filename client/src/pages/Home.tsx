import { useMemo, useState } from "react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileText,
  Filter,
  Instagram,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Menu,
  Play,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Youtube,
  Zap,
} from "lucide-react";

type Persona = "E-commerce founder" | "YouTuber" | "Influencer";
type ReportView = "research" | "reports" | "signals";

type Ad = {
  id: string;
  format: "Video" | "Reel" | "Static";
  hook: string;
  script: string;
  fullScript: string;
  metric: string;
  metricLabel: string;
  theme: string;
  accent: string;
};

type Competitor = {
  id: string;
  rank: number;
  name: string;
  handle: string;
  category: string;
  score: number;
  signal: string;
  signalTone: "violet" | "green" | "amber";
  ads: Ad[];
};

const personas: { label: Persona; description: string; icon: typeof Target }[] = [
  { label: "E-commerce founder", description: "I sell products online", icon: Target },
  { label: "YouTuber", description: "I build an audience", icon: Youtube },
  { label: "Influencer", description: "I partner with brands", icon: Instagram },
];

const competitors: Competitor[] = [
  {
    id: "threadlab",
    rank: 1,
    name: "ThreadLab",
    handle: "@threadlab.co",
    category: "Graphic apparel",
    score: 94,
    signal: "High velocity",
    signalTone: "violet",
    ads: [
      {
        id: "threadlab-1",
        format: "Reel",
        hook: "The tee that starts a conversation.",
        script: "POV: you found the graphic tee your group chat will ask about.",
        fullScript: "POV: you found the graphic tee your group chat will ask about. Printed on heavyweight cotton, made in limited drops, and designed to feel like a reference only your people get. Tap to see this week's drop before it disappears.",
        metric: "4.8x",
        metricLabel: "creative signal",
        theme: "theme-cobalt",
        accent: "#8fa8ff",
      },
      {
        id: "threadlab-2",
        format: "Video",
        hook: "Don't buy another blank tee.",
        script: "A wardrobe reset, starting with the piece you wear on repeat.",
        fullScript: "Don't buy another blank tee. This is the wardrobe reset piece: a soft structured fit, a graphic that does the talking, and enough weight to look better after every wash. One tee, three ways to wear it.",
        metric: "3.9x",
        metricLabel: "creative signal",
        theme: "theme-ink",
        accent: "#d8ff66",
      },
      {
        id: "threadlab-3",
        format: "Static",
        hook: "Limited run. Zero filler.",
        script: "The drop for people who notice the details.",
        fullScript: "Limited run. Zero filler. Each piece is printed in small batches with a hand-feel you can see on screen. If you like clothes with a point of view, this is your sign to choose the one that says it for you.",
        metric: "2.7x",
        metricLabel: "creative signal",
        theme: "theme-coral",
        accent: "#ff9a75",
      },
    ],
  },
  {
    id: "commonfolk",
    rank: 2,
    name: "Commonfolk Supply",
    handle: "@commonfolksupply",
    category: "Everyday essentials",
    score: 90,
    signal: "Repeat winner",
    signalTone: "green",
    ads: [
      {
        id: "commonfolk-1",
        format: "Reel",
        hook: "What if your basics felt like you?",
        script: "The everyday uniform for people allergic to ordinary.",
        fullScript: "What if your basics felt like you? Meet the everyday uniform for people allergic to ordinary: softer fabric, a better shape, and details that reward a second look. Start with the color you always reach for.",
        metric: "4.2x",
        metricLabel: "creative signal",
        theme: "theme-sage",
        accent: "#b5e7d2",
      },
      {
        id: "commonfolk-2",
        format: "Video",
        hook: "Three outfits. One good decision.",
        script: "A simple styling formula built around one strong tee.",
        fullScript: "Three outfits. One good decision. Start with the tee that fits clean, layer it under your favorite overshirt, then let the graphic do less work than you think. This is how to make the most-worn thing in your closet feel new again.",
        metric: "3.6x",
        metricLabel: "creative signal",
        theme: "theme-lilac",
        accent: "#e9d9ff",
      },
      {
        id: "commonfolk-3",
        format: "Static",
        hook: "Made for the repeat wearers.",
        script: "Good clothes are the ones you reach for without thinking.",
        fullScript: "Made for the repeat wearers. We design small collections around the pieces you reach for without thinking: dependable, easy to style, and just different enough to feel like your own uniform.",
        metric: "3.1x",
        metricLabel: "creative signal",
        theme: "theme-sun",
        accent: "#ffd97a",
      },
    ],
  },
  {
    id: "afterhours",
    rank: 3,
    name: "Afterhours Studio",
    handle: "@afterhours.studio",
    category: "Culture-led apparel",
    score: 87,
    signal: "Rising fast",
    signalTone: "amber",
    ads: [
      {
        id: "afterhours-1",
        format: "Reel",
        hook: "For nights that become stories.",
        script: "A graphic tee with a little more after it.",
        fullScript: "For nights that become stories. Afterhours is the graphic tee with a little more after it: a reference, a memory, a tiny signal to the people who were there. Wear the story before you tell it.",
        metric: "3.8x",
        metricLabel: "creative signal",
        theme: "theme-night",
        accent: "#d6c4ff",
      },
      {
        id: "afterhours-2",
        format: "Video",
        hook: "The comment section picked this one.",
        script: "We made the design your audience wouldn't stop asking for.",
        fullScript: "The comment section picked this one. We pulled the most requested design from last month's community thread and turned it into a limited run. You asked, we printed. See the full story behind the graphic.",
        metric: "3.4x",
        metricLabel: "creative signal",
        theme: "theme-pink",
        accent: "#ffb7d8",
      },
      {
        id: "afterhours-3",
        format: "Static",
        hook: "Wear your inside joke.",
        script: "The easiest way to find your people is to give them a signal.",
        fullScript: "Wear your inside joke. The easiest way to find your people is to give them a signal: a tiny reference, a familiar phrase, a tee that makes the right person stop mid-scroll.",
        metric: "2.9x",
        metricLabel: "creative signal",
        theme: "theme-lime",
        accent: "#dfff8c",
      },
    ],
  },
  {
    id: "goodmeasure",
    rank: 4,
    name: "Good Measure Goods",
    handle: "@goodmeasuregoods",
    category: "Premium basics",
    score: 84,
    signal: "Strong hold",
    signalTone: "green",
    ads: [
      {
        id: "goodmeasure-1",
        format: "Video",
        hook: "Your favorite tee, upgraded.",
        script: "The fit test that makes a basic feel considered.",
        fullScript: "Your favorite tee, upgraded. We kept the ease and fixed the parts that usually get in the way: a collar that holds, a hem that lands right, and a shape that works from coffee to late plans.",
        metric: "3.2x",
        metricLabel: "creative signal",
        theme: "theme-stone",
        accent: "#ded6cb",
      },
      {
        id: "goodmeasure-2",
        format: "Reel",
        hook: "Built for the long haul.",
        script: "The quality details hiding in plain sight.",
        fullScript: "Built for the long haul. Zoom in on the details that make a tee feel better for longer: dense cotton, clean seams, and a shape that gets more yours over time.",
        metric: "2.8x",
        metricLabel: "creative signal",
        theme: "theme-ocean",
        accent: "#a6dae8",
      },
      {
        id: "goodmeasure-3",
        format: "Static",
        hook: "Less, but better.",
        script: "A three-piece closet starter for people who hate clutter.",
        fullScript: "Less, but better. Start with three pieces that do more: one everyday tee, one graphic with a point of view, and one layer that makes both work harder.",
        metric: "2.5x",
        metricLabel: "creative signal",
        theme: "theme-cream",
        accent: "#f2e5c5",
      },
    ],
  },
  {
    id: "northstar",
    rank: 5,
    name: "Northstar Club",
    handle: "@northstarclub",
    category: "Community merch",
    score: 81,
    signal: "Consistent",
    signalTone: "violet",
    ads: [
      {
        id: "northstar-1",
        format: "Reel",
        hook: "The club starts with a tee.",
        script: "Merch that feels like a membership, not a logo.",
        fullScript: "The club starts with a tee. We make merch that feels like a membership, not a logo: small signals, shared references, and a reason to start a conversation with someone you have never met.",
        metric: "3.0x",
        metricLabel: "creative signal",
        theme: "theme-purple",
        accent: "#cab6ff",
      },
      {
        id: "northstar-2",
        format: "Static",
        hook: "Find your people in the wild.",
        script: "A wearable signal for the community you are building.",
        fullScript: "Find your people in the wild. This is a wearable signal for the community you are building—designed to be recognized by the right people and easy to wear everywhere else.",
        metric: "2.6x",
        metricLabel: "creative signal",
        theme: "theme-red",
        accent: "#ff9b95",
      },
      {
        id: "northstar-3",
        format: "Video",
        hook: "Made with the group chat.",
        script: "From community poll to your new favorite piece.",
        fullScript: "Made with the group chat. We let the community vote on the color, the phrase, and the final placement. The result is the piece you helped make and will probably end up gifting twice.",
        metric: "2.4x",
        metricLabel: "creative signal",
        theme: "theme-blue",
        accent: "#91c7ff",
      },
    ],
  },
  {
    id: "studioform",
    rank: 6,
    name: "Studio Form",
    handle: "@studioform.co",
    category: "Minimal wardrobe",
    score: 79,
    signal: "Quiet winner",
    signalTone: "green",
    ads: [
      {
        id: "studioform-1",
        format: "Video",
        hook: "A better blank is still a statement.",
        script: "The tee that makes the rest of the outfit easier.",
        fullScript: "A better blank is still a statement. This is the tee that makes the rest of the outfit easier: deliberate proportions, a soft hand-feel, and a silhouette that gives your best layers room to breathe.",
        metric: "2.9x",
        metricLabel: "creative signal",
        theme: "theme-white",
        accent: "#d6d5cf",
      },
      {
        id: "studioform-2",
        format: "Reel",
        hook: "The five-second fit check.",
        script: "If the shoulder lands here, you are already halfway dressed.",
        fullScript: "The five-second fit check. If the shoulder lands here, the sleeve clears your arm, and the hem hits just below the waist, you are already halfway dressed. Save this for your next closet reset.",
        metric: "2.6x",
        metricLabel: "creative signal",
        theme: "theme-green",
        accent: "#b4e9c7",
      },
      {
        id: "studioform-3",
        format: "Static",
        hook: "Designed to disappear into your life.",
        script: "The less you think about getting dressed, the better it works.",
        fullScript: "Designed to disappear into your life. The less you think about getting dressed, the better it works. A foundation piece with enough intention to never feel accidental.",
        metric: "2.2x",
        metricLabel: "creative signal",
        theme: "theme-sand",
        accent: "#f1d8a3",
      },
    ],
  },
  {
    id: "keepsake",
    rank: 7,
    name: "Keepsake Dept.",
    handle: "@keepsakedept",
    category: "Nostalgic graphics",
    score: 76,
    signal: "Story-led",
    signalTone: "amber",
    ads: [
      {
        id: "keepsake-1",
        format: "Reel",
        hook: "Your childhood called.",
        script: "A little nostalgia, printed on heavyweight cotton.",
        fullScript: "Your childhood called. We turned the references you still think about into heavyweight cotton graphics that feel familiar without looking like a costume. Pick the memory you want to keep close.",
        metric: "2.7x",
        metricLabel: "creative signal",
        theme: "theme-orange",
        accent: "#ffbb81",
      },
      {
        id: "keepsake-2",
        format: "Video",
        hook: "Not vintage. Just personal.",
        script: "The graphic tee that feels like it already has a history.",
        fullScript: "Not vintage. Just personal. We build graphics that feel like they already have a history, then print them in small batches so the story stays yours for a little longer.",
        metric: "2.4x",
        metricLabel: "creative signal",
        theme: "theme-brown",
        accent: "#d6ae8c",
      },
      {
        id: "keepsake-3",
        format: "Static",
        hook: "Keep the good parts.",
        script: "A daily reminder of the things worth holding onto.",
        fullScript: "Keep the good parts. This drop is a daily reminder of the places, people, and little rituals worth holding onto. Find the graphic that brings yours back.",
        metric: "2.1x",
        metricLabel: "creative signal",
        theme: "theme-yellow",
        accent: "#ffe18a",
      },
    ],
  },
  {
    id: "formandfield",
    rank: 8,
    name: "Form & Field",
    handle: "@formandfield",
    category: "Outdoor lifestyle",
    score: 73,
    signal: "Niche fit",
    signalTone: "green",
    ads: [
      {
        id: "formandfield-1",
        format: "Video",
        hook: "The day starts outside.",
        script: "A graphic tee for the people who pack light and stay late.",
        fullScript: "The day starts outside. This is the graphic tee for people who pack light, stay late, and want their clothes to keep up without shouting for attention. Built for the trailhead and everything after.",
        metric: "2.5x",
        metricLabel: "creative signal",
        theme: "theme-forest",
        accent: "#b9d5aa",
      },
      {
        id: "formandfield-2",
        format: "Reel",
        hook: "Your weekend uniform, sorted.",
        script: "One tee, two trails, zero overthinking.",
        fullScript: "Your weekend uniform, sorted. One tee, two trails, zero overthinking. We made the layer that handles an early coffee, a long walk, and dinner when the light is too good to go home.",
        metric: "2.2x",
        metricLabel: "creative signal",
        theme: "theme-moss",
        accent: "#d5e8b2",
      },
      {
        id: "formandfield-3",
        format: "Static",
        hook: "Made for the long way around.",
        script: "Clothes for people who leave room for a detour.",
        fullScript: "Made for the long way around. We make clothes for people who leave room for a detour, choose the scenic route, and want a graphic with a story of its own.",
        metric: "1.9x",
        metricLabel: "creative signal",
        theme: "theme-clay",
        accent: "#e3b69f",
      },
    ],
  },
  {
    id: "localstandard",
    rank: 9,
    name: "Local Standard",
    handle: "@localstandard",
    category: "Modern uniform",
    score: 70,
    signal: "Reliable",
    signalTone: "violet",
    ads: [
      {
        id: "localstandard-1",
        format: "Reel",
        hook: "The local favorite, online.",
        script: "A neighborhood point of view you can wear anywhere.",
        fullScript: "The local favorite, online. We started with the references on our block and made a line of tees you can wear anywhere. A neighborhood point of view, printed for the whole city.",
        metric: "2.3x",
        metricLabel: "creative signal",
        theme: "theme-maroon",
        accent: "#e0a5a8",
      },
      {
        id: "localstandard-2",
        format: "Static",
        hook: "Good taste is a group project.",
        script: "The graphic everyone in your circle already understands.",
        fullScript: "Good taste is a group project. We listen to what our community saves, wears, and sends in the group chat, then turn those signals into the graphic everyone already understands.",
        metric: "2.0x",
        metricLabel: "creative signal",
        theme: "theme-pinksoft",
        accent: "#f2c3d3",
      },
      {
        id: "localstandard-3",
        format: "Video",
        hook: "The uniform, made more specific.",
        script: "A daily tee with a point of view built in.",
        fullScript: "The uniform, made more specific. Start with a clean fit, add a graphic that means something to you, and make the daily tee feel like a choice instead of a default.",
        metric: "1.8x",
        metricLabel: "creative signal",
        theme: "theme-slate",
        accent: "#b9c8dd",
      },
    ],
  },
  {
    id: "moodboard",
    rank: 10,
    name: "Moodboard Market",
    handle: "@moodboardmarket",
    category: "Creator merch",
    score: 68,
    signal: "Early signal",
    signalTone: "amber",
    ads: [
      {
        id: "moodboard-1",
        format: "Reel",
        hook: "We made your saved folder wearable.",
        script: "A moodboard-to-merch drop, designed with the community.",
        fullScript: "We made your saved folder wearable. Pulling from the references our community could not stop sharing, this drop turns the moodboard into a piece you can actually live in.",
        metric: "2.1x",
        metricLabel: "creative signal",
        theme: "theme-pastel",
        accent: "#d4bbff",
      },
      {
        id: "moodboard-2",
        format: "Video",
        hook: "Your feed, but in real life.",
        script: "The graphic layer that makes the outfit feel finished.",
        fullScript: "Your feed, but in real life. We took the colors, textures, and tiny references that make your saved posts work and built them into the graphic layer that finishes the outfit.",
        metric: "1.9x",
        metricLabel: "creative signal",
        theme: "theme-mint",
        accent: "#b8e8d7",
      },
      {
        id: "moodboard-3",
        format: "Static",
        hook: "Save less. Wear more.",
        script: "A small drop built from the things you keep coming back to.",
        fullScript: "Save less. Wear more. This is a small drop built from the colors, phrases, and silhouettes you keep coming back to. Pick the one that belongs in your rotation.",
        metric: "1.7x",
        metricLabel: "creative signal",
        theme: "theme-apricot",
        accent: "#ffc9a9",
      },
    ],
  },
];

const hookSynthesis = [
  { rank: "01", title: "Identity before product", note: "Lead with the person the audience becomes when they wear it.", count: "8 / 10 brands" },
  { rank: "02", title: "A specific social signal", note: "Make the creative feel like a secret handshake, not a catalog tile.", count: "7 / 10 brands" },
  { rank: "03", title: "Community as proof", note: "Show the audience choosing, commenting, or recognizing the piece.", count: "6 / 10 brands" },
  { rank: "04", title: "One product, three lives", note: "Demonstrate repeat wear to turn a graphic tee into a habit.", count: "6 / 10 brands" },
  { rank: "05", title: "The detail zoom", note: "Use close-ups to make quality visible in a fast scroll.", count: "5 / 10 brands" },
];

function LogoMark() {
  return (
    <div className="logo-lockup" aria-label="AdIntel">
      <div className="logo-mark">A<span>/</span></div>
      <div className="logo-wordmark">adintel</div>
    </div>
  );
}

function SignalBadge({ tone, children }: { tone: Competitor["signalTone"]; children: React.ReactNode }) {
  return <span className={`signal-badge signal-${tone}`}>{children}</span>;
}

function CreativePreview({ ad }: { ad: Ad }) {
  return (
    <div className={`creative-preview ${ad.theme}`}>
      <div className="preview-topline">
        <span className="preview-format"><span className="preview-dot" /> {ad.format}</span>
        <span className="preview-spark">✦</span>
      </div>
      <div className="preview-art">
        <div className="preview-ring" />
        <div className="preview-shirt">
          <span>YOUR<br />SIGNAL</span>
        </div>
        <div className="preview-copy">{ad.hook}</div>
      </div>
      <div className="preview-footer"><span>ADINTEL / CREATIVE SIGNAL</span><span>↗</span></div>
    </div>
  );
}

function AdCard({ ad, expanded, onToggle }: { ad: Ad; expanded: boolean; onToggle: () => void }) {
  return (
    <article className={`ad-card ${expanded ? "is-expanded" : ""}`}>
      <CreativePreview ad={ad} />
      <div className="ad-card-body">
        <div className="ad-meta-row">
          <span className="mono-label">{ad.format.toUpperCase()} / INSIGHT</span>
          <span className="metric-value"><TrendingUp size={13} /> {ad.metric}</span>
        </div>
        <h3>{ad.hook}</h3>
        <button className="script-toggle" onClick={onToggle} aria-expanded={expanded}>
          <span className="script-icon"><FileText size={13} /></span>
          <span className="script-label">{expanded ? "Hide script" : "View full script"}</span>
          <ChevronDown size={15} className={`chevron ${expanded ? "rotated" : ""}`} />
        </button>
        <div className={`script-copy ${expanded ? "open" : ""}`}>
          <p>{expanded ? ad.fullScript : ad.script}</p>
        </div>
      </div>
    </article>
  );
}

function Onboarding({
  persona,
  setPersona,
  website,
  setWebsite,
  niche,
  setNiche,
  onGenerate,
  isRunning,
  onLogin,
  loggedIn,
}: {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  website: string;
  setWebsite: (website: string) => void;
  niche: string;
  setNiche: (niche: string) => void;
  onGenerate: () => void;
  isRunning: boolean;
  onLogin: () => void;
  loggedIn: boolean;
}) {
  return (
    <div className="onboarding-page">
      <div className="onboarding-intro">
        <div className="eyebrow"><span className="eyebrow-line" /> CREATIVE INTELLIGENCE FOR THE NEXT BRIEF</div>
        <h1>See what your category is already rewarding.</h1>
        <p className="intro-copy">AdIntel finds the creative patterns your competitors are repeating, then turns the signal into a brief your team can actually use.</p>
        <div className="intro-proof">
          <div className="proof-avatars"><span>MC</span><span>RK</span><span>AL</span><span>+</span></div>
          <p>Built for lean teams that would rather ship the next winner than fund another guessing game.</p>
        </div>
        <div className="source-note">
          <ShieldCheck size={16} />
          <span>Research stays compliant: official APIs, permitted providers, and assets you authorize.</span>
        </div>
      </div>

      <div className="setup-card">
        <div className="setup-card-header">
          <div>
            <span className="mono-label">01 / SET YOUR LENS</span>
            <h2>Tell us what you are building.</h2>
          </div>
          <span className="step-count">1 of 2</span>
        </div>
        <div className="form-block">
          <label>Which best describes you?</label>
          <div className="persona-grid">
            {personas.map(item => {
              const Icon = item.icon;
              const selected = persona === item.label;
              return (
                <button key={item.label} className={`persona-option ${selected ? "selected" : ""}`} onClick={() => setPersona(item.label)} aria-pressed={selected}>
                  <span className="persona-icon"><Icon size={17} /></span>
                  <span className="persona-text"><strong>{item.label}</strong><small>{item.description}</small></span>
                  <span className="radio-dot">{selected ? <Check size={12} /> : null}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-block two-col">
          <div>
            <label htmlFor="website">Your website</label>
            <div className="input-shell"><Link2 size={15} /><input id="website" value={website} onChange={event => setWebsite(event.target.value)} placeholder="yourbrand.com" /></div>
          </div>
          <div>
            <label htmlFor="niche">Niche / product</label>
            <div className="input-shell"><Target size={15} /><input id="niche" value={niche} onChange={event => setNiche(event.target.value)} placeholder="Printed t-shirts" /></div>
          </div>
        </div>
        <div className="setup-card-footer">
          <div className="auth-note"><LockKeyhole size={14} /><span>{loggedIn ? "Workspace connected" : "Sign in to save reports"}</span>{!loggedIn && <button onClick={onLogin}>Sign in</button>}</div>
          <button className="primary-button" onClick={onGenerate} disabled={isRunning || !website.trim() || !niche.trim()}>
            {isRunning ? <><LoaderCircle size={16} className="spin" /> Scanning signals</> : <>Generate my report <ArrowRight size={16} /></>}
          </button>
        </div>
        <div className="price-note"><Zap size={13} /> One generation is planned at <strong>$1</strong> — demo mode is free while billing is connected.</div>
      </div>
    </div>
  );
}

function Report({
  niche,
  website,
  selectedId,
  setSelectedId,
  saved,
  setSaved,
  onBack,
}: {
  niche: string;
  website: string;
  selectedId: string;
  setSelectedId: (id: string) => void;
  saved: boolean;
  setSaved: (saved: boolean) => void;
  onBack: () => void;
}) {
  const [expandedAd, setExpandedAd] = useState<string | null>(competitors[0].ads[0].id);
  const selected = competitors.find(competitor => competitor.id === selectedId) ?? competitors[0];
  const totalAds = competitors.length * 3;

  return (
    <div className="report-page">
      <div className="report-heading-row">
        <div className="report-heading-left">
          <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> New research</button>
          <div className="report-title-row"><h1>{niche || "Category"} / competitor signal</h1><span className="demo-badge"><span /> DEMO DATA</span></div>
          <p className="report-subtitle">A pattern report for <strong>{website || "your brand"}</strong> · generated just now</p>
        </div>
        <div className="report-actions"><button className={`outline-button ${saved ? "saved" : ""}`} onClick={() => setSaved(!saved)}>{saved ? <Check size={15} /> : <Bookmark size={15} />} {saved ? "Saved" : "Save report"}</button><button className="primary-button compact"><Sparkles size={15} /> Generate brief <span className="price-chip">$1</span></button></div>
      </div>

      <div className="report-summary">
        <div className="summary-cell"><span className="summary-icon violet"><Search size={16} /></span><span><small>COMPETITORS MAPPED</small><strong>10</strong></span><em>from the category</em></div>
        <div className="summary-cell"><span className="summary-icon green"><BarChart3 size={16} /></span><span><small>CREATIVES REVIEWED</small><strong>{totalAds}</strong></span><em>across formats</em></div>
        <div className="summary-cell"><span className="summary-icon amber"><TrendingUp size={16} /></span><span><small>TOP SIGNAL</small><strong>Identity</strong></span><em>beats discounting</em></div>
      </div>

      <section className="competitor-strip-section">
        <div className="section-heading"><div><span className="mono-label">02 / COMPETITOR MAP</span><h2>Who is earning attention in {niche.toLowerCase() || "your niche"}?</h2></div><button className="filter-button"><Filter size={14} /> Filter <ChevronDown size={14} /></button></div>
        <div className="competitor-strip">
          {competitors.map(competitor => <button key={competitor.id} className={`competitor-chip ${selected.id === competitor.id ? "selected" : ""}`} onClick={() => { setSelectedId(competitor.id); setExpandedAd(competitor.ads[0].id); }}><span className="rank-badge">{String(competitor.rank).padStart(2, "0")}</span><span className="chip-copy"><strong>{competitor.name}</strong><small>{competitor.category}</small></span><SignalBadge tone={competitor.signalTone}>{competitor.score}</SignalBadge></button>)}
        </div>
      </section>

      <div className="report-main-grid">
        <section className="creative-section">
          <div className="section-heading creative-heading"><div><span className="mono-label">03 / CREATIVE EVIDENCE</span><h2><span className="selected-rank">0{selected.rank}</span> {selected.name}</h2><p>{selected.handle} · {selected.category} · <SignalBadge tone={selected.signalTone}>{selected.signal}</SignalBadge></p></div><a href="#" onClick={event => event.preventDefault()} className="external-link">View profile <ExternalLink size={13} /></a></div>
          <div className="ad-grid">{selected.ads.map(ad => <AdCard key={ad.id} ad={ad} expanded={expandedAd === ad.id} onToggle={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)} />)}</div>
          <div className="source-caption"><ShieldCheck size={14} /><span>Performance context is directional and based on available compliant signals — not claimed platform spend or conversion data.</span></div>
        </section>

        <aside className="insights-column">
          <div className="insight-panel synthesis-panel">
            <div className="panel-kicker"><span className="panel-icon"><Sparkles size={14} /></span><span className="mono-label">SIGNAL SYNTHESIS</span></div>
            <h2>The patterns worth borrowing.</h2>
            <p className="panel-intro">Across the top 10, these hooks show up most often. Borrow the pattern, not the pixels.</p>
            <div className="hook-list">{hookSynthesis.map(item => <div className="hook-item" key={item.rank}><span className="hook-rank">{item.rank}</span><div><strong>{item.title}</strong><p>{item.note}</p><small>{item.count}</small></div></div>)}</div>
            <button className="full-width-button">Turn signals into a brief <ArrowRight size={15} /></button>
            <div className="brief-price"><span>Single generation</span><strong>$1</strong></div>
          </div>
          <div className="insight-panel compliance-panel"><div className="panel-kicker"><span className="panel-icon soft"><ShieldCheck size={14} /></span><span className="mono-label">DATA ACCESS NOTE</span></div><h3>Designed for compliant research.</h3><p>Directly scraping the Ads Library or Instagram can be unreliable and may violate platform terms. Connect official APIs, a permitted provider, or assets you authorize to move from demo signals to live research.</p><button className="text-button">See integration paths <ArrowRight size={14} /></button></div>
          <div className="mini-status"><div className="status-dot" /><div><strong>Report ready</strong><span>Last checked just now</span></div><Clock3 size={14} /></div>
        </aside>
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [persona, setPersona] = useState<Persona>("E-commerce founder");
  const [website, setWebsite] = useState("northstarapparel.com");
  const [niche, setNiche] = useState("Printed t-shirts");
  const [isRunning, setIsRunning] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [activeView, setActiveView] = useState<ReportView>("research");
  const [selectedId, setSelectedId] = useState("threadlab");
  const [saved, setSaved] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const currentLabel = useMemo(() => activeView === "research" ? "Research" : activeView === "reports" ? "Saved reports" : "Signal library", [activeView]);

  const generateReport = () => {
    setIsRunning(true);
    window.setTimeout(() => { setIsRunning(false); setReportGenerated(true); }, 900);
  };

  const handleLogin = () => {
    try { startLogin(); } catch { setLoginError(true); window.setTimeout(() => setLoginError(false), 3500); }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top"><LogoMark /><button className="sidebar-toggle" aria-label="Collapse navigation"><Menu size={16} /></button></div>
        <div className="workspace-label"><span className="mono-label">WORKSPACE</span><span className="workspace-dot" /> <span>Demo workspace</span></div>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={`side-nav-item ${activeView === "research" ? "active" : ""}`} onClick={() => { setActiveView("research"); setReportGenerated(false); }}><LayoutDashboard size={17} /><span>Research</span><span className="nav-key">⌘ 1</span></button>
          <button className={`side-nav-item ${activeView === "reports" ? "active" : ""}`} onClick={() => setActiveView("reports")}><Bookmark size={17} /><span>Saved reports</span><span className="nav-count">{saved ? "1" : "0"}</span></button>
          <button className={`side-nav-item ${activeView === "signals" ? "active" : ""}`} onClick={() => setActiveView("signals")}><Sparkles size={17} /><span>Signal library</span></button>
        </nav>
        <div className="side-divider" />
        <div className="side-section-title"><span className="mono-label">CONNECT SOURCES</span><Settings2 size={14} /></div>
        <button className="side-source"><span className="source-logo meta-logo">M</span><span><strong>Meta / Instagram</strong><small>Not connected</small></span><span className="connect-plus">+</span></button>
        <button className="side-source"><span className="source-logo shopify-logo">S</span><span><strong>Shopify store</strong><small>Optional</small></span><span className="connect-plus">+</span></button>
        <div className="sidebar-bottom"><div className="help-link"><CircleHelp size={15} /><span>How AdIntel works</span></div><div className="profile-row"><div className="profile-avatar">{user?.name?.slice(0, 2).toUpperCase() || "G"}</div><div className="profile-copy"><strong>{user?.name || "Guest researcher"}</strong><small>{user?.email || "Demo mode"}</small></div><ArrowRight size={14} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="mobile-brand"><LogoMark /></div><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{currentLabel}</strong></div><div className="topbar-actions"><span className="privacy-pill"><ShieldCheck size={13} /> Compliant by design</span>{user ? <div className="signed-in"><span className="signed-in-dot" /> {user.name || "Signed in"}</div> : <button className="top-login" onClick={handleLogin}><LockKeyhole size={14} /> Sign in</button>}<button className="help-button" aria-label="Help"><CircleHelp size={17} /></button></div></header>
        {loginError && <div className="toast-message"><ShieldCheck size={15} /> Login is ready for the published app; Preview configuration is not available in this tab.</div>}
        {!reportGenerated ? <Onboarding persona={persona} setPersona={setPersona} website={website} setWebsite={setWebsite} niche={niche} setNiche={setNiche} onGenerate={generateReport} isRunning={isRunning} onLogin={handleLogin} loggedIn={Boolean(user)} /> : <Report niche={niche} website={website} selectedId={selectedId} setSelectedId={setSelectedId} saved={saved} setSaved={setSaved} onBack={() => setReportGenerated(false)} />}
        <footer className="app-footer"><span>AdIntel v0.1 · seeded demo workspace</span><span>Signals are directional, not a guarantee of performance.</span></footer>
      </main>
    </div>
  );
}
