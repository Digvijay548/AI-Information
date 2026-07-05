import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="gradient-text text-8xl font-black">404</div>
      <h1 className="mt-4 text-2xl font-bold">This page drifted off the roadmap</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist — but there's plenty of tech intelligence to explore.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" /> Go home
        </Link>
        <Link to="/search?q=AI%20Chatbot" className="btn-ghost">
          <Search className="h-4 w-4" /> Try a blueprint
        </Link>
      </div>
    </div>
  )
}
