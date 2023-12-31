import React, {useEffect, useState} from "react";
import {NavSearch, ItemSeach, ModalBook, ModalList } from "../../components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';

const Search = ({ title }) => {
    const [books, setBooks] = useState([]);
    const [ searchBook, setSearchBook ] = useState("");
    const [ filters, setFilters ] = useState([]);
    const [ filtersForRemove, setFiltersForRemove]  = useState([]);
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [ bookId, setBookId ] = useState(0);
  
    useEffect(() => {
      const loadData = () => {
        const booksBase = JSON.parse(localStorage.getItem("books"));

        const shuffledBooks = booksBase ? shuffleArray(booksBase) : [];
    
        const first10RandomBooks = shuffledBooks.slice(0, 10);
    
        setBooks(first10RandomBooks);
      };
    
      loadData();
    }, []);

    useEffect(() => {
      searchExec();
    }, [filters, filtersForRemove]);

    const shuffleArray = (array) => {
      
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
    }

    const applyFilters = (data) => {
      

      if (filters.length === 0 && filtersForRemove.length === 0) {
        return data;
      }

      let dtContains = data;

      

      if(filters.length !== 0){

        dtContains =  data.filter((book) => {
          const bookTags = book.tags || [];
          const lowerCaseFilters = filters.map((filter) => filter.trim().toLowerCase());
          
          return lowerCaseFilters.every((filter) => {
            return bookTags.some((tag) => tag.trim().toLowerCase() === filter);
          });
        });

      }

      if(filtersForRemove.length !== 0){
        dtContains = dtContains.filter((book) => {
          const bookTags = book.tags || [];
  
          const lowerCaseFilters = filtersForRemove.map((filter) => filter.trim().toLowerCase());
          
          return lowerCaseFilters.every((filter) => {
            return !(bookTags.some((tag) => tag.trim().toLowerCase() === filter));
          });
        });
      }

      return dtContains;
    };

    const searchExec = () => {
      if (searchBook.trim() === "") {
        const booksBase = JSON.parse(localStorage.getItem("books"));
        const filteredBooks = applyFilters(booksBase);
        const shuffledBooks = filteredBooks ? shuffleArray(filteredBooks) : [];
        const first10Books = shuffledBooks.slice(0, 10);

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
    }
    const handleSearch = (e) => {
      e.preventDefault();
      searchExec();
    };

    const iptSearch = (e) => {
      e.preventDefault();

      setSearchBook(e.target.value);
    }

    const viewBook = (id) => {
      setBookId(id);
      setOpen(true);
    }

    const clickList = (e, value) => {
      e.stopPropagation();
      setBookId(value);
      setOpenList(true);
    }
  
    return (
      <NavSearch title={title} filters={filters} 
      setFilters={setFilters} searchButtom={handleSearch} inputSearch={iptSearch}
      filtersForRemove={filtersForRemove} setFiltersForRemove={setFiltersForRemove}>
        {books && books.length !== 0 ? books.map((book) => (
          <ItemSeach item={book} key={book.id} onClick={(e) => viewBook(book.id)} >
            <Fab onClick={(e) => clickList(e, book.id)} size="small" sx={{bottom: "5px",left: "15px", zIndex: 0}} color="primary" aria-label="add" >
              <AddIcon />
            </Fab>
          </ItemSeach>
        )) : <Typography level="title-sm">Nenhum Resultado encontrado!</Typography>}

      <ModalBook open={open} setOpen={setOpen} clickList={clickList} bookId={bookId}/>
      <ModalList open={openList} setOpen={setOpenList} bookId={bookId}/>

      </NavSearch>
    );
  };
  
  export default Search;
  