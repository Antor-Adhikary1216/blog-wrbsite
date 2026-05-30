import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import AccountPage from '../pages/AccountPage.jsx'
import AdminBlogListPage from '../pages/AdminBlogListPage.jsx'
import BlogDetailPage from '../pages/BlogDetailPage.jsx'
import BlogEditorPage from '../pages/BlogEditorPage.jsx'
import BlogListPage from '../pages/BlogListPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import SignInPage from '../pages/SignInPage.jsx'
import SignUpPage from '../pages/SignUpPage.jsx'
import AdminRoute from './AdminRoute.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { ROUTES } from './routePaths.js'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.blogs} element={<BlogListPage />} />
          <Route path={ROUTES.blogDetail} element={<BlogDetailPage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.signIn} element={<SignInPage />} />
          <Route path={ROUTES.signUp} element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.account} element={<AccountPage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path={ROUTES.adminBlogs} element={<AdminBlogListPage />} />
            <Route path={ROUTES.adminNewBlog} element={<BlogEditorPage />} />
            <Route path={ROUTES.adminEditBlog} element={<BlogEditorPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
