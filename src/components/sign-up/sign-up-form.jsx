import { useState } from 'react'

import { 
    createUserDocumentFromAuth,
    createUserAuthWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input';
import Button from '../button/button'
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const SignUpForm= () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Your passwords don't match!");
            return;
        }
        
        try {
            const { user } = await createUserAuthWithEmailAndPassword(
                email, 
                password
            );            
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                console.error(error);
            }
        };
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />
                <FormInput 
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />
                <FormInput 
                    label='Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <FormInput 
                    label='Confirm Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />
                <Button buttonType={''} type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}