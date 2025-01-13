import { Fragment, useState } from "react";
import ContactConnector from "../../connectors/ContactConnector";


const ContactPage = () => {

    const [contactName, setName] = useState('');
    const [contactEmail, setEmail] = useState('');
    const [contactReason, setReason] = useState('');
    const [contactMessage, setMessage] = useState('');
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [contactSending, setContactSending] = useState(false);

    const contactConn = new ContactConnector();

    const [errors, setErrors] = useState([]);

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        if (name === 'contact_name') {
            setName(value);
        }
    
        if (name === 'contact_email') {
            setEmail(value);
        }

        if (name === 'contact_reason') {
            setReason(value);
        }

        if (name === 'contact_message') {
            setMessage(value);
        }
    }

    const submit = (event) => {
        event.preventDefault();
        let contactRequest = {
            Name: contactName,
            Email: contactEmail,
            Reason: contactReason,
            Message: contactMessage,
        }
        setContactSending(true);
        contactConn.SendContactRequest(contactRequest)
        .then((response) => {
            if (response.status === 200) {
                setContactSubmitted(true);
            } else {
                setErrors([{ message: 'Message failed to send' }]);
            }
        })
        .catch((error) => {
            console.error(error);
            setErrors([{ message: 'Message failed to send' }]);
        })
        .finally(() => {
            setContactSending(false);
        });
    }

    return (
        <div id="tab-contact" className="tab-content__item">

            <div className="row tab-content__item-header">
                <div className="column">
                    {!contactSubmitted ?
                        <h1>Get In Touch</h1>
                        :
                        <Fragment>
                            <h1>Thanks for reaching out!</h1>
                            <p className="lead">I'll get back to you soon</p>
                        </Fragment>
                    }
                </div>
            </div>
            <div className="row">
                <div className="column large-six tab-full">
                    <h4>Follow me here</h4>
                    <ul className="link-list">
                        <li>
                            <a href="https://github.com/GruffJames/" aria-label="Go to Github"><i className="fab fa-github" aria-hidden="true">
                            </i> Github
                            </a>                
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/gruff-james/" aria-label="Go to LinkedIn"><i className="fab fa-linkedin" aria-hidden="true">
                            </i> LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/gruffjames/" aria-label="Go to Instagram"><i className="fab fa-instagram" aria-hidden="true">
                            </i> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">

                <div className="column">
                        {!contactSubmitted ?
                            <form>
                                <div>
                                    <label htmlFor="contact_name">Your name</label>
                                    <input className="h-full-width" 
                                        type="text" 
                                        placeholder="Your name" 
                                        id="contact_name"
                                        name="contact_name"
                                        value={contactName}
                                        onChange={onChange}/>
                                </div>
                                <div>
                                    <label htmlFor="contact_email">Your email</label>
                                    <input className="h-full-width" 
                                        type="email" 
                                        placeholder="your@email.com" 
                                        id="contact_email"
                                        name="contact_email"
                                        value={contactEmail}
                                        onChange={onChange}/>
                                </div>
                                <div>
                                    <label htmlFor="contact_reason">Reason for contacting</label>
                                    <div className="ss-custom-select">
                                        <select className="h-full-width" 
                                            id="contact_reason"
                                            name="contact_reason"
                                            value={contactReason}
                                            onChange={onChange}>
                                            <option value="">- Reason -</option>
                                            <option value="Questions">Questions</option>
                                            <option value="Work">Work</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <label htmlFor="contact_message">Message</label>
                                <textarea className="h-full-width" 
                                    placeholder="Your message" 
                                    id="contact_message"
                                    name="contact_message"
                                    value={contactMessage}
                                    onChange={onChange}/>
                            
                                <input className="btn--primary h-full-width" 
                                    type="submit" 
                                    value="Submit"
                                    onClick={submit}    
                                />
                                {contactSending ?
                                    <p>Sending...</p>
                                    :
                                    null
                                }
                                {errors.length !== 0 ? (
                                    <div className="alert-box alert-box--error hideit">
                                        <p>{errors[0].message}</p>
                                        {/* <i className="fa fa-times alert-box__close" aria-hidden="true"></i> */}
                                    </div>
                                ) : null}
                            </form>
                            :
                            null
                        }
                </div>
            </div>
        </div> 
    );
}

export default ContactPage;