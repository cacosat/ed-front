import Nav from "../components/nav"

export default function MainLayout({ children }) {
  return (
    <div className='sm:mx-[10%] md:mx-[15%] mx-[8px] max-w-[1200px] w-full my-8'>
      <Nav />
      {children}
    </div>
  )
}