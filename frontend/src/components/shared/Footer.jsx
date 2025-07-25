import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-20">
      <p className="text-sm">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
