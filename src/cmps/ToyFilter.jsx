
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilterBy,labels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, options } = target;
    
        if (field === "labels") {
          value = [...target.selectedOptions].map((option) => option.value);
        } else {
          value = type === "number" ? +value || "" : value;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
      }


    return  (
        <section className="toy-filter-section">
    <h2>Toy Filter</h2>
    <form className="toy-filter-form">
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            id="name"
            name="txt"
            className="form-input"
            placeholder="Toy name"
            value={filterByToEdit.txt}
            onChange={handleChange}
        />
        <label>In Stock:</label>
        <select name="inStock" className="form-select" value={filterByToEdit.inStock} onChange={handleChange}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>
        <label>Labels:</label>
        <select name="labels" className="form-select" value={filterByToEdit.labels} onChange={handleChange}>
            <option value="">Select...</option>
            {labels.map((label, idx) => (
                <option key={idx} value={label}>
                    {label}
                </option>
            ))}
        </select>
        <label>Sort:</label>
        <select name="sortBy" className="form-select" value={filterByToEdit.sortBy} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="created">Date</option>
        </select>
    </form>
</section>



);
}