import Link from "next/link"
import { Search } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full py-12 md:pt-24 lg:pt-32 bg-gradient-to-b from-primary/10 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Dream Job Today!
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Thousands of jobs from top companies. Apply now and take the next step in your career!
            </p>
          </div>

          <div className="w-full max-w-sm space-y-2 sm:max-w-md md:max-w-lg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search jobs, companies, or keywords..."
                className="w-full bg-background pl-8 pr-4 py-1 text-lg border-2 border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="bg-black text-white rounded-md text-xl px-6 py-3 hover:bg-slate-900 shadow-md">
              <Link href="/">Browse Jobs</Link>
            </button>
            <button  className="bg-slate-200 rounded-md text-xl px-6 py-3 hover:bg-slate-300 shadow-md">
              <Link href="/">Post a Job</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

