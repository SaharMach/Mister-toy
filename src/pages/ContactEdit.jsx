const { useParams, useNavigate } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux
const { useState } = React

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { contactService } from '../services/add-contact.service.js'
import { loadContact, removeContact, saveContact } from '../store/action/contact.action.js'


export function ContactEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [txt, setTxt] = useState('')
  const { contactId } = useParams()


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

  function getContact(ev) {
    ev.preventDefault()
    contactService.getById(contactId)
      .then(contact => {
        
        console.log('contact from get',contact);
        const contactToSave = { ...contact, firstName: txt }
        console.log('contactToSave from get', contactToSave);
        saveContact(contactToSave)
          .then((savedContact) => {
            showSuccessMsg('contact saved', savedContact)
           
          })
          .catch(err => {
            console.log('Cannot update todo', err)
            showErrorMsg('Cannot update todo')
          })
          .finally(() => {
            navigate('/contact')
          })
      })
  }

  return (
    <section className="bug-edit">
      <h2>{contactId ? 'Edit' : 'Add'} Bug</h2>

      <form onSubmit={getContact}>
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}

          type="text"
          name="title"
          id="title"
        />
        <button>{contactId ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
