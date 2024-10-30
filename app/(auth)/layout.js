import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <div className='sm:mx-[10%] md:mx-[15%] mx-[8px] max-w-[1200px] w-full my-8'>
      <div className='w-full py-2'>
        <Link href={'/'} className='font-bold text-2xl'>
          <h1>Decks</h1>
        </Link>
      </div>
      {children}
    </div>
  )
}