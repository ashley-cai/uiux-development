export function BookCover({title, author, price, genre, img, onClick, length, favorites}) {

    const getTitlesofFavorites = () => {
        const titles = favorites.map((fave, index) => {
          return fave[0]
        })
        return titles;
      }

    const alreadyAdded = !getTitlesofFavorites().includes(title)

    return (
        <div className="book-cover" onClick={onClick}>
            <div className={alreadyAdded ? "overlay-notadded" : "invisible"}>CLICK TO ADD TO FAVORITES</div>
            <div className={alreadyAdded ? "invisible" : "overlay-added"}>CLICK TO REMOVE FROM FAVORITES</div>
            <img className="book-cover-image" src={img}></img>
            <div className="book-cover-title">{title}</div>
            <div className="book-cover-author">by {author}</div>
            <div className="filters-wrapper">
                <div className="book-cover-price small">${price}</div>
                <div className="book-cover-genre small">{genre}</div>
                <div className="book-cover-length small">{length} pgs</div>
            </div>

            {/* <div>{genre}</div> */}
        </div>
    );
  }