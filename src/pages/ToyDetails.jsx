import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy-service.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";

export function ToyDetails() {
    const [toy, setToy] = useState(null);
    const { toyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadToy();
    }, [toyId]);

    function loadToy() {
        toyService.getById(toyId)
            .then((loadedToy) => setToy(loadedToy))
            .catch((err) => {
                console.log('Had issues loading toy details', err);
                showErrorMsg('Cannot load toy');
                navigate('/toy');
            });
    }

    if (!toy) return <div>Loading...</div>;
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price.toLocaleString()}</h5>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>Available in stock: {toy.inStock ? "Yes" : "No"}</p>
            <p>Created At: {new Date(toy.createdAt).toLocaleDateString()}</p>
            <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!
            </p>
            <Link to="/toy" className="back-link">Back to Toy List</Link>
        </section>
    );
}
