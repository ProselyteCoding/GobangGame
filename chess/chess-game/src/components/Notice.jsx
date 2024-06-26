import "../App.css";

function Notice({ condition, xIsNext }) {
  let notice;
  if (condition === "Unfinished") {
    if (xIsNext) {
      notice = (
        <div>
          <div className="condition">State:Unfinished</div>
          <div className="turn">NextTurn:X</div>
        </div>
      );
    } else {
      notice = (
        <div>
          <div className="condition">State:Unfinished</div>
          <div className="turn">NextTurn:O</div>
        </div>
      );
    }
  } else {
    notice = (
      <div className="winner">
        Winner:{condition}!<br></br>Congratulations!
      </div>
    );
  }

  return (
    <div className="notice">
      <div className="boundary">{notice}</div>
    </div>
  );
}
export default Notice;
