import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'

// this is a Server Component. It runs on the server and can await data directly, 
// with no useEffect and no loading state to manage by hand. 
// This is a big Next.js vs. plain React difference (interview gold!).
async function Terms() {
    // <Suspense>: shows “Loading…” while the data is on its way. 
    // Next.js 16 wants slow data wrapped like this.

    //{ data, error }: Supabase never throws. 
    // It always hands you both, and one of them is empty.
    const {data, error } = await supabase.from('term').select('text');
    return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>

}

export default function TestPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Terms />
        </Suspense>
    )
}