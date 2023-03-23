import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss"
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user)
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('password is incorrect')
                    break;
                case 'auth/user-not-found':
                    alert('Your email is incorrect')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/* <label>Display Name</label> */}

                {/* <label>Email</label> */}
                <FormInput label="Email" type="email" required onChange={handleChange} name="email"  value={email}/>

                {/* <label>Password</label> */}
                <FormInput label="Password" type="password" required onChange={handleChange} name="password"  value={password}/>

                {/* <label>Confirm Password</label> */}
                <div className="buttons-container">
                    <Button type="submit">Sign Up</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;