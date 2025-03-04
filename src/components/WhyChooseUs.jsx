import { Award, Briefcase, Clock, Globe, LineChart, Users } from "lucide-react"
import Link from "next/link"

export default function WhyChooseUs() {
  return (
    <section className="w-full py-9 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-2xl text-primary bg-slate-300 font-semibold">Why Choose Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Smarter Way to Find Your Dream Job
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Join thousands of job seekers and employers who trust our platform to connect talent with opportunity.
            </p>
          </div>
        </div>

        <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12 max-w-5xl">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-3">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Extensive Job Listings</h3>
            <p className="text-center text-muted-foreground">
              Access thousands of verified job opportunities across industries and experience levels.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Real-Time Updates</h3>
            <p className="text-center text-muted-foreground">
              Receive instant notifications for new job postings that match your skills and preferences.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Premium Employers</h3>
            <p className="text-center text-muted-foreground">
              Connect with top-tier companies and organizations looking for talent like you.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Personalized Matching</h3>
            <p className="text-center text-muted-foreground">
              Our AI-powered algorithm matches your profile with the most relevant job opportunities.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-3">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Global Reach</h3>
            <p className="text-center text-muted-foreground">
              Discover remote and international opportunities from employers worldwide.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-3">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Career Resources</h3>
            <p className="text-center text-muted-foreground">
              Access exclusive guides, resume builders, and interview preparation tools.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">500+</span>
              <span className="text-sm text-muted-foreground">Active Jobs</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">20K+</span>
              <span className="text-sm text-muted-foreground">Job Seekers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">2K+</span>
              <span className="text-sm text-muted-foreground">Companies</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">95%</span>
              <span className="text-sm text-muted-foreground">Success Rate</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="bg-black text-white rounded-md text-xl px-8 py-3 hover:bg-slate-900 shadow-md">
              <Link href="/signUp">Join Now</Link>
            </button>
            <button className="bg-slate-200 rounded-md text-xl px-6 py-3 hover:bg-slate-300 shadow-md">
              <Link href="/employerSignup">For Employers</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

