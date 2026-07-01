import { SiteFooter } from '@/components/layout/site-footer';
import Header from '@/components/layout/header';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Header user={user} />
            <main>{children}</main>
            <SiteFooter />
        </div>
    );
}