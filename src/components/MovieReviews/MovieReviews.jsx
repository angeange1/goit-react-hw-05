import { getMovieReviews } from "../../movies-api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const MovieReviews = () => {
    const { movieId } = useParams()
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        getMovieReviews(movieId)
            .then(
            data => setReviews(data.results))
    }, [movieId])
    return (
        <>
            {reviews.length > 0 ? 
            <ul>
                {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}          
            </ul>        
            : <p>We do not have any reviews for this movie</p>}
        </>
    )
}

export default MovieReviews