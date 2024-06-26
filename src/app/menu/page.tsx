import Link from 'next/link'
import React from 'react'
import { MenuType } from '@/types/types'


const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/categories`, {
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");

  }

  return res.json()
}

const MenuPage = async () => {

  const menu:MenuType = await getData()

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      
      {menu.map(category=> (
        <Link key={category.id} href={`/menu/${category.slug}`} className="w-full flex-1 bg-cover p-8 " style={{backgroundImage: `url(${category.img})`}}>
          
          <div className={`text-${category.color} w-1/2`}>
            <h1 className='uppercase font-bold text-3xl'>{category.title}</h1>
            <p className='text-sm my-8'>{category.desc}</p>
            <button type='button' className={`hidden md:block bg-${category.color} text-${category.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md`}>Explore</button>
          </div>
        
        </Link>
      ))}
      
      </div>




  )
}

export default MenuPage