import './App.module.css'
import fetchMovies from "../../services/movieService"
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid"
import type { Movie } from "../../types/movie"
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import MoviesResponse from "../../services/movieService"

import {useState, useEffect} from "react"
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loader, setLoader] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>("")

  const {data, error, isLoading, isError } = 
      useQuery({
        queryKey: ["movies", page, query],
        queryFn: () => fetchMovies(query, page)
      })

  async function handleSearchSubmit(newQuery: string) {
    setQuery(newQuery);
    setPage(1)
    if (data) {
      setMovies(data.results) 
    }
    
  }
    
  useEffect(() => {
    console.log(movies)
    console.log(query)
  }
  , [query])

  function handleClick(movie: Movie) {
    setMovie(movie);
    setOpenModal(true);
  }
  
  function handleClose() {
    setMovie(null)
    setOpenModal(false)
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {/* {error === true && <ErrorMessage />} */}
      {loader === true ? (<Loader />) : (<MovieGrid movies={movies} onSelect={handleClick} />)}
      {openModal === true && <MovieModal movie={ movie } onClose={handleClose}/>}
    </>
  )
}

export default App

// function App() {

//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [movie, setMovie] = useState<Movie | null>(null)
//   const [loader, setLoader] = useState(false)
//   const [error, setError] = useState(false)
//   const [openModal, setOpenModal] = useState(false)

//   async function handleSearchSubmit(query: string) {
//     try {
//       setMovies([])
//       setError(false)
//       setLoader(true)
//       const data = await fetchMovies(query);

//       if (data.length === 0) {
//         toast("No movies found for your request.")
//       }
//       setMovies(data);
//     } catch {
//       setError(true)
//     } finally {
//       setLoader(false)
//     }
//   }

//   function handleClick(movie: Movie) {
//     setMovie(movie);
//     setOpenModal(true);
//   }
  
//   function handleClose() {
//     setMovie(null)
//     setOpenModal(false)
//   }

//   return (
//     <>
//       <Toaster />
//       <SearchBar onSubmit={handleSearchSubmit} />
//       {error === true && <ErrorMessage />}
//       {loader === true ? (<Loader />) : (<MovieGrid movies={movies} onSelect={handleClick} />)}
//       {openModal === true && <MovieModal movie={ movie } onClose={handleClose}/>}
//     </>
//   )
// }

// export default App