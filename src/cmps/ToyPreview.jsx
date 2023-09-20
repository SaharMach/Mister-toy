import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article className="toy-item">
            <h4>{toy.name}</h4>
            {/* <h1>⛐</h1> */}
            <p>Price: <span>${toy.price}</span></p>
            <p>Labels: {toy.labels}</p>
            <hr />
            <Link to={`/toy/${toy._id}`} className="details-link">Details</Link>
        </article>
    )
}