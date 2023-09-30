
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faReceipt, faInbox, faPhone, faUsers,faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
// import { faMoneyBill } from '@fortawesome/free-regular-svg-icons';

export function DashboardSideBar(){
    const options = [
        {opt: 'Overview', icon: <FontAwesomeIcon icon={faTable} />},
        {opt: 'Transactions', icon: <FontAwesomeIcon icon={faMoneyBill1Wave} />},
        {opt:'Payment', icon: <FontAwesomeIcon icon={faReceipt} />},
        {opt:'Inbox', icon: <FontAwesomeIcon icon={faInbox} />},
        {opt:'Support', icon: <FontAwesomeIcon icon={faPhone} />},
        {opt:'Community', icon: <FontAwesomeIcon icon={faUsers} />}
      ];
      
    console.log('from DASHBOARD SIDEBAR');
return(
        <div className='side-bar'>
          <ul className="side-bar-list clean-list flex">
             {options.map(option => {
               return <li key={option.opt}>{option.icon}{option.opt}</li>
            })}
          </ul>
        </div>
    )
}