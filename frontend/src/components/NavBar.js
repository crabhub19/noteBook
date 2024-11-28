import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect,useState,useRef } from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import noteBookLogo from '../assets/image/builtIn/noteBookLogo.png';
import noteBookLogoDark from '../assets/image/builtIn/noteBookLogoDark.png';
import Alert from './Alert';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar(props) {
  const [logo, setLogo] = useState()
  useEffect(() => {
    props.darkMode ? setLogo(noteBookLogoDark):setLogo(noteBookLogo)
  },[props.darkMode])
  const closeMobileMenu = useRef(null);

  const pathLocation = useLocation().pathname;
  let aditionalNavigation = localStorage.getItem('authToken')?[
    { name: 'notes', to: 'notes', current: pathLocation==="/notes"?true:false },
    { name: 'AddNote', to: 'addNote', current: pathLocation==="/addNote"?true:false },
    { name: 'Logout', to: 'logout', current: pathLocation==="/logout"?true:false },
  ]:[
    { name: 'Login', to: 'login', current: pathLocation==="/login"?true:false },
    { name: 'Signup', to: 'signup', current: pathLocation==="/signup"?true:false }, 
  ]
  let navigation = [
    { name: 'home', to: '/', current: pathLocation==="/"?true:false },
    ...aditionalNavigation
  ]


  return (
    <Disclosure as="nav" className="bg-gray-200 navbar dark:bg-gray-900 dark:text-black fixed min-w-full z-20">
      <div className="mx-auto max-w-7xl px-2 lg:px-6 xl:px-8">
        <div className="relative flex lg:py-0 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" ref={closeMobileMenu}>
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden lg:ml-6 lg:block my-auto">
              <div className="flex border-x-4 border-gray-500 ">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 dark:bg-gray-500 text-white' : 'text-black hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                      'ease-in-out px-8 font-medium xl:text-lg lg:text-md py-1 text-sm block',
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
  


          <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
            {/* darkmod button */}
            <button id='sun' onClick={props.toggleTheme} type="button" className="relative rounded-full bg-gray-400 p-1 text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-400 dark:bg-gray-800  dark:text-gray-400 dark:hover:text-white  dark:focus:ring-white dark:focus:ring-offset-gray-800 flex m-3 "
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 sun-icon`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 moon-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            </button>





          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className=" px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              as="a"
              to={item.to}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white dark:bg-gray-500' : 'text-black hover:bg-gray-700 hover:text-white dark:text-white dark:hover:bg-gray-200 dark:hover:text-black',
                'block px-3 py-2 hover:tracking-widest',
              )}
              onClick={() => closeMobileMenu.current.click()}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
      <Alert alert={props.alert}></Alert>
    </Disclosure>
  )
}
