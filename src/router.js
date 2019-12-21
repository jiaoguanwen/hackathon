import Register from './pages/register'
import Rules from './pages/rules'
import Statistics from './pages/statistics'

const routes = [
  {
    path: '/',
    redirect: '/register'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/rules',
    component: Rules
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    redirect: '/register'
  }
]

export default routes
