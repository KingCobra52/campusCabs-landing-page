"use client";

//General structure of landing page 

// Hero: Clear value proposition / what the product is + who it's for 
//CampusCabs is a Penn State rideshare app that offers cheaper rides by letting drivers keep a larger share of every fare.


// Problem (short): Why rides are too expensive.
//Uber charges drivers a percentage per ride.
//Drivers lose up to 30%-40% of every fare.
//Inflated prices to cover driver costs.
//Riders pay more.


// Solution (short): Why CampusCabs is better for students and drivers.
//We charge drivers a flat subscription to use the app.
//Drivers keep 80-90% of every fare.
//No inflated prices needed.
//Riders pay less.


//CTA (core of page): Rider/Driver toggle + short info form (name, email, phone) + submit.
//Join the waitlist 

// Primary CTA (again at bottom): Same button → scrolls back to the signup form.

import Image from "next/image";
import { useRef, useState } from 'react';

type WaitlistRole = "rider" | "driver"; 

interface WaitlistPayload {
  role: WaitlistRole;
  name: string; 
  email: string;
  phone: string; 
}


export default function Home() {
  const waitlistRef = useRef<HTMLDivElement>(null); //points at the join waitlist section 
  const [role, setRole] = useState<WaitlistRole>("rider");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //call this function when button press to scroll to join waitlist section (button to join waitlist)
  const scrollToWaitlist = () => {
    //only runs if not currently at the join waitlist section 
    waitlistRef.current?.scrollIntoView({ behavior: "smooth"})
  }; 


  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: WaitlistPayload = { role, name, email, phone };
    //Ready for later supabase: payload 
    console.log("Waitlist payload", payload)
    setSubmitted(true);
  }


  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {/* Hero */}
      <section className="py-16 text-center sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            CampusCabs
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
          State College rides, done right.
          </p>
        </section>
        {/* End Hero */}

        {/* Problem */}
        <section className="py-12" aria-labelledby="problem-heading">
          <h2 id="problem-heading" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            The problem
          </h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Uber takes a big cut of every ride</li>
            <li>Drivers lose 30–40% of each fare</li>
            <li>Prices get inflated to cover driver costs</li>
            <li>Riders end up paying more</li>
          </ul>
        </section>
         {/* End Problem */}


         {/* Solution */}
        <section className="py-12" aria-labelledby="solution-heading">
          <h2 id="solution-heading" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            The solution
          </h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Flat subscription for drivers—no per-ride cut</li>
            <li>Drivers keep 80–90% of every fare</li>
            <li>No inflated prices</li>
            <li>Riders pay less</li>
          </ul>
        </section>
        {/* End Solution */}

        {/* Main CTA — Waitlist form */}
        <section
          id="waitlist"
          ref={waitlistRef}
          className="scroll-mt-24 py-16"
          aria-labelledby="waitlist-heading"
        >
          <h2 id="waitlist-heading" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Join the waitlist
          </h2>

          {submitted ? (
            <p className="mt-6 text-lg text-green-600 dark:text-green-400">
              Thanks! We’ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
              {/* Rider / Driver toggle */}
              <div>
                <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  I am a
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="rider"
                      checked={role === "rider"}
                      onChange={() => setRole("rider")}
                      className="rounded-full border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                    />
                    <span className="text-zinc-700 dark:text-zinc-300">Rider</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="driver"
                      checked={role === "driver"}
                      onChange={() => setRole("driver")}
                      className="rounded-full border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                    />
                    <span className="text-zinc-700 dark:text-zinc-300">Driver</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="waitlist-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="waitlist-phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Phone
                </label>
                <input
                  id="waitlist-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  placeholder="(555) 000-0000"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-zinc-900 px-5 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Join the waitlist
              </button>
            </form>
          )}
        </section>
        {/* End Main CTA — Waitlist form */}

         {/* Bottom CTA — outline style so it’s distinct from the main form submit */}
         <section className="py-16 text-center">
          <button
            type="button"
            onClick={scrollToWaitlist}
            className="rounded-full border-2 border-zinc-900 bg-transparent px-8 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-transparent dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Join the waitlist
          </button>
        </section>
        {/* End Bottom CTA */}

      </main>
    </div>
  );
}
