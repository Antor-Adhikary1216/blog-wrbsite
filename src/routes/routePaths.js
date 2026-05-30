export const ROUTES = {
  home: '/',
  blogs: '/blogs',
  blogDetail: '/blogs/:slug',
  about: '/about',
  contact: '/contact',
  signIn: '/sign-in',
  signUp: '/sign-up',
  account: '/account',
  adminBlogs: '/admin/blogs',
  adminNewBlog: '/admin/blogs/new',
  adminEditBlog: '/admin/blogs/:id/edit',
}

export const pathTo = {
  blog: (slug) => `/blogs/${slug}`,
  editBlog: (id) => `/admin/blogs/${id}/edit`,
}

export const PUBLIC_NAV_ITEMS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Editorials', to: ROUTES.blogs },
  { label: 'About', to: ROUTES.about },
  { label: 'Contact', to: ROUTES.contact },
]
