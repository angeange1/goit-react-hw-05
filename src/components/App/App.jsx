import { lazy, Suspense } from 'react'
import css from './App.module.css'
import { Route, Routes } from 'react-router-dom'

import Navigation from '../Navigation/Navigation'

const Homepage = lazy(() => import('../../pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'))
const MovieCast = lazy(() => import ('../MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'))

function App() {

  return (
    <div className={css.body}>
<Navigation />
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/movies' element={<MoviesPage/>} />
    <Route path='/movies/:movieId' element={<MovieDetailsPage/>}>
        <Route path='cast' element={<MovieCast/>} />
        <Route path='reviews' element={<MovieReviews/>} />
    </Route>    
    <Route path='*' element={<NotFoundPage/>} />
  </Routes>
</Suspense>
    </div>
  )
}

export default App
