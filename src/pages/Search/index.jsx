import React, {useEffect, useState} from "react";
import {NavSearch, ItemSeach } from "../../components";


const Search = ({ title }) => {
    const [books, setBooks] = useState([]);
    const [ searchBook, setSearchBook ] = useState("");
    const [ filters, setFilters ] = useState([]);
  
    useEffect(() => {
      const loadData = () => {
        const booksBase = JSON.parse(localStorage.getItem("books"));
        // Use o método slice para obter apenas os primeiros 10 livros
        const first10Books = booksBase ? booksBase.slice(0, 10) : [];
        setBooks(first10Books);
      };
  
      loadData();
    }, []);

    const applyFilters = (data) => {
      if (filters.length === 0) {
        return data;
      }
    
      return data.filter((book) => {
        const bookTags = book.tags || [];
        const lowerCaseFilters = filters.map((filter) => filter.toLowerCase());
        
        return lowerCaseFilters.every((filter) => {
          return bookTags.some((tag) => tag.trim().toLowerCase() === filter);
        });
      });
    };

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchBook.trim() === "") {
        const booksBase = JSON.parse(localStorage.getItem("books"));
        const filteredBooks = applyFilters(booksBase);
        const first10Books = filteredBooks.slice(0, 10);
        setBooks(first10Books);
      } else {
        const booksBase = JSON.parse(localStorage.getItem("books"));
        const filteredBooks = applyFilters(booksBase);
        const results = filteredBooks.filter((book) => {
          const regex = new RegExp(searchBook, "i");
          return regex.test(book.title + " " + book.author);
        });
        setBooks(results);
      }
    };

    const iptSearch = (e) => {
      e.preventDefault();

      setSearchBook(e.target.value);
    }
  
    return (
      <NavSearch title={title} filters={filters} setFilters={setFilters} searchButtom={handleSearch} inputSearch={iptSearch}>
        {books.map((book) => (
          <ItemSeach item={book} key={book.id} />
        ))}
      </NavSearch>
    );
  };
  
  export default Search;
  