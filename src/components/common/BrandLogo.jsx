import { BRAND_NAME } from '../../utils/constants.js'

const sizeStyles = {
  sm: {
    root: 'gap-2',
    mark: 'h-8 w-8 text-xs',
    wordmark: 'text-xl',
  },
  md: {
    root: 'gap-3',
    mark: 'h-10 w-10 text-sm',
    wordmark: 'text-2xl',
  },
  lg: {
    root: 'gap-3',
    mark: 'h-12 w-12 text-base',
    wordmark: 'text-4xl',
  },
}

function BrandLogo({ size = 'md', showWordmark = true, className = '' }) {
  const styles = sizeStyles[size] || sizeStyles.md

  return (
    <span className={`inline-flex items-center ${styles.root} ${className}`}>
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-zinc-950 font-semibold italic tracking-tight text-white ring-1 ring-zinc-300 ${styles.mark}`}
      >
        BI
      </span>
      {showWordmark ? (
        <span
          className={`font-semibold italic tracking-tight text-zinc-950 ${styles.wordmark}`}
        >
          {BRAND_NAME}
        </span>
      ) : (
        <span className="sr-only">{BRAND_NAME}</span>
      )}
    </span>
  )
}

export default BrandLogo
