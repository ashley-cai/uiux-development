import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import BookData from "./data/book-data.json";
import { BookCover } from './components/BookCover';
import { BookSpine } from './components/BookSpine'
import { GenreFilterModal } from './components/GenreFilterModal';
import { PriceFilterModal } from './components/PriceFilterModal';

function App() {
  const booksOriginal = JSON.parse(JSON.stringify(BookData));
  const [books, setbooks] = useState(JSON.parse(JSON.stringify(BookData)))
  var currentFilters = ['10', '15', '20', 'Nonfiction', 'Essays', 'Fiction']
  const [favorites, setFavorites] = useState([])

  window.addEventListener("load", function(){
    document.getElementById("genre-filter").addEventListener("submit", function (e) {
      e.preventDefault();
      getGenreData(e.target);
    });

    document.getElementById("price-filter").addEventListener("submit", function (e) {
      e.preventDefault();
      getPriceData(e.target);
    });
  });
  
  function getGenreData(form) {
    var formData = new FormData(form);
    var filters = []
    const genres = ['Nonfiction', 'Essays', 'Fiction']

    for (var i = 0; i < 3; i++){
      if (currentFilters.includes(genres[i])) {
        var a = currentFilters.indexOf(genres[i])
        currentFilters.splice(a,1)
      }
    }
  
    for (var pair of formData.entries()) {
      filters = [...filters, pair[0]]
    }

    currentFilters = [...currentFilters, ...filters]

    console.log(currentFilters)

    filterBookShelf(currentFilters)
  }

  function getPriceData(form) {
    var formData = new FormData(form);
    var filters = []
    const prices = ['10', '15', '20']

    for (var i = 0; i < 3; i++){
      if (currentFilters.includes(prices[i])) {
        var a = currentFilters.indexOf(prices[i])
        currentFilters.splice(a,1)
      }
    }
  
    for (var pair of formData.entries()) {
      filters = [...filters, pair[0]]
    }

    currentFilters = [...currentFilters, ...filters]

    console.log(currentFilters)

    filterBookShelf(currentFilters)
  }

  const getTitlesofFavorites = () => {
    const titles = favorites.map((fave, index) => {
      return fave[0]
    })
    return titles;
  }

  const addtoFavorites = (title, author, length, genre, price, color) => {
    if (!getTitlesofFavorites().includes(title)) {
      setFavorites(prev_faves => [...prev_faves, [title, author, length, genre, price, color]]) 
      // setTotalFavorites(totalFavorites+price)
    } else {
      var index = 0;
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i][0] == title) {
          index = i;
        }
      }
      favorites.splice(index, 1)
      setFavorites(prev_faves => [...prev_faves]) 
    }
  }

  const showFavorites = () => {
    if (favorites.length === 0) {
      console.log('favorites is empty')
      return <div>Favorites is empty</div>
    }

    const jsxlist = favorites.map((bookInfo, index) => {
      // console.log(bookInfo)
      return <BookSpine title={bookInfo[0]} author={bookInfo[1]} length={bookInfo[2]} genre={bookInfo[3]} price={bookInfo[4]} color={bookInfo[5]}></BookSpine> 
    })

    return jsxlist;
  }

  const showBookShelf = () => {
    const jsxlist = books.map((item, index) => {
      return <BookCover title={item.TITLE} author={item.AUTHOR} price={item.PRICE} genre={item.GENRE} img={item.IMAGE} length={item.LENGTH} favorites={favorites} onClick={()=>addtoFavorites(item.TITLE, item.AUTHOR, item.LENGTH, item.GENRE, item.PRICE, item.COLOR)}></BookCover>
    })
    return jsxlist;
  }

  const resetBookShelf = () => {
    setbooks(books => [...booksOriginal])
    currentFilters = ['10', '15', '20', 'Nonfiction', 'Essays', 'Fiction']

    document.getElementById("genre-filter").reset();
    document.getElementById("price-filter").reset();
  }

  const sortBookShelf = () => {
    if (books.length > 1) {
      if (books[0].LENGTH > books[1].LENGTH) {
        const jsxlist = books.sort(function(a, b){return a.LENGTH - b.LENGTH})
        setbooks(books => [...jsxlist]); 
      } else {
        const jsxlist = books.sort(function(a, b){return b.LENGTH - a.LENGTH})
        setbooks(books => [...jsxlist]); 
      }
    }
  }

  const filterBookShelf = (filtered) => {
    var jsxlist = [];
    var filteredBooks = [];

    jsxlist = [...books.filter(book => filtered.includes(book.GENRE))]
    // console.log(jsxlist)

    for (var i = 0; i < filtered.length; i++) {
      if (filtered[i] === "10") {
        filteredBooks = [...filteredBooks, ...jsxlist.filter(book => parseFloat(book.PRICE)<=10)]
      } else if (filtered[i] === "15") {
        filteredBooks = [...filteredBooks, ...jsxlist.filter(book => parseFloat(book.PRICE)<=15 && parseFloat(book.PRICE) > 10)]
      } else if (filtered[i] === "20") {
        filteredBooks = [...filteredBooks, ...jsxlist.filter(book => parseFloat(book.PRICE)<=20 && parseFloat(book.PRICE) > 15)]
      } 
    }
    setbooks(books => [...filteredBooks]); 
  }

  const openGenreFilterModal =() => {
    const modal = document.getElementById("genre-filter-modal")
    modal.style.display = "block"
  }

  const closeGenreModal = () => {
    const modal = document.getElementById("genre-filter-modal")
    modal.style.display = "none"
}

const openPriceFilterModal =() => {
  const modal = document.getElementById("price-filter-modal")
  modal.style.display = "block"
}

const closePriceModal = () => {
  const modal = document.getElementById("price-filter-modal")
  modal.style.display = "none"
}

const clearFavorites = () => {
  setFavorites([])
}

  return (
    <div className='page-container'>
      <GenreFilterModal onClick={() => closeGenreModal()}></GenreFilterModal>
      <PriceFilterModal onClick={() => closePriceModal()}></PriceFilterModal>
      <div className='side book-shelf'>
      <div className='sort-book-shelf'>
        <div className="reset header" onClick={()=> resetBookShelf()}>Reset</div>
        <div className="sort header">SORT:</div>
        <div className="length header" onClick={()=> sortBookShelf()}>Length</div>
        <div className="filter header">FILTER:</div>
        <div className="price header" onClick={() => openPriceFilterModal()}>Price</div>
        <div className="genre" onClick={() => openGenreFilterModal()}>Genre</div>
      </div>
        <div className='book-cover-container'>
          {showBookShelf()}
        </div>
      </div>
      <div className='side book-favorites'>
        <div className='book-favorites-container'>
          <div className='sort-book-favorites'>
            <div className="reset header" onClick={() => clearFavorites()}>Clear</div>
            <div className="sort header">Total Items:</div>
            <div className="total">{favorites.length}</div>
          </div>
          <div>{showFavorites()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
