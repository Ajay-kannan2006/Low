import React, { useEffect, useState } from 'react'
import axios from 'axios'
import signupImage from '../../public/signup.png'
import { Form, Link, useNavigate } from 'react-router-dom'
import { use } from 'react'
import Cookies from 'js-cookie';


const Signup = () => {

    const [error, setError] = useState({});
    const [isExist, setIsExist] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(
                  "http://localhost:8080/api/auth/check-user",
                  { withCredentials: true }
                );
                console.log(res);

                if (res.data.logged) {
                    navigate('/home');
                }
            } catch (error) {
                console.error("Error checking user:", error);
            }
        };

        checkUser();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(formData);

        const newError = {};
        if (!username.trim()) {
            newError.username = "FullName is required";
        }
        else if (username.length < 3) {
            newError.username = "Fullname must be at least 3 character"
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.trim()) {
            newError.email = "Email is required";
        }
        else if (!emailRegex.test(email)) {
            newError.email = "Invalid email format";
        }

        if (!password.trim()) {
            newError.password = "password is required";
        }
        else if (password.length <= 4) {
            newError.password = "password must be at least 4 character"
        }

        if ((Object.keys(newError).length) > 0) {
            setError(newError);
            console.log("Error founded");

            return;
        }

        console.log("ended");

        setError({});
        setIsExist(false);
        setErrorMessage("");

        try {
            const res = await axios.post(
              "http://localhost:8080/api/auth/register",
              {
                username,
                email,
                password,
              },
              { withCredentials: true }
            );

            console.log("Registration successful", res.data);
            navigate('/home');
        } catch (err) {
            setIsExist(true);
            setErrorMessage(err.response.data.message);

            console.log(err.response.data.message);
            console.error("Error adikuthu:", err.response ? err.response.data : err.message);
        }

    }

    return (
        <div className='w-full h-screen flex items-center justify-center flex-col gap-8'>
            <div className='w-80 text-center'>
                <p className='text-xl border-b-1 w-full'>
                    <span className='font-bold text-blue-600'>Low Code</span> / Sketch to Code
                </p>
            </div>
            <div className='w-[850px] text-center flex flex-col gap-4'>
                <p className='font-bold items-center text-2xl border-b-1 w-full'>Create a New Account</p>
                <div className='flex items-center justify-center'>
                    <form className='flex flex-col w-[400px] h-full gap-3 items-center justify-center' onSubmit={handleSubmit}>
                        {console.log("namastha")}
                        <div className="flex flex-col items-start justify-center ml-[300px]">
                            <label htmlFor="" className="text-black text-sm font-medium relative left-2.5">
                                Fullname
                            </label>
                            <input
                                type="text"
                                name='username'
                                className="border-2 border-[#d5d5d7] w-80 h-11 bg-[#f6f6f9] rounded-[9px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                            {error.username && <p className="text-red-500 text-sm px-2">{error.username}</p>}
                        </div>

                        <div className="flex flex-col items-start justify-center ml-[300px]">
                            <label htmlFor="" className="text-black text-sm font-medium relative left-2.5">
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="border-2 border-[#d5d5d7] w-80 h-11 bg-[#f6f6f9] rounded-[9px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                            {error.email && <p className="text-red-500 text-sm px-2">{error.email}</p>}
                        </div>

                        <div className="flex flex-col items-start justify-center ml-[300px]">
                            <label htmlFor="" className="text-black text-sm font-medium relative left-2.5">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                className="border-2 border-[#d5d5d7] w-80 h-11 bg-[#f6f6f9] rounded-[9px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                            {error.password && <p className="text-red-500 text-sm px-2">{error.password}</p>}
                        </div>

                        {/* buttons */}
                        <div className='flex flex-col gap-1'>
                            {isExist && <p className='text-red-500 text-sm px-2'>{errorMessage}</p>}
                            <button className='bg-[#632379] w-80 h-11 text-white px-3 py-2 font-medium shadow-md transition duration-300 hover:bg-[#7a2c94] hover:shadow-lg active:scale-95  rounded-3xl border border-transparent mt-1' style={{ borderRadius: '9px' }}>Register</button>
                            <p className='mt-1'>Already have a Account? <Link to="/signin" className='text-blue-500 cursor-pointer '>Signin</Link></p>
                        </div>
                    </form>
                    <div>
                        <img src={signupImage} alt="image" className='h-[350px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup