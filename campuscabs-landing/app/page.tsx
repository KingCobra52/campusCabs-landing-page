"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Car,
  Wallet,
  CheckCircle2,
  Users,
  Clock,
  Shield,
  MapPin,
  CreditCard,
  Instagram,
} from "lucide-react";

/* ── Types ── */

interface WaitlistFormValues {
  name: string;
  email: string;
}

interface RiderFormValues {
  name: string;
  is_psu_student: boolean;
  email: string;
  psu_email: string;
  instagram: string;
}

/* ── Constants ── */

const RIDER_BENEFITS = [
  "Lower prices than Uber & Lyft",
  "State College only zone",
  "Pay directly via Venmo, Zelle, or cash",
  "Free to join — no commitment",
] as const;

const DRIVER_BENEFITS = [
  "Keep 100% of your fare during the pilot — no commission taken",
  "Drive on your own schedule",
  "24/7 driver assistance guaranteed",
] as const;

const STATS = [
  {
    number: "30–40%",
    label: "of every fare goes to Uber & Lyft — not your driver.",
  },
  {
    number: "100%",
    label: "of the fare goes to CampusCabs drivers during our pilot",
  },
  {
    number: "$0",
    label: "platform fee for drivers during our pilot launch",
  },
] as const;

/* ── Input styling ── */

const inputBase =
  "w-full rounded-[10px] border-[1.5px] px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm text-text outline-none transition-colors placeholder:text-gray";
const inputNormal = `${inputBase} border-gray-light bg-off-white focus:border-blue focus:bg-white`;
const inputError = `${inputBase} border-red-400 bg-off-white focus:border-red-500 focus:bg-white`;

/* ── Component ── */

export default function Home(): React.JSX.Element {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const [riderSubmitted, setRiderSubmitted] = useState(false);
  const [driverSubmitted, setDriverSubmitted] = useState(false);

  const riderForm = useForm<RiderFormValues>({
    defaultValues: {
      name: "",
      is_psu_student: false,
      email: "",
      psu_email: "",
      instagram: "",
    },
  });

  const isPsuStudent = riderForm.watch("is_psu_student");

  const driverForm = useForm<WaitlistFormValues>({
    defaultValues: { name: "", email: "" },
  });

  const scrollToWaitlist = (): void => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onRiderSubmit = (data: RiderFormValues): void => {
    const payload = data.is_psu_student
      ? {
          role: "rider" as const,
          name: data.name,
          is_psu_student: true,
          psu_email: data.psu_email,
          instagram: data.instagram || undefined,
        }
      : {
          role: "rider" as const,
          name: data.name,
          is_psu_student: false,
          email: data.email,
        };
    // Ready for Supabase
    console.log("Rider waitlist payload", payload);
    setRiderSubmitted(true);
  };

  const onDriverSubmit = (data: WaitlistFormValues): void => {
    // Ready for Supabase: { role: "driver", ...data }
    console.log("Driver waitlist payload", { role: "driver", ...data });
    setDriverSubmitted(true);
  };

  /* Scroll reveal via IntersectionObserver */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("visible"),
              i * 80
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-off-white font-[family-name:var(--font-dm-sans)]">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-blue/8 bg-off-white/88 px-6 py-5 backdrop-blur-[12px] sm:px-12">
        <div className="font-[family-name:var(--font-sora)] text-[1.4rem] font-extrabold tracking-tight text-navy">
          Campus<span className="text-blue">Cabs</span>
        </div>
        <button
          type="button"
          onClick={scrollToWaitlist}
          className="rounded-full bg-navy px-5 py-2.5 font-[family-name:var(--font-sora)] text-[0.85rem] font-semibold text-white transition-all hover:bg-blue hover:-translate-y-px"
        >
          Join Waitlist
        </button>
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-[120px] pb-20 text-center">
          {/* Background gradients */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(29,111,240,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(245,200,66,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Badge */}
          <span
            className="relative mb-7 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-4 py-1.5 font-[family-name:var(--font-sora)] text-[0.78rem] font-semibold uppercase tracking-wider text-blue opacity-0"
            style={{ animation: "fadeUp 0.6s 0.1s forwards" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue" style={{ animation: "pulse 1.5s infinite" }} />
            Coming to Penn State · State College, PA
          </span>

          {/* Headline */}
          <h1
            className="relative max-w-[760px] font-[family-name:var(--font-sora)] text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-2px] text-navy opacity-0"
            style={{ animation: "fadeUp 0.6s 0.2s forwards" }}
          >
            Rides built{" "}
            <em className="not-italic text-blue">for</em>{" "}
            <span className="relative inline-block">
              State College
              <span
                className="absolute bottom-1 left-0 right-0 -z-10 h-1.5 rounded-sm bg-gold opacity-0"
                style={{ animation: "fadeIn 0.4s 0.8s forwards" }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-[520px] text-[1.15rem] leading-[1.65] font-normal text-[#4a5a78] opacity-0"
            style={{ animation: "fadeUp 0.6s 0.35s forwards" }}
          >
            No 30–40% Uber cut. CampusCabs gives drivers 100% of every fare
            during our pilot — keeping rides cheap for riders and fair for
            drivers.
          </p>

          {/* ─── Dual Waitlist Cards ─── */}
          <div
            ref={waitlistRef}
            id="waitlist"
            className="mt-12 flex w-full max-w-[720px] scroll-mt-24 flex-wrap justify-center gap-4 opacity-0"
            style={{ animation: "fadeUp 0.6s 0.5s forwards" }}
          >
            {/* Rider Card */}
            <div className="min-w-[280px] max-w-[340px] flex-1 rounded-[20px] border-[1.5px] border-gray-light bg-white p-8 text-left shadow-[0_4px_24px_rgba(15,27,45,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(15,27,45,0.12)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10">
                <Car className="h-5 w-5 text-blue" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-[1.05rem] font-bold text-navy">
                I&apos;m a Rider
              </h3>
              <p className="mt-1.5 mb-5 text-[0.88rem] leading-relaxed text-gray">
                Get campus rides at honest prices, no surprises.
              </p>

              {riderSubmitted ? (
                <div className="flex flex-col items-center gap-2 rounded-xl bg-green-50 py-6 text-center">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                  <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-green-700">
                    You&apos;re on the list!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={riderForm.handleSubmit(onRiderSubmit)}
                  className="flex flex-col gap-2.5"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Rider name"
                    className={riderForm.formState.errors.name ? inputError : inputNormal}
                    {...riderForm.register("name", { required: "Name is required" })}
                  />
                  {riderForm.formState.errors.name && (
                    <p className="text-xs text-red-600" role="alert">
                      {riderForm.formState.errors.name.message}
                    </p>
                  )}

                  {/* PSU student toggle */}
                  <div>
                    <span className="mb-1.5 block text-xs font-medium text-[#4a5a78]">
                      Penn State student?
                    </span>
                    <div className="flex gap-1 rounded-lg bg-off-white p-1">
                      <button
                        type="button"
                        onClick={() => riderForm.setValue("is_psu_student", true)}
                        className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                          isPsuStudent
                            ? "bg-white text-navy shadow-sm"
                            : "text-gray hover:text-navy"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => riderForm.setValue("is_psu_student", false)}
                        className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                          !isPsuStudent
                            ? "bg-white text-navy shadow-sm"
                            : "text-gray hover:text-navy"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {isPsuStudent ? (
                    <>
                      <input
                        type="email"
                        placeholder="abc1234@psu.edu"
                        aria-label="PSU email"
                        className={riderForm.formState.errors.psu_email ? inputError : inputNormal}
                        {...riderForm.register("psu_email", {
                          required: "PSU email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@psu\.edu$/,
                            message: "Must be a @psu.edu email",
                          },
                        })}
                      />
                      {riderForm.formState.errors.psu_email && (
                        <p className="text-xs text-red-600" role="alert">
                          {riderForm.formState.errors.psu_email.message}
                        </p>
                      )}
                      <div className="relative">
                        <Instagram className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray" />
                        <input
                          type="text"
                          placeholder="@yourhandle (optional)"
                          aria-label="Instagram handle"
                          className={`${inputNormal} pl-9`}
                          {...riderForm.register("instagram")}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="email"
                        placeholder="Your email"
                        aria-label="Rider email"
                        className={riderForm.formState.errors.email ? inputError : inputNormal}
                        {...riderForm.register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                          },
                        })}
                      />
                      {riderForm.formState.errors.email && (
                        <p className="text-xs text-red-600" role="alert">
                          {riderForm.formState.errors.email.message}
                        </p>
                      )}
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-[10px] bg-blue px-4 py-3 font-[family-name:var(--font-sora)] text-[0.9rem] font-semibold text-white transition-all hover:bg-[#1558d0] hover:-translate-y-px"
                  >
                    Join as Rider →
                  </button>
                </form>
              )}
            </div>

            {/* Driver Card */}
            <div className="min-w-[280px] max-w-[340px] flex-1 rounded-[20px] border-[1.5px] border-gray-light bg-white p-8 text-left shadow-[0_4px_24px_rgba(15,27,45,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(15,27,45,0.12)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20">
                <Wallet className="h-5 w-5 text-[#c8930a]" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-[1.05rem] font-bold text-navy">
                I&apos;m a Driver
              </h3>
              <p className="mt-1.5 mb-5 text-[0.88rem] leading-relaxed text-gray">
                Keep 100% of your fare during our pilot. Drive on your own
                schedule.
              </p>

              {driverSubmitted ? (
                <div className="flex flex-col items-center gap-2 rounded-xl bg-green-50 py-6 text-center">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                  <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-green-700">
                    You&apos;re on the list!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={driverForm.handleSubmit(onDriverSubmit)}
                  className="flex flex-col gap-2.5"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Driver name"
                    className={driverForm.formState.errors.name ? inputError : inputNormal}
                    {...driverForm.register("name", { required: "Name is required" })}
                  />
                  {driverForm.formState.errors.name && (
                    <p className="text-xs text-red-600" role="alert">
                      {driverForm.formState.errors.name.message}
                    </p>
                  )}
                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Driver email"
                    className={driverForm.formState.errors.email ? inputError : inputNormal}
                    {...driverForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {driverForm.formState.errors.email && (
                    <p className="text-xs text-red-600" role="alert">
                      {driverForm.formState.errors.email.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-[10px] bg-navy px-4 py-3 font-[family-name:var(--font-sora)] text-[0.9rem] font-semibold text-white transition-all hover:bg-blue hover:-translate-y-px"
                  >
                    Join as Driver →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Social proof line */}
          <p
            className="mt-12 text-[0.85rem] text-gray opacity-0"
            style={{ animation: "fadeUp 0.6s 0.7s forwards" }}
          >
            Student-founded at Penn State ·{" "}
            <strong className="text-navy">Free to join</strong> · Launching
            soon
          </p>
        </section>

        {/* ─── Stats / Why CampusCabs ─── */}
        <section className="relative overflow-hidden bg-navy px-6 py-24 sm:py-28">
          <div
            className="pointer-events-none absolute -top-[100px] -right-[100px] h-[400px] w-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(29,111,240,0.2), transparent 70%)",
            }}
          />
          <p className="reveal text-center font-[family-name:var(--font-sora)] text-[0.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
            By the numbers
          </p>
          <h2 className="reveal mt-4 text-center font-[family-name:var(--font-sora)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-1px] text-white">
            Why CampusCabs exists
          </h2>
          <div className="mx-auto mt-16 flex max-w-[900px] flex-wrap justify-center gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.number}
                className="reveal min-w-[200px] max-w-[260px] flex-1 rounded-[20px] border border-white/10 bg-white/[0.06] p-9 text-center transition-all hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="font-[family-name:var(--font-sora)] text-[2.8rem] font-extrabold leading-none tracking-[-2px] text-gold">
                  {stat.number}
                </div>
                <div className="mt-2 text-[0.9rem] leading-snug text-white/65">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── For Riders / For Drivers ─── */}
        <section className="bg-white px-6 py-24 sm:py-28">
          <p className="reveal text-center font-[family-name:var(--font-sora)] text-[0.78rem] font-semibold uppercase tracking-[1.5px] text-blue">
            Built for everyone on campus
          </p>
          <h2 className="reveal mt-4 mb-16 text-center font-[family-name:var(--font-sora)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-1px] text-navy">
            Better for riders. Better for drivers.
          </h2>
          <div className="mx-auto flex max-w-[880px] flex-wrap justify-center gap-6">
            {/* Rider benefits */}
            <div className="reveal min-w-[280px] max-w-[400px] flex-1 rounded-3xl border-[1.5px] border-blue/15 bg-gradient-to-br from-[#eef4ff] to-[#ddeaff] p-10">
              <Users className="mb-5 h-9 w-9 text-blue" />
              <h3 className="font-[family-name:var(--font-sora)] text-[1.4rem] font-extrabold text-navy">
                For Riders
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {RIDER_BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-[#3a4a68]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Driver benefits */}
            <div className="reveal min-w-[280px] max-w-[400px] flex-1 rounded-3xl border-[1.5px] border-gold/30 bg-gradient-to-br from-[#fffbe8] to-[#fff4c2] p-10">
              <Wallet className="mb-5 h-9 w-9 text-[#c8930a]" />
              <h3 className="font-[family-name:var(--font-sora)] text-[1.4rem] font-extrabold text-navy">
                For Drivers
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {DRIVER_BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-[#3a4a68]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c8930a]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="bg-off-white px-6 py-24 text-center sm:py-28">
          <div className="mx-auto max-w-[600px]">
            <h2 className="reveal font-[family-name:var(--font-sora)] text-[clamp(2rem,4vw,2.8rem)] font-extrabold tracking-[-1.5px] text-navy">
              Ready for better rides?
            </h2>
            <p className="reveal mt-4 text-base text-gray">
              Join the waitlist — riders and drivers both welcome. We&apos;re
              launching soon at Penn State.
            </p>
            <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={scrollToWaitlist}
                className="rounded-xl bg-blue px-8 py-4 font-[family-name:var(--font-sora)] text-[0.95rem] font-bold text-white transition-all hover:bg-[#1558d0] hover:-translate-y-0.5"
              >
                Join as Rider
              </button>
              <button
                type="button"
                onClick={scrollToWaitlist}
                className="rounded-xl border-2 border-navy bg-transparent px-8 py-4 font-[family-name:var(--font-sora)] text-[0.95rem] font-bold text-navy transition-all hover:bg-navy hover:text-white hover:-translate-y-0.5"
              >
                Join as Driver
              </button>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="flex flex-wrap items-center justify-between gap-4 bg-navy px-6 py-8 sm:px-12">
          <div className="font-[family-name:var(--font-sora)] text-[1.4rem] font-extrabold text-white">
            Campus<span className="text-gold">Cabs</span>
          </div>
          <p className="text-[0.83rem] text-white/40">
            &copy; {new Date().getFullYear()} CampusCabs · Penn State · Built
            by students, for students
          </p>
        </footer>
      </main>
    </div>
  );
}
