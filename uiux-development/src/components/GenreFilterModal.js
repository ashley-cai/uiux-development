export function GenreFilterModal({onClick}) {

    return (
        <div className="genre-filter-modal" id = "genre-filter-modal">
            <form id="genre-filter" className="checkbox-container">
                <input type="checkbox" id="Nonfiction" name="Nonfiction" value="Nonfiction"></input>
                <label for="Nonfiction">Nonfiction</label><br></br>
                <input type="checkbox" id="Essays" name="Essays" value="Essays"></input>
                <label for="Essays">Essays</label> <br></br>
                <input type="checkbox" id="Fiction" name="Fiction" value="Fiction"></input>
                <label for="Fiction">Fiction</label> <br></br><br></br>
                <input type="submit" id="submit-button" className="modal-button" onClick={onClick}></input>
            </form>
        </div>
    );
  }