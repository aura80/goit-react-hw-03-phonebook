import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    // calls a prop function 'onAddContact', which is sent from parent App comp to the ContactForm comp
    // to add a new contact to the list of contacts- it sends contact info to the parent App
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  // when the user submits the form handleSubmit method is on, calls this.props.onAddContact() which 
  // takes the new name and number added in form to put it as new in contact list
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.formclass}>
        <label className={styles.labelclass}>
          Name
          <input
            className={styles.inputclass}
            type="text"
            name="name"
            pattern="^[a-zA-Z]+((['\-\s][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.labelclass}>
          Number
          <input
            className={styles.inputclass}
            type="tel"
            name="number"
            pattern="^\d{3}-\d{2}-\d{2}$|^\d{10,14}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={styles.buttonclass}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
