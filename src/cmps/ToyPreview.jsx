import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article className="toy-card">
            <div className="card-header">
                <h4>{toy.name}</h4>
            </div>
            <div className="card-body">
                <p><strong>Price:</strong> ${toy.price}</p>
                <p><strong>Labels:</strong> {toy.labels}</p>
            </div>
            <div className="card-footer">
                <Link to={`/toy/${toy._id}`} className="btn-details">Details</Link>
            </div>
        </article>
    )
}


