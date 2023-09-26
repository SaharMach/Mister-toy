
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy-service.service.js'
import { saveToy } from '../store/action/toy.action.js'


export function ToyEdit() {
  const navigate = useNavigate()
//   const user = useSelector(storeState => storeState.loggedinUser)
  const dispatch = useDispatch()
  const [txt, setTxt] = useState('')
  const { toyId } = useParams()


  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }
    setTxt(value)
  }

  function getToy(ev) {
    ev.preventDefault()
    toyService.getById(toyId)
      .then(toy => {
        const toyToSave = { ...toy, name: txt }
        saveToy(toyToSave)
          .then(() => {
                navigate('/toy')
          })
          .catch(err => {
            console.log('Cannot update todo', err)
            // showErrorMsg('Cannot update todo')
          })
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyId ? 'Edit' : 'Add'} Toy</h2>
      <img src="https://www.pngarts.com/files/10/Buzz-And-Woody-Toy-Story-PNG-Background-Image.png" alt="" />
      <form onSubmit={getToy}>
      <label htmlFor="price">Price:</label>
        <input
          onChange={handleChange}
          type="number"
          name="price"
          id="price"
          min="0"
          step="1"
          placeholder="$0.00"
        />

        <button>{toyId ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
