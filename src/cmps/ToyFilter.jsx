
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import BasicSelect from './BasicSelect.jsx'; 
import MultipleSelectChip from './MultpleSelectChip.jsx'
import BasicTextFields from "./BasicTextField.jsx";



export function ToyFilter({ filterBy, onSetFilterBy,labels }) {
    console.log('from filter' ,labels);
    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, options } = target;
        if (type === 'select-multiple') { //active by click shift
            value = Array.from(target.selectedOptions, (option) => option.value)
        } else {
          value = type === "number" ? +value || "" : value;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
      }



    return  (
        <section className="toy-filter-section">
        <form className="toy-filter-form">
            <BasicTextFields name={'txt'} handleChange={handleChange} value={filterByToEdit.txt} />
            <MultipleSelectChip labels={labels} handleChange={handleChange} value={filterByToEdit.labels} />

            <BasicSelect field={'inStock'} props={[{value:'', display:'All'},
            {value:'true', display:'Yes'}, {value:'false', display:'No'}]}
            value={filterByToEdit.inStock} handleChange={handleChange} />

            <BasicSelect field={'sortBy'} props={[{value:'', display:'Select...'},
            {value:'name', display:'Name'}, {value:'price', display:'Price'}, {value:'created', display:'Date'}]}
            value={filterByToEdit.sortBy} handleChange={handleChange} />
            </form>
        </section>
)
}