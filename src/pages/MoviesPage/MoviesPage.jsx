import { useEffect, useState } from "react"
import { getMoviesByName } from "../../movies-api"
import MovieList from "../../components/MovieList/MovieList"
import css from "./MoviesPage.module.css"
import { useSearchParams } from "react-router-dom"

const MoviesPage = () => {
    const [foundMovies, setFoundMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get("query") ?? ""

    useEffect(() => {
        setLoading(true)
        getMoviesByName(searchQuery)
            .then(data => setFoundMovies(data.results))
            .finally(() => setLoading(false));
    }, [searchQuery])

    const handleSubmit = (e) => {
        e.preventDefault()
        const inputQuery = e.target.search.value.trim()
        handleSearch(inputQuery)
        e.target.reset()
    }

    const handleSearch = (queryValue) => {
        if (queryValue === "") { return }
        searchParams.set("query", queryValue)
        setSearchParams(searchParams)
        setFoundMovies([])
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={css.searchForm}>
                <input autoFocus name="search" ></input>
                <button type="submit" >Search</button>
            </form>
            {loading && <b>Loading payments...</b>}
            <MovieList movies={foundMovies} />
        </>
    )
}

export default MoviesPage