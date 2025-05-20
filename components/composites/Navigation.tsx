import Link from 'next/link'
import { gradients } from '@/config/gradients'
import { NAVIGATION, SITE } from '@/config/constants'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-transparent/20 backdrop-blur-2xl border-b border-white/10" />
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`text-2xl font-bold ${gradients.title.primary} ${gradients.title.hover} hover:opacity-80 transition-opacity`}
          >
            {SITE.name}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-foreground/80 hover:text-primary transition-colors group"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 