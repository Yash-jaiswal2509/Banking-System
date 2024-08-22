import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            console.log("Link token data", data);
            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        const link = await exchangePublicToken({
            publicToken: public_token,
            user
        })
        console.log("Link", link);
        router.push("/");
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    console.log(config);
    const { open, ready } = usePlaidLink(config);
    console.log(ready);
    return (
        <>
            {variant === "primary" ? (
                <Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>
                    Connect Bank
                </Button>
            ) : variant === "ghost" ? (
                <Button>
                    Connect Bank
                </Button>
            ) : (
                <Button>
                    Connect Bank
                </Button>
            )}
        </>
    )
}

export default PlaidLink