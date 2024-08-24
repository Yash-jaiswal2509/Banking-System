import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            // console.log("Link token data", data);
            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        const link = await exchangePublicToken({
            publicToken: public_token,
            user
        })
        // console.log("Link", link);
        router.push("/");
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    // console.log(config);
    const { open, ready } = usePlaidLink(config);
    // console.log(ready);
    return (
        <>
            {variant === "primary" ? (
                <Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>
                    Connect Bank
                </Button>
            ) : variant === "ghost" ? (
                <Button className='plaidlink-ghost' variant={"ghost"} onClick={() => open()}>
                    <Image src={"/icons/connect-bank.svg"} alt='connect bank' width={24} height={24} />
                    <p className='text-[16px] font-semibold hidden xl:block text-black-2'>Connect Bank</p>
                </Button>
            ) : (
                <Button className='plaidlink-default' onClick={() => open()}>
                    <Image src={"/icons/connect-bank.svg"} alt='connect bank' width={24} height={24} />
                    <p className='text-[16px] font-semibold text-black-2'>Connect Bank</p>
                </Button>
            )}
        </>
    )
}

export default PlaidLink