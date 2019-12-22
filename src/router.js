import Register from './pages/register'
import Monitor from './pages/monitor'
import Rules from './pages/rules'
import Statistics from './pages/statistics'

const routes = [
  {
    path: '/',
    redirect: '/monitor'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/monitor',
    component: Monitor
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
    redirect: '/monitor'
  }
]

export default routes
