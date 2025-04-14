import {useState} from 'react';
import './headbar.css';

function Headbar(){
  const [activeItem, setActiveItem]=useState('allPhotos');

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  }

  return(
    <div>
      <nav className='headbar'>
        <ul className='headbar-menu'>
          <li >
            <button
                type='button'
                className={
                  activeItem === 'allPhotos'
                    ? 'active'
                    : 'inactive'
                }
                onClick={() => handleItemClick('allPhotos')}
              >
              <span>All Photos</span>
            </button>
          </li>

          <li>
            <button
                type='button'
                className={
                  activeItem === 'editedPhotos'
                    ? 'active'
                    : 'inactive'
                }
                onClick={() => handleItemClick('editedPhotos')}
              >
              <span>Edited Photos</span>
            </button>
          </li>
          </ul>
          </nav>
    </div>
  )

}

export default Headbar;
