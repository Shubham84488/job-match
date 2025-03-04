import Link from "next/link"
import {
  Code,
  Briefcase,
  LineChart,
  HeartPulse,
  Wrench,
  GraduationCap,
  Building2,
  Truck,
  ShoppingBag,
  Utensils,
} from "lucide-react"

function CategoryCard({icon,name,jobCount,href}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-primary/50"
    >
      <div className="rounded-full bg-primary/10 p-3">{icon}</div>
      <h3 className="text-xl font-medium">{name}</h3>
      <p className="text-sm text-muted-foreground">{jobCount} jobs available</p>
    </Link>
  )
}

export default function CategoriesSection() {
  const categories = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      name: "Information Technology",
      jobCount: 1245,
      href: "/",
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      name: "Marketing",
      jobCount: 853,
      href: "/",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      name: "Finance",
      jobCount: 721,
      href: "/jobs",
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-primary" />,
      name: "Healthcare",
      jobCount: 932,
      href: "/jobs",
    },
    {
      icon: <Wrench className="h-6 w-6 text-primary" />,
      name: "Engineering",
      jobCount: 675,
      href: "/jobs",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      name: "Education",
      jobCount: 428,
      href: "/jobs",
    },
    {
      icon: <Building2 className="h-6 w-6 text-primary" />,
      name: "Real Estate",
      jobCount: 235,
      href: "/jobs",
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      name: "Logistics",
      jobCount: 347,
      href: "/jobs",
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      name: "Retail",
      jobCount: 512,
      href: "/jobs",
    },
    {
      icon: <Utensils className="h-6 w-6 text-primary" />,
      name: "Hospitality",
      jobCount: 389,
      href: "/jobs",
    },
  ]

  return (
    <section className="w-full py-8 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Browse Jobs by Category</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Explore opportunities in your field of expertise
            </p>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              name={category.name}
              jobCount={category.jobCount}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

