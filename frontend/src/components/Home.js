
import {React,useEffect} from 'react'
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight/4);
}, []);
  return (
    <>
    <section className='bg-white dark:bg-black flex justify-center items-center p-16 '> 
      <div className='backdrop-blur-sm border rounded bg-transparent flex flex-col justify-center items-center lg:max-w-4xl fixed mix-blend-difference  text-white p-6 shadow-lg'>
        <h1 className=' lg:text-7xl text-4xl p-8 text-center font-blazeberg'>Welcome to NoteBook <hr /></h1>
        <p className='indent-20'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic magni veritatis ullam cum autem adipisci eos recusandae aliquid ducimus harum ut sed, blanditiis asperiores, unde ratione, deleniti dolorem quis tempore nemo impedit consequatur molestiae perspiciatis? Magni aliquam asperiores dolore, est, iure sequi minima doloribus temporibus harum eaque, provident atque perspiciatis iste voluptatum consectetur quidem ratione minus cupiditate odio mollitia alias. Iure sed molestias ipsam reiciendis omnis deleniti voluptas consequatur voluptatem doloremque! Tempora adipisci delectus consequuntur cumque. Repellendus maxime facilis expedita modi eos esse vero ducimus non. Quo, quae tenetur temporibus natus ad a, eligendi maiores vero nemo totam doloribus possimus.</p>
      </div>
    </section>
    <section className='bg-black dark:bg-white scroll-smooth'></section>
    </>

  )
}
