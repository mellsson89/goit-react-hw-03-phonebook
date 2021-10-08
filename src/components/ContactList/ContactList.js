import React from "react";
import PropTypes from 'prop-types';
import style from './styles/contactList.module.scss'

const ContactList = ({contacts,onDelete}) => {
    return (
        <ul>
            {contacts.map(({id,name,number})=> (

                <li key={id} className={style.contactList_item}>{name}: {number} <button onClick={() => onDelete(id)}>Delete</button></li>

            ))}
        </ul>
    )
}

ContactList.propTypes={
    contacts:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        number:PropTypes.string.isRequired
    })).isRequired
}

export default ContactList;