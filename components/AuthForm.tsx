"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { use, useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'

import { authFormSchema } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import PlaidLink from './PlaidLink'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // const loggedInUser = getLoggedInUser();

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            // sign up with appwrite

            if (type === "sign-up") {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email!,
                    password: data.password!
                }

                const newUser = await signUp(userData);
                console.log("New User, ", newUser);
                setUser(newUser);
            }


            if (type === "sign-in") {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })

                console.log("Response", response);

                if (response) {
                    router.push("/");
                }
            }


        } catch (error) {
            console.error("Error", error);
        }

        setLoading(false);
    }

    return (
        <div className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" className="size-[24px] max-xl:size-14" />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>

                    <p className='text-16 font-normal text-gray-600'>
                        {user
                            ? "Link your account to get started"
                            : "Please enter your details"
                        }
                    </p>
                </div>
            </header>

            {user ? (
                <div className='flex flex-col gap-4'>
                    <PlaidLink user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput props={{
                                            control: form.control,
                                            name: "firstName",
                                            placeholder: "Enter your first name",
                                            label: "First Name"
                                        }} />

                                        <CustomInput props={{
                                            control: form.control,
                                            name: "lastName",
                                            placeholder: "Enter your last name",
                                            label: "Last Name"
                                        }} />
                                    </div>


                                    <CustomInput props={{
                                        control: form.control,
                                        name: "address1",
                                        placeholder: "Enter your specific address",
                                        label: "Address"
                                    }} />

                                    <CustomInput props={{
                                        control: form.control,
                                        name: "city",
                                        placeholder: "Enter your city",
                                        label: "City"
                                    }} />

                                    <div className='flex gap-4'>
                                        <CustomInput props={{
                                            control: form.control,
                                            name: "state",
                                            placeholder: "ex: NY",
                                            label: "State"
                                        }} />

                                        <CustomInput props={{
                                            control: form.control,
                                            name: "postalCode",
                                            placeholder: "ex: 12345",
                                            label: "Postal Code"
                                        }} />
                                    </div>

                                    <div className='flex gap-4'>

                                        <CustomInput props={{
                                            control: form.control,
                                            name: "dateOfBirth",
                                            placeholder: "YYYY-MM-DD",
                                            label: "Date of Birth"
                                        }} />

                                        <CustomInput props={{
                                            control: form.control,
                                            name: "ssn",
                                            placeholder: "ex: 1234",
                                            label: "SSN"
                                        }} />
                                    </div>
                                </>
                            )}

                            <CustomInput props={{
                                control: form.control,
                                name: "email",
                                placeholder: "Enter your email",
                                label: "Email"
                            }} />

                            <CustomInput props={{
                                control: form.control,
                                name: "password",
                                placeholder: "Enter your password",
                                label: "Password"
                            }} />

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn hover:brightness-90' disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader size={20} className='animate-spin' />&nbsp;
                                            {type === "sign-in" ? "Signing in..." : "Signing up..."}
                                        </>
                                    ) : type === "sign-in" ? "Sign In" : "Sign Up"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className='flex items-center justify-center gap-1'>
                        <p>
                            {type === "sign-in" ? "Don't have an account?" : "Already have an account"}
                        </p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className='form-link hover:underline'>
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </footer>
                </>
            )}
        </div>
    )
}

export default AuthForm