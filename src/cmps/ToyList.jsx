import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import {CircularIndeterminate} from '../cmps/Loader.jsx'

import {ImgMediaCard} from './GoogleCard.jsx'
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    console.log(toys);
    if(!toys.length) return <CircularIndeterminate />
    return (
        <section className="toy-list">
        {toys ? toys.map(toy => (
            <div className="toy-preview" key={toy._id}>
                <ImgMediaCard onRemoveToy={onRemoveToy} toy={toy} />
                <div className="toy-actions">
                {/* <Link to={`/toy/edit/${toy._id}`} className="edit-link">
                        <button className="edit-btn">Edit</button>
                    </Link> */}
                    {/* <button onClick={() => onRemoveToy(toy._id)}>x</button> */}
                    
                </div>
                
            </div>
        )) :
        <CircularIndeterminate />
        }
    </section>
    )
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