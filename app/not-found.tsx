import Link from 'next/link'
export default function NotFound() { return <section className="not-found wrap"><span className="eyebrow">404 / Page not found</span><h1>A different<br />direction.</h1><p>This page isn’t here. There’s plenty of work to explore.</p><Link href="/#work" className="button button--dark">Back to selected work ↗</Link></section> }
