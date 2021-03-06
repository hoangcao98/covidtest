/* eslint-disable comma-dangle */
import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/patients',
    component: lazy(() => import('../../views/patients/patients')),
    meta: {
      action: 'read',
      resource: 'thu_ngan',
    },
  },
  {
    path: '/covid19/test-form',
    component: lazy(() => import('../../views/covid19/test-form')),
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
      action: 'read',
      subject: 'auth',
    },
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout',
  },
  // {
  //     path: '/covid19/test-form',
  //     component: lazy(() => import('../../views/covid19/test-form'))
  // },
]

export default PagesRoutes
