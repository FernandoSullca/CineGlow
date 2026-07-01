'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect(`/login?message=Error: ${error.message}`);
    }

    return redirect('/');
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/login');
}


export async function signup(formData: FormData) {
    const origin = (await headers()).get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    //    Se envían las credenciales a Supabase para que las verifique.
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });
    // Si hay un error (ej: contraseña incorrecta), se redirige con un mensaje.
    if (error) {
        return redirect(`/register?message=Error: ${error.message}`);
    }

    return redirect('/register?message=Revisá tu email para confirmar la cuenta');
}