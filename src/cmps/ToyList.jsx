import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="toy-actions">
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <Link to={`/toy/edit/${toy._id}`}>
                                    <button className="edit-btn">Edit</button>
                        </Link>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>
                    {/* <button className="buy" onClick={() => addToCart(toy)}>Add to Cart</button> */}
                </li>
            )}
        </ul>
    );
}


// CarList.propTypes = {
//     txt(props, propName, cmpName) {
//         // console.log('props:', props)
//         // console.log('propName:', propName)
//         // console.log('cmpName:', cmpName)
//         if (typeof props.txt !== 'string') {
//             return new Error('Not a string')
//         }
//     },
//     nums: PropTypes.arrayOf(PropTypes.number),
//     cars: PropTypes.arrayOf(PropTypes.shape({
//         vendor: PropTypes.string,
//         price: PropTypes.number,
//         speed: PropTypes.number,
//     })),
// }