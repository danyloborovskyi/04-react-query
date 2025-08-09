import styles from "./SearchBar.module.css"
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (title: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {

  function handleSubmit(formData: FormData) {

  const title = (formData.get("query") as string).trim();

  if (!title || title.length === 0) {
  toast("Please enter your search query.");
  return;
}

onSubmit(title);
}

    return (
<header className={styles.header}>
  <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form className={styles.form} action={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>
    )
}