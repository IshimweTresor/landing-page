"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export default function BrilliantTowerLanding() {
  const [open, setOpen] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);
  // Form state
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    space: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          space: form.space,
          company: form.company,
          contact: form.contact,
          email: form.email
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Email sent!", description: "Your request has been sent successfully." });
        setForm({ company: "", contact: "", email: "", phone: "", space: "" });
      } else {
        toast({ title: "Error", description: "Failed to send email." });
      }
    } catch {
      toast({ title: "Error", description: "Failed to send email." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
              <img src="/log.jpg" alt="Tunga Nawe Logo" className="w-20 h-20 rounded-lg" />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Why Brilliant Tower
            </a>
            <a href="#numbers" className="text-foreground hover:text-primary transition-colors">
              The Numbers
            </a>
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setOpen(true)}>Book Private Tour</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Private Tour</DialogTitle>
                  <DialogDescription>
                    Fill in your details to request a private tour of Brilliant Tower.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Person</label>
                    <input
                      type="text"
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter contact person name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Space Requirements (sqm)</label>
                    <input
                      type="text"
                      name="space"
                      value={form.space}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., 200-500 sqm"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                    {loading ? "Sending..." : "Request Private Tour"}
                  </Button>
                </form>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full mt-2">Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brilliant-tower-exterior.png"
            alt="Brilliant Tower exterior view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/20"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Kigali's First World-Class Commercial Building
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Brilliant Tower</h2>
          <p className="text-lg md:text-xl mb-4 text-pretty opacity-90 font-semibold">
            If You're Serious About Positioning Your Business at the Top...
          </p>
          <p className="text-xl md:text-2xl mb-6 text-pretty opacity-90">
            This Is the Address That Will Define Kigali for the Next Decade.
          </p>
          <p className="text-lg mb-8 text-pretty opacity-90 font-medium">Available Now for Pre-Leasing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8" onClick={() => setHeroOpen(true)}>
              Book a Private Tour
            </Button>
            <Dialog open={heroOpen} onOpenChange={setHeroOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Private Tour</DialogTitle>
                  <DialogDescription>
                    Fill in your details to request a private tour of Brilliant Tower.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Person</label>
                    <input
                      type="text"
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter contact person name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Space Requirements (sqm)</label>
                    <input
                      type="text"
                      name="space"
                      value={form.space}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., 200-500 sqm"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                    {loading ? "Sending..." : "Request Private Tour"}
                  </Button>
                </form>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full mt-2">Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Why Brilliant Tower Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-balance">Why Brilliant Tower, You Ask?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="group hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">First of Its Kind in Rwanda</h3>
                <p className="text-muted-foreground text-pretty">
                  This is where all major businesses in Rwanda will build trust, and showcase dominance.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Unmatched Specs</h3>
                <p className="text-muted-foreground text-pretty">
                  Fiber-ready, 24/7 power backup, secure parking, premium finishes.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Prestige by Association</h3>
                <p className="text-muted-foreground text-pretty">
                  The companies here won't just rent space; they'll own status.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">CBD Commanding Location</h3>
                <p className="text-muted-foreground text-pretty">
                  Positioned where Kigali's most powerful decisions are made.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg mb-4">12 floors of world-class office and retail space.</p>
            <p className="text-xl font-semibold text-primary mb-8">The question is: Will you be in or out?</p>
          </div>
        </div>
      </section>

      {/* The Numbers Section */}
      <section id="numbers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-balance">The Numbers Are Clear</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <div className="text-3xl font-bold text-primary mb-4">USD 26/sqm/month</div>
                <h3 className="text-xl font-semibold mb-4">Rent</h3>
                <p className="text-muted-foreground">
                  This is not for bargain hunters. This is for decision-makers who know that the right address pays for
                  itself in credibility, clients, and prestige.
                </p>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">200 sqm +</div>
                  <div className="text-sm text-muted-foreground">Flexible space options</div>
                </Card>
                <Card className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">July 2026</div>
                  <div className="text-sm text-muted-foreground">Handover</div>
                </Card>
                <Card className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">25 floors, 180 units</div>
                  <div className="text-sm text-muted-foreground">Big enough</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground">Gallery</Badge>
            <h2 className="text-4xl font-bold mb-6 text-balance">See Kigali's First World-Class Commercial Landmark</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="/images/rooftop-dining.png"
                  alt="Rooftop dining area with city views"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Badge className="bg-white text-primary">Rooftop Dining</Badge>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="/images/brilliant-tower-front.png"
                  alt="Brilliant Tower front exterior view"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Badge className="bg-white text-primary">Tower Exterior</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="/images/lobby-interior.png"
                  alt="Modern lobby interior"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Badge className="bg-white text-primary">Luxury Lobby</Badge>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="/images/modern-lobby.png"
                  alt="Modern interior common area"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Badge className="bg-white text-primary">Common Area</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Businesses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-balance">Who Should Claim Space NOW?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">🏦 Banks & Financial Institutions</h3>
              <p className="text-sm text-muted-foreground">who demand trust and prestige.</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">📡 Telecoms & Insurers</h3>
              <p className="text-sm text-muted-foreground">who want visibility and power positioning.</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">🌍 International NGOs</h3>
              <p className="text-sm text-muted-foreground">looking for Kigali's most credible HQ address.</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">⚖️ Law & Corporate Firms</h3>
              <p className="text-sm text-muted-foreground">that must impress every client who walks in.</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">🛍️ High-End Retail & Dining</h3>
              <p className="text-sm text-muted-foreground">brands that want foot traffic from Kigali's elite.</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">🏢 All Other Businesses</h3>
              <p className="text-sm text-muted-foreground">big or small ready to take 200 square metre or more.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">Your Next Step Is Simple</h2>
          <h3 className="text-2xl font-semibold mb-8">📅 Book Private Presentation Now</h3>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg mb-4">We'll show you:</p>
            <ul className="text-left space-y-2 max-w-2xl mx-auto">
              <li>• Floor plans and views reserved for early tenants.</li>
              <li>• How your company can secure prestige positioning in Kigali's landmark tower.</li>
              <li>• Incentives available ONLY to businesses that act before public launch.</li>
            </ul>
            <p className="text-lg mt-6 font-semibold">But this is by invitation only. Not everyone gets in the door.</p>
          </div>

          <div className="bg-accent/10 rounded-lg p-8 max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">⏰ The Window Is Closing</h3>
            <p className="text-lg mb-4">Once these prime floors are spoken for, there's no second chance.</p>
            <p className="text-lg">
              📍 You either secure your space now... or watch your competitors plant their flag while you explain to
              your board why you missed it.
            </p>
          </div>

          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-4">
            Request Private Presentation
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Contact TUNGA NAWE</h3>
                  <p className="text-muted-foreground mb-6">
                    Official Leasing Partner of Brilliant Development. Your Gateway to Kigali's Most Prestigious
                    Addresses.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📞</span>
                      </div>
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-muted-foreground">+250789234932</div>
                        <div className="text-muted-foreground">+250783331250</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📧</span>
                      </div>
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-muted-foreground">Tunganawe@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Book Your Private Presentation</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Person</label>
                      <input
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter contact person name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Space Requirements (sqm)</label>
                      <input
                        type="text"
                        name="space"
                        value={form.space}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g., 200-500 sqm"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                      {loading ? "Sending..." : "Request Private Presentation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">TUNGA NAWE</span>
            </div>
            <p className="text-primary-foreground/80 text-pretty mb-4">
              Official Leasing Partner of Brilliant Development.
              <br />
              Your Gateway to Kigali's Most Prestigious Addresses.
            </p>
            <div className="space-y-1 text-primary-foreground/80">
              <div>Phone: +250789234932 / +250783331250</div>
              <div>Email: Tunganawe@gmail.com</div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Tunganawe Real Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
