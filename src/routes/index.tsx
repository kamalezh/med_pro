import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Activity, Stethoscope, HeartPulse, Users, Calendar, Shield, Tent, ArrowRight,
  Star, PhoneCall, Mail, MapPin, Baby, Brain, Eye, Bone, Sparkles, CheckCircle2,
  Moon, Sun,
} from "lucide-react";
import { camps, doctors, testimonials, faqs } from "@/mock/data";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediCamp — Enterprise Medical Camp Management" },
      { name: "description", content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations." },
      { property: "og:title", content: "MediCamp — Enterprise Medical Camp Management" },
      { property: "og:description", content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations." },
    ],
  }),
  component: Landing,
});

const services = [
  { icon: Stethoscope, title: "Doctor Consultations", desc: "Book with specialists across every department, in-clinic or at camps." },
  { icon: Tent, title: "Medical Camps", desc: "Discover, register and manage large-scale community health drives." },
  { icon: HeartPulse, title: "Preventive Screenings", desc: "Cardiac, diabetic, vision, dental — all screenings under one roof." },
  { icon: Shield, title: "Vaccinations & Care", desc: "Complete immunization, wellness checks and follow-up plans." },
];
const departments = [
  { icon: HeartPulse, name: "Cardiology" }, { icon: Brain, name: "Neurology" },
  { icon: Bone, name: "Orthopedics" }, { icon: Baby, name: "Pediatrics" },
  { icon: Eye, name: "Ophthalmology" }, { icon: Sparkles, name: "Dermatology" },
];
const stats = [
  { v: "120K+", l: "Patients Cared" },
  { v: "850+", l: "Doctors Onboard" },
  { v: "320", l: "Camps Organized" },
  { v: "45", l: "Cities Served" },
];

function Landing() {
  const { theme, toggleTheme } = useApp();
  const upcoming = camps.filter(c => c.status === "Upcoming").slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">MediCamp</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#departments" className="hover:text-foreground">Departments</a>
            <a href="#doctors" className="hover:text-foreground">Doctors</a>
            <a href="#camps" className="hover:text-foreground">Camps</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Link to="/login"><Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button></Link>
            <Link to="/login"><Button className="gradient-primary text-white shadow-soft">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mesh-bg">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-32">
          <div className="animate-fade-in-up">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Trusted by 320+ care organizations
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Healthcare, <span className="gradient-text">orchestrated.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              MediCamp unifies medical camp operations, hospital appointments, doctor consultations and patient records in one enterprise-grade platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login"><Button size="lg" className="gradient-primary text-white shadow-soft">Launch dashboard <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <a href="#services"><Button size="lg" variant="outline">Explore services</Button></a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(s => (
                <div key={s.l} className="glass rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold gradient-text">{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass relative rounded-3xl p-6 shadow-card animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Today</p>
                  <p className="text-lg font-semibold">Cardiology Camp</p>
                </div>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">Live</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-primary/10 p-3"><p className="text-2xl font-bold">42</p><p className="text-[10px] text-muted-foreground">In queue</p></div>
                <div className="rounded-xl bg-secondary/20 p-3"><p className="text-2xl font-bold">128</p><p className="text-[10px] text-muted-foreground">Seen today</p></div>
                <div className="rounded-xl bg-accent p-3"><p className="text-2xl font-bold">6</p><p className="text-[10px] text-muted-foreground">Doctors</p></div>
              </div>
              <div className="mt-4 space-y-2">
                {["Sarah Johnson · Token 12","John Smith · Token 13","Emma Wilson · Token 14"].map(t => (
                  <div key={t} className="flex items-center justify-between rounded-xl bg-background/60 px-3 py-2 text-sm">
                    <span>{t}</span> <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden animate-float sm:block">
              <div className="glass rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white"><HeartPulse className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg. wait time</p>
                    <p className="text-lg font-bold">−38%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">About MediCamp</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Purpose-built for large-scale care.</h2>
            <p className="mt-4 text-muted-foreground">
              From rural free-checkup drives to full hospital operations, MediCamp gives every stakeholder — patients, doctors, volunteers and administrators — the exact interface they need. No clutter. No compromise.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Role-based dashboards with zero cognitive overhead","QR-based patient identification and check-in","Real-time queue and appointment management","Analytics and reports across camps, revenue and outcomes"].map(x => (
                <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(s => (
              <Card key={s.l} className="p-6 text-center hover-lift">
                <p className="text-4xl font-bold gradient-text">{s.v}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Services</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Every service, one platform.</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(s => (
              <Card key={s.title} className="p-6 hover-lift">
                <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white shadow-glow"><s.icon className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section id="departments" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Departments</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Specialists across every field.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {departments.map(d => (
            <Card key={d.name} className="p-5 text-center hover-lift">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><d.icon className="h-5 w-5" /></div>
              <p className="mt-3 text-sm font-medium">{d.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Doctors</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Meet the team.</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.slice(0, 4).map(d => (
              <Card key={d.id} className="overflow-hidden p-6 text-center hover-lift">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-primary text-2xl font-bold text-white shadow-glow">
                  {d.name.replace("Dr. ","").split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>
                <h3 className="mt-4 font-semibold">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.department}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.experience} yrs · ⭐ {d.rating.toFixed(1)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPS */}
      <section id="camps" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Upcoming Camps</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Join a camp near you.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {upcoming.map(c => (
            <Card key={c.id} className="overflow-hidden hover-lift">
              <div className="h-40 gradient-hero" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">{c.status}</span>
                  <span className="text-xs text-muted-foreground">{c.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{c.location}</div>
                <Link to="/login" className="mt-4 inline-block"><Button size="sm" className="gradient-primary text-white">Register</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Gallery</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Moments of care.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[0,1,2,3,4,5,6,7].map(i => (
              <div key={i} className="aspect-square rounded-2xl gradient-hero opacity-90 hover-lift" style={{ filter: `hue-rotate(${i * 25}deg)` }} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Loved by care teams.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map(t => (
            <Card key={t.name} className="p-6 hover-lift">
              <div className="flex gap-1 text-warning">{Array.from({length: t.rating}).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-3 text-sm">"{t.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-bold text-white">{t.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Questions, answered.</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Talk to our care team.</h2>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3"><PhoneCall className="h-4 w-4 text-primary" /> +1 (555) 010-2030</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@medicamp.health</p>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> 500 Health Ave, Boston, MA</p>
            </div>
          </div>
          <Card className="p-6">
            <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <input required placeholder="Your name" className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              <input required type="email" placeholder="Your email" className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              <textarea required placeholder="Message" rows={4} className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              <Button type="submit" className="gradient-primary text-white">Send message</Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary"><Activity className="h-4 w-4 text-white" /></div>
              <span className="font-bold gradient-text">MediCamp</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Enterprise medical camp & hospital management, beautifully unified.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#departments" className="hover:text-foreground">Departments</a></li>
              <li><a href="#doctors" className="hover:text-foreground">Doctors</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
              <li><a href="#" className="hover:text-foreground">HIPAA</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50">
          <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">© 2026 MediCamp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
