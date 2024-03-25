export function BookSpine({title, author, length, price, genre, color, img}) {

    const spineStyle = {
        backgroundColor: color,
        height: length/4 + "px"
      };

    return (
        <div className="book-spine" style={spineStyle}>
            <div className="title-author">
                <span className="book-spine-title">{title.toUpperCase()}</span>
                <span className="book-spine-author"> by {author}</span>
            </div>
        </div>
    );
  }

