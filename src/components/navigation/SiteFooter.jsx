import { Link } from 'react-router-dom'
import { FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa'
import Container from '../common/Container.jsx'
import { BRAND_NAME, BLOG_CATEGORIES } from '../../utils/constants.js'
import { PUBLIC_NAV_ITEMS, ROUTES } from '../../routes/routePaths.js'

const resourceLinks = [
  { label: 'Sign in', to: ROUTES.signIn },
  { label: 'Create account', to: ROUTES.signUp },
  { label: 'Admin studio', to: ROUTES.adminBlogs },
]

const socialLinks = [
  {
    label: 'Facebook',
    handle: 'Antor Adhikary',
    href: 'https://www.facebook.com/search/people/?q=Antor%20Adhikary',
    Icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    handle: '@Antor16',
    href: 'https://www.instagram.com/Antor16/',
    Icon: FaInstagram,
  },
  {
    label: 'GitHub',
    handle: 'Antor-Adhikary1216',
    href: 'https://github.com/Antor-Adhikary1216',
    Icon: FaGithub,
  },
]

function FooterLink({ children, to, href }) {
  const className =
    'text-sm text-zinc-500 transition hover:text-zinc-950 hover:underline hover:underline-offset-4'

  if (href) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-950">
        {title}
      </h2>
      <div className="mt-4 grid gap-3">{children}</div>
    </div>
  )
}

function SocialFooterLink({ href, label, handle, Icon }) {
  return (
    <a
      aria-label={`${label}: ${handle}`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
      href={href}
      rel="noreferrer"
      target="_blank"
      title={`${label}: ${handle}`}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </a>
  )
}

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Link
              className="font-serif text-4xl font-semibold italic tracking-tight text-zinc-950"
              to={ROUTES.home}
            >
              {BRAND_NAME}
            </Link>
            <p className="mt-4 max-w-sm leading-7 text-zinc-600">
              Luxury model culture, runway notes, backstage beauty, and
              editorial dispatches for readers with a precise eye.
            </p>
            <a
              className="mt-6 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              href="mailto:editorial@velvetrunway.com"
            >
              Pitch a story
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Explore">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <FooterLink key={item.to} to={item.to}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Categories">
              {BLOG_CATEGORIES.map((category) => (
                <FooterLink
                  key={category}
                  to={`${ROUTES.blogs}?category=${encodeURIComponent(category)}`}
                >
                  {category}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Account">
              {resourceLinks.map((item) => (
                <FooterLink key={item.to} to={item.to}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-950">
                Social
              </h2>
              <div className="mt-4 flex items-center gap-2">
                {socialLinks.map((item) => (
                  <SocialFooterLink key={item.href} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright (c) {year} Antor Adhikary. All rights reserved.</p>
          <p>{BRAND_NAME} is crafted as a refined full-stack editorial.</p>
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
