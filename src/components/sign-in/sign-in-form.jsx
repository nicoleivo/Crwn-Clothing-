import { useState } from 'react'

import { 
    signInWithGooglePopUp, 
    signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input'
import Button from '../button/button'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
};

export const SignInForm = ( {handleGoogle} ) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { user } = await signInAuthWithEmailAndPassword(
                email, 
                password
            );
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('incorrect email');
                    break;
                default:
                    console.log(error);
            }
        };
    };

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type="text" 
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
                <div className='buttons-container'>
                    <Button buttonType={''} type='submit'>Sign In</Button>
                    <Button 
                        type='button'
                        onClick={signInWithGoogle} 
                        buttonType={'google'}
                    >
                      Google Sign-in
                    </Button>
                </div>
            </form>
        </div>
    )
}