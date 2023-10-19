import React, {useEffect, useState} from "react";
import {NavSearch, ItemSeach } from "../../components";


const Search = ({ title }) => {
    const [books, setBooks] = useState([]); // Inicialize como um array vazio
  
    useEffect(() => {
      const loadData = () => {
        const booksBase = JSON.parse(localStorage.getItem("books"));
        setBooks(booksBase || []); // Certifique-se de que booksBase seja um array ou use um array vazio se for nulo
      };
  
      loadData();
    }, []);
  
    return (
      <NavSearch title={title}>
        {books.map((book) => (
          <ItemSeach item={book} key={book.id} />
        ))}
      </NavSearch>
    );
  };
  
  export default Search;
  