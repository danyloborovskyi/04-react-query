import './App.module.css'
import fetchMovies, { type MoviesResponse } from "../../services/movieService"
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid"
import type { Movie } from "../../types/movie"
import Loader from '../Loader/Loader';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import css from "../ReactPaginate/ReactPaginate.module.css"

import {useState, useEffect} from "react"
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {

  // const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [query, setQuery] = useState<string>("")

  const {data, isLoading, isError, isFetching } = 
      useQuery<MoviesResponse>({
        queryKey: ["movies", query, currentPage],
        queryFn: () => fetchMovies(query, currentPage),
        enabled: !!query,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
      })

      useEffect(() => {
    if (data?.results.length === 0 && !isFetching) {
      toast("No movies found for your request.");
    }
  }, [data, isFetching]);

  async function handleSearchSubmit(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
  }

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
      {data && data?.total_pages > 1 && <ReactPaginate
        pageCount={data?.total_pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
/>}
      {isError && <ErrorMessage />}
      {isLoading ? (<Loader />) : (<MovieGrid movies={data?.results ?? []} onSelect={handleClick} />)}
      {openModal === true && <MovieModal movie={ movie } onClose={handleClose}/>}
    </>
  )
}

export default App

// -------------------------------------

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