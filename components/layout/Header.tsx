import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Bell, Moon, SearchIcon, Sun, User } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='flex justify-between'>
      <div className='my-5'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <h3 className='text-lg text-gray-400'>Welcome Back, Here's your financial overview</h3>
      </div>
      <div className='flex items-center gap-5 ml-50'>
        <div>
          <InputGroup>
            <InputGroupInput placeholder="Search..."/>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div><Button variant={'outline'}><Bell /></Button></div>
        <div><Button variant={'outline'}><User  /></Button></div>
      </div>
    </div>
  )
}

export default Header