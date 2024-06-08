import { useParams, useLocation } from "react-router-dom"
import { Suspense, useEffect, useState, useRef } from "react"
import { Link, Outlet } from "react-router-dom"
import { getMovieById } from "../../movies-api"
import css from "./MovieDetailsPage.module.css"

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(false)
  const { movieId } = useParams()
  const location = useLocation()
    
  const goBackBtnLink = useRef(location.state ?? '/movies')

      useEffect(() => {
        setLoading(true)
        getMovieById(movieId)
          .then(movieDetails => setMovie(movieDetails))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
    }, [movieId])
  
  const {poster_path, original_title, release_date, vote_average, overview, genres} = movie

    return (
    <>
      <Link to={goBackBtnLink.current}>Go back</Link>
       {loading && <b>Loading payment info...</b>}
        <div>
          <img src={poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}` : "/public/no-image-icon-23485.png"} />
            <div>
            <h3>{original_title}({release_date && release_date.slice(0,4)})</h3>
            <p>User Score: {vote_average && (vote_average.toFixed(1) / 10 * 100) + "%"} </p>
          <h4>Overview</h4>
          <p>{overview}</p>
          <h4>Genres</h4>
            <ul className={css.genres}>
              {genres &&
                genres.length &&
                genres.map(({ id, name }) => (<li key={id}>{name}</li>))}
          </ul>
            </div>
        </div>
        <div>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      <Suspense fallback={<div>Loading sub component...</div>}>
        <Outlet />
      </Suspense> 
      </div>
    </>
    )
}

export default MovieDetailsPage