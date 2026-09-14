import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  ChevronRight,
  CircleGauge,
  Download,
  FolderOpen,
  Gauge,
  Guitar,
  Headphones,
  Keyboard,
  Menu,
  Minus,
  MousePointer2,
  Music2,
  Pause,
  Piano,
  Play,
  Plus,
  Repeat2,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TimerReset,
  Volume2,
  Waves,
  Zap,
} from "lucide-react";

import { AppWindow } from "@/components/app-window";
import { LoopPlayerMark } from "@/components/loop-player-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PRODUCT_VERSION, WINDOWS_DOWNLOAD_URL } from "@/lib/product";

const description =
  "Loop Player is a Windows desktop app for musicians. Play loops and backing tracks, adjust BPM precisely, change pitch, and loop continuously without the complexity of a DAW.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loop Player — Loop & Backing Track Player for Windows" },
      { name: "description", content: description },
      { property: "og:title", content: "Loop Player — Your loops. Your tempo. Your sound." },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Loop Player",
          operatingSystem: "Windows",
          applicationCategory: "MultimediaApplication",
          description,
        }),
      },
    ],
  }),
  component: Index,
});

const nav = [
  ["Features", "features"],
  ["How It Works", "workflow"],
  ["For Musicians", "musicians"],
  ["FAQ", "faq"],
] as const;

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const download = () => {
    if (WINDOWS_DOWNLOAD_URL) window.location.href = WINDOWS_DOWNLOAD_URL;
    else {
      setNotice(true);
      window.setTimeout(() => setNotice(false), 4000);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border bg-background/90 shadow-nav backdrop-blur-xl" : "border-transparent bg-transparent"}`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8"
        >
          <a href="#top" aria-label="Loop Player home">
            <LoopPlayerMark />
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="hidden justify-end lg:flex">
            <Button variant="hero" onClick={download}>
              <Download />
              Download for Windows
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="dark" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-border bg-background">
              <SheetTitle className="mb-10">
                <LoopPlayerMark />
              </SheetTitle>
              <div className="flex flex-col gap-1">
                {nav.map(([label, href]) => (
                  <SheetClose asChild key={href}>
                    <a
                      href={`#${href}`}
                      className="border-b border-border py-4 text-base font-semibold"
                    >
                      {label}
                    </a>
                  </SheetClose>
                ))}
              </div>
              <Button variant="hero" size="xl" className="mt-8 w-full" onClick={download}>
                <Download />
                Download for Windows
              </Button>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main id="top">
        <section className="relative min-h-[920px] overflow-hidden border-b border-border pt-32 sm:pt-40">
          <div className="hero-grid absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <Eyebrow>Loop Player · Windows</Eyebrow>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] sm:text-7xl lg:text-[5.6rem]">
                Play the loop.
                <br />
                <span className="text-primary">Control the tempo.</span>
                <br />
                Stay in the groove.
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                A dedicated Windows player for musicians who need to play loops and backing tracks,
                change tempo instantly, and keep performing without complicated software.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="hero" size="xl" onClick={download}>
                  <Download />
                  Download for Windows
                </Button>
                <Button variant="dark" size="xl" asChild>
                  <a href="#workflow">
                    <Play />
                    See How It Works
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
                Windows · Standalone desktop app · Version {PRODUCT_VERSION}
              </p>
            </div>
            <div className="relative z-10 mx-auto mt-16 max-w-5xl animate-float">
              <AppWindow />
            </div>
          </div>
        </section>

        <Section
          id="workflow"
          eyebrow="The workflow"
          title="A player built around the way musicians actually work."
          intro="Your loops already live in folders. Loop Player works with that reality instead of forcing you into another complicated library system."
        >
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            <StepCard n="01" icon={<FolderOpen />} title="Add a folder">
              Point Loop Player at your loops folder.
            </StepCard>
            <StepCard n="02" icon={<Search />} title="Pick a track">
              Browse the entire library and choose what you need.
            </StepCard>
            <StepCard n="03" icon={<Play />} title="Play & perform">
              Adjust tempo, loop continuously, and stay focused.
            </StepCard>
          </div>
        </Section>

        <section className="border-y border-border bg-surface py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8">
            <div>
              <Eyebrow>Less setup. More music.</Eyebrow>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-bold sm:text-5xl">
                Your loop shouldn't require a whole production setup.
              </h2>
              <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
                Opening a full DAW, importing tracks one by one, and digging through folders breaks
                the moment. Generic media players don't understand a musician's workflow.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Open a full DAW",
                "Import tracks manually",
                "Fight awkward tempo controls",
                "Lose focus while performing",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-md border border-border bg-background p-5"
                >
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  <span className="text-sm text-muted-foreground line-through decoration-destructive/60">
                    {item}
                  </span>
                </div>
              ))}
              <div className="col-span-full mt-3 rounded-md border border-primary/30 bg-primary/8 p-6 text-lg font-semibold text-foreground">
                Open your folder. Find your track. Set your tempo.{" "}
                <span className="text-primary">Play.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative overflow-hidden py-24 sm:py-32">
          <div className="tempo-lines absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <Eyebrow>Hero feature</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-bold sm:text-6xl">
                  Tempo control that thinks like a musician.
                </h2>
                <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                  Need 101 BPM instead of 100? Want to jump from 100 to 110? Get precise control
                  without fighting a slider.
                </p>
              </div>
              <TempoDemo />
            </div>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Fine control|Change one BPM at a time.",
                "Fast control|Jump by ten when needed.",
                "Direct entry|Type the exact BPM.",
                "Keyboard control|Stay off the mouse.",
                "Live adjustment|Music keeps playing.",
              ].map((x) => {
                const [a, b] = x.split("|");
                return (
                  <div key={a} className="border-t border-border pt-5">
                    <p className="text-sm font-semibold">{a}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{b}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <Eyebrow>Independent pitch</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
                Change the tempo without losing the key.
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                Tempo and pitch don't have to move together. Slow down a track for practice without
                automatically turning it into a lower-pitched version. Shift pitch deliberately only
                when you want to.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6 sm:p-9">
              <ControlReadout label="Tempo" from="100 BPM" value="120 BPM" emphasis />
              <ControlReadout label="Pitch" from="−12" value="0 semitones" end="+12" />
            </div>
          </div>
        </section>

        <Section
          eyebrow="Six simple steps"
          title="From folder to performance in seconds."
          intro="A direct path from the files already on your computer to music in the room."
        >
          <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Add your folder", "Select the folder containing your loops."],
              ["Browse your library", "Scan the folder and its subfolders."],
              ["Choose your loop", "Select a track from the library."],
              ["Set your tempo", "Use ±1, ±10, keys, wheel, or direct entry."],
              ["Press play", "The track starts immediately."],
              ["Keep looping", "Turn on Loop and stay in the groove."],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="group border-l border-border pl-5 transition-colors hover:border-primary"
              >
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className="border-y border-border bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Eyebrow>Focused by design</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
              Everything you need.
              <br />
              <span className="text-muted-foreground">Nothing you don't.</span>
            </h2>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="group bg-background p-7 transition-colors hover:bg-accent"
                >
                  <Icon className="size-5 text-primary" />
                  <h3 className="mt-8 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Section
          eyebrow="Keyboard first"
          title="Keep your hands on the instrument."
          intro="Designed for moments when reaching for a mouse isn't practical."
        >
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {shortcuts.map(([keys, action]) => (
              <div
                key={action}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center bg-background px-5 py-4"
              >
                <span className="text-sm text-muted-foreground">{action}</span>
                <div className="flex gap-1">
                  {keys.map((k) => (
                    <kbd
                      key={k}
                      className="min-w-8 rounded border border-border bg-surface px-2 py-1 text-center font-mono text-[10px] text-foreground shadow-key"
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <section id="musicians" className="border-y border-border bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Eyebrow>For musicians</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
              Built for the moments musicians actually need it.
            </h2>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {useCases.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="group relative min-h-60 overflow-hidden rounded-lg border border-border bg-background p-7"
                >
                  <div className="absolute -bottom-10 -right-4 font-display text-[8rem] font-extrabold text-surface-strong transition-transform group-hover:-translate-y-2">
                    {title.slice(0, 1)}
                  </div>
                  <Icon className="size-6 text-primary" />
                  <h3 className="relative mt-16 text-2xl font-semibold">{title}</h3>
                  <p className="relative mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Section
          eyebrow="The desktop experience"
          title="A focused workspace for your loops."
          intro="Your library, waveform, transport, tempo, loop, and pitch controls—clear at a glance."
        >
          <div className="mt-16">
            <AppWindow annotated />
          </div>
        </Section>

        <section className="border-y border-border bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Purpose built</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
                You don't need a DAW to play a loop.
              </h2>
              <p className="mt-6 leading-7 text-muted-foreground">
                Loop Player isn't trying to replace your DAW or become a studio. It is a focused
                tool for one specific job: playing your loops exactly how you need them.
              </p>
            </div>
            <div className="mt-14 grid overflow-hidden rounded-lg border border-border lg:grid-cols-2">
              <Comparison
                title="Full DAW"
                muted
                items={[
                  "Complex setup",
                  "Tracks and plugins",
                  "Routing and mixing",
                  "Editing and projects",
                ]}
              />
              <Comparison
                title="Loop Player"
                items={["Choose folder", "Choose loop", "Set BPM", "Play and loop"]}
              />
            </div>
          </div>
        </section>

        <Section
          eyebrow="Performance ready"
          title="Made to stay out of your way."
          intro="When you're rehearsing or performing, the last thing you need is software getting in the way."
        >
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Standalone Windows app",
              "No browser required",
              "No extra runtimes",
              "No manual importing",
              "Native folder picker",
              "Friendly error handling",
              "Persistent settings",
              "Focused playback",
            ].map((x) => (
              <div key={x} className="flex items-center gap-3 border-b border-border py-4 text-sm">
                <Check className="size-4 text-success" />
                {x}
              </div>
            ))}
          </div>
        </Section>

        <section className="border-y border-border bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <Eyebrow>Quick installation</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
              Download it. Install it. Play.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">
              Loop Player ships as a standalone Windows application. Install it once and it's ready
              to use.
            </p>
            <div className="my-14 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Download"],
                ["02", "Install"],
                ["03", "Open your loops"],
              ].map(([n, t]) => (
                <div key={n} className="rounded-md border border-border bg-background p-7">
                  <span className="font-mono text-xs text-primary">{n}</span>
                  <p className="mt-5 font-semibold">{t}</p>
                </div>
              ))}
            </div>
            <Button variant="hero" size="xl" onClick={download}>
              <Download />
              Download Loop Player for Windows
            </Button>
            <p className="mt-4 text-xs text-subtle">Windows desktop · Version {PRODUCT_VERSION}</p>
          </div>
        </section>

        <section id="faq" className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.65fr_1fr] lg:px-8">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
                Before you press play.
              </h2>
            </div>
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`q-${i}`}>
                  <AccordionTrigger className="py-6 text-base hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-primary/20 bg-primary-deep py-24 sm:py-32">
          <div className="wave-bg absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-4xl px-5 text-center">
            <AudioLines className="mx-auto size-8 text-primary" />
            <h2 className="mt-6 font-display text-5xl font-extrabold sm:text-7xl">
              Your loops are ready.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">
              Stop opening a full production setup just to play a loop. Choose your folder. Set your
              tempo. Press play.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="hero" size="xl" onClick={download}>
                <Download />
                Download for Windows
              </Button>
              <Button variant="dark" size="xl" asChild>
                <a href="#features">
                  Explore Features
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 border-b border-border pb-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
            <div>
              <LoopPlayerMark />
              <p className="mt-5 max-w-xs text-sm text-muted-foreground">
                Your loops. Your tempo. Your sound.
              </p>
            </div>
            <FooterGroup
              title="Product"
              links={[
                ["Features", "#features"],
                ["How It Works", "#workflow"],
                ["Download", "#top"],
                ["FAQ", "#faq"],
              ]}
            />
            <FooterGroup
              title="Resources"
              links={[
                ["Keyboard Shortcuts", "#features"],
                ["For Musicians", "#musicians"],
              ]}
            />
            <FooterGroup
              title="Legal"
              links={[
                ["Privacy", "#"],
                ["Terms", "#"],
              ]}
            />
          </div>
          <p className="pt-7 text-xs text-subtle">© 2026 Loop Player. All rights reserved.</p>
        </div>
      </footer>
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-md border border-primary/30 bg-surface-strong px-5 py-4 text-center text-sm shadow-app"
        >
          The Windows installer is being prepared. Check back soon.
        </div>
      )}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
          <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">{intro}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
      <span className="h-px w-7 bg-primary" />
      {children}
    </p>
  );
}
function StepCard({
  n,
  icon,
  title,
  children,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-background p-7 sm:p-9">
      <span className="absolute right-5 top-5 font-mono text-[10px] text-subtle">{n}</span>
      <span className="text-primary [&_svg]:size-5">{icon}</span>
      <h3 className="mt-12 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  );
}
function TempoDemo() {
  const [bpm, setBpm] = useState(100);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const values = [100, 101, 110, 120];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % values.length;
      setBpm(values[i] ?? 100);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="rounded-lg border border-primary/25 bg-surface p-5 shadow-blue sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Live tempo
        </span>
        <span className="flex items-center gap-2 text-[10px] text-success">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          PLAYING
        </span>
      </div>
      <div className="flex items-end justify-center">
        <span
          key={bpm}
          className="animate-number font-mono text-7xl font-bold text-primary sm:text-9xl"
        >
          {bpm}
        </span>
        <span className="mb-3 ml-2 text-xs text-muted-foreground sm:mb-5">BPM</span>
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <Button variant="dark" size="sm" onClick={() => setBpm((v) => Math.max(40, v - 10))}>
          −10
        </Button>
        <Button variant="dark" size="icon" onClick={() => setBpm((v) => Math.max(40, v - 1))}>
          <Minus />
        </Button>
        <Button
          variant="hero"
          size="icon"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="dark" size="icon" onClick={() => setBpm((v) => Math.min(240, v + 1))}>
          <Plus />
        </Button>
        <Button variant="dark" size="sm" onClick={() => setBpm((v) => Math.min(240, v + 10))}>
          +10
        </Button>
      </div>
      <div className="mt-9 flex h-14 items-center gap-1 overflow-hidden">
        {Array.from({ length: 42 }, (_, i) => (
          <span
            key={i}
            className={`tempo-wave flex-1 rounded-full ${i < 22 ? "bg-primary" : "bg-wave"}`}
            style={{
              height: `${22 + ((i * 17) % 70)}%`,
              animationDelay: `${i * -35}ms`,
              animationPlayState: playing ? "running" : "paused",
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between font-mono text-[9px] text-subtle">
        <span>100</span>
        <ArrowRight className="size-3" />
        <span>101</span>
        <ArrowRight className="size-3" />
        <span>110</span>
        <ArrowRight className="size-3" />
        <span>120 BPM</span>
      </div>
    </div>
  );
}
function ControlReadout({
  label,
  from,
  value,
  end,
  emphasis = false,
}: {
  label: string;
  from: string;
  value: string;
  end?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-6 last:border-0">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p
          className={
            emphasis
              ? "mt-2 font-mono text-xl text-primary"
              : "mt-2 font-mono text-xl text-foreground"
          }
        >
          {from} <span className="mx-2 text-subtle">-&gt;</span> {value}
        </p>
      </div>
      {end && <span className="font-mono text-xs text-subtle">{end}</span>}
    </div>
  );
}
function Comparison({
  title,
  items,
  muted = false,
}: {
  title: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <div className={muted ? "p-7 sm:p-10 bg-background" : "p-7 sm:p-10 bg-primary/8"}>
      <p
        className={
          muted
            ? "text-xl font-semibold text-muted-foreground"
            : "text-xl font-semibold text-primary"
        }
      >
        {title}
      </p>
      <ul className="mt-8 space-y-4">
        {items.map((x) => (
          <li key={x} className="flex items-center gap-3 text-sm text-muted-foreground">
            {muted ? (
              <Minus className="size-4 text-subtle" />
            ) : (
              <Check className="size-4 text-primary" />
            )}
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}
function FooterGroup({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[.14em]">{title}</p>
      <div className="mt-5 flex flex-col gap-3">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="text-sm text-muted-foreground hover:text-primary">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    icon: FolderOpen,
    title: "Folder-Based Library",
    copy: "Work directly with the folders you already use.",
  },
  { icon: Zap, title: "Instant Playback", copy: "Play and pause loops without unnecessary setup." },
  {
    icon: Gauge,
    title: "Precision Tempo",
    copy: "Adjust BPM from 40–240 with fine and coarse control.",
  },
  {
    icon: SlidersHorizontal,
    title: "Pitch Control",
    copy: "Move pitch from −12 to +12 semitones.",
  },
  {
    icon: Repeat2,
    title: "Continuous Looping",
    copy: "Keep a track repeating for practice or performance.",
  },
  {
    icon: MousePointer2,
    title: "Seek Anywhere",
    copy: "Click, drag, or use keys to move through a track.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    copy: "Control the player without leaving your instrument.",
  },
  {
    icon: RotateCcw,
    title: "Persistent Settings",
    copy: "Keep useful playback preferences between sessions.",
  },
  { icon: ShieldCheck, title: "Native Windows App", copy: "A real installed desktop application." },
];
const shortcuts: [string[], string][] = [
  [["Space"], "Play / Pause"],
  [["R"], "Restart"],
  [["S"], "Stop"],
  [["L"], "Toggle Loop"],
  [["↑", "↓"], "Tempo ±1"],
  [["Shift", "↑ / ↓"], "Tempo ±10"],
  [["←", "→"], "Seek 5 seconds"],
  [["[", "]"], "Previous / Next Loop"],
];
const useCases = [
  {
    icon: Piano,
    title: "Worship",
    copy: "Keep pads, backing tracks, and instrumental loops moving during rehearsal or live ministry.",
  },
  {
    icon: Guitar,
    title: "Practice",
    copy: "Slow down difficult material, find the right tempo, and repeat until it feels natural.",
  },
  {
    icon: Headphones,
    title: "Rehearsal",
    copy: "Quickly move between tracks without opening a full production environment.",
  },
  {
    icon: Music2,
    title: "Performance",
    copy: "Keep playback focused, predictable, and easy to control.",
  },
];
const faqs = [
  ["Is Loop Player a website?", "No. Loop Player is a standalone Windows desktop application."],
  [
    "Do I need Node.js or Python?",
    "No. The packaged application includes everything required to run it.",
  ],
  [
    "Do I need to import my loops?",
    "No. Choose a folder and Loop Player scans it and its subfolders.",
  ],
  [
    "Can I change BPM while the loop is playing?",
    "Yes. Tempo adjustments are applied during playback.",
  ],
  [
    "Can I change BPM by one step?",
    "Yes. Adjust by ±1 BPM or ±10 BPM, enter a BPM manually, or use keyboard controls.",
  ],
  [
    "Does changing tempo change pitch?",
    "Tempo-only changes preserve pitch. Pitch can also be adjusted independently.",
  ],
  [
    "Can I use keyboard shortcuts?",
    "Yes. Playback, looping, seeking, and tempo controls can be operated from the keyboard.",
  ],
  [
    "What operating system does it support?",
    "Loop Player is currently designed for Windows desktop.",
  ],
  [
    "Can I use it for worship and live performance?",
    "Yes. The workflow suits musicians using loops, pads, backing tracks, and practice tracks.",
  ],
] as const;
