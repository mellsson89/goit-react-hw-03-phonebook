import React,{Component} from "react";
import {v4 as uuidv4} from "uuid";
import style from './styles/contactForm.module.scss';

class ContactForm extends Component {


state= {
    name: '',
    number:''
}

    handleChange = (e) => {
        const {name,value}=e.currentTarget;

        this.setState({
            [name]:value
        })
    }

    handleSubmit =(e) => {
        e.preventDefault();

        const contact = {
            id:uuidv4(),
            name:this.state.name,
            number: this.state.number
        }

     this.props.onSubmit(contact)
        this.resetForm()

    }

    resetForm =() => {
        this.setState({
            name:'',
            number:''
        })
    }

render() {

    const {name,number}=this.state;

    return (
        <form onSubmit={this.handleSubmit} className={style.form}>
            <label className={style.formLabel}>
                Name
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                    className={style.formInput}
                />
            </label>
            <label className={style.formLabel}>
                Number
                <input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                    className={style.formInput}
                />
            </label>
            <button type='submit'>Add contact</button>
        </form>

    )
}
}
export default ContactForm;