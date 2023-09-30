
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

  async function getToy(ev) {
    ev.preventDefault()
    try{
      const toy = await toyService.getById(toyId)
      const toyToSave = await saveToy({ ...toy, name: txt })
      navigate('/toy')

    } catch (err) {
      console.log('Cannot update toy', err)
    }
  }

  return (
    <section className="toy-edit">
      <h2>{toyId ? 'Edit' : 'Add'} Toy</h2>
      <img src="https://www.pngarts.com/files/10/Buzz-And-Woody-Toy-Story-PNG-Background-Image.png" alt="" />
      <form onSubmit={getToy}>
      <label htmlFor="name">Name:</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
          
          placeholder="Change toy name"
        />

        <button>{toyId ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
