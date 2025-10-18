import { TrustBadge } from '@/lib/types/landing-page'

interface TrustBadgesProps {
  badges: TrustBadge[]
  className?: string
}

export function TrustBadges({ badges, className = '' }: TrustBadgesProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
        >
          {badge.icon && (
            <span className="text-lg" role="img" aria-label={badge.text}>
              {badge.icon}
            </span>
          )}
          <span className="font-medium">{badge.text}</span>
        </div>
      ))}
    </div>
  )
}

