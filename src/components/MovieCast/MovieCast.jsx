import { getMovieCast } from "../../movies-api";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

const MovieCast = () => {
    const { movieId } = useParams()
    const [actors, setActors] = useState([])
    useEffect(() => {
        getMovieCast(movieId)
            .then(
                data => setActors(data.cast)) 
    }, [movieId])
    return (
        <>
            <ul>
        {actors && actors.map(({ id, name, profile_path, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}` : "/public/no-image-icon-23485.png"
                }
                alt={name}
              />
              <div>
                <h3>{name}</h3>
                <p> Character: {character}</p>
              </div>
            </li>
          ))}
      </ul>
        </>
    )
}

export default MovieCast