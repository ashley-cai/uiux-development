export function PriceFilterModal({onClick}) {

    return (
        <div className="price-filter-modal" id = "price-filter-modal">
            <form id="price-filter" className="checkbox-container">
                <input type="checkbox" id="one-to-ten" name="10" value="10"></input>
                <label for="Nonfiction">$1 - $10</label><br></br>
                <input type="checkbox" id="ten-to-fifteen" name="15" value="15"></input>
                <label for="Essays">$10-$15</label> <br></br>
                <input type="checkbox" id="fifteen-to-twenty" name="20" value="20"></input>
                <label for="Fiction">$15-$20</label> <br></br><br></br>
                <input type="submit" id="submit-button" className="modal-button" onClick={onClick}></input>
            </form>
        </div>
    );
  }