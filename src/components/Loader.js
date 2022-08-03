import React from "react"

const Loader = ({ isLoading }) => {
  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-50 text-white bg-black">Loading...</div>
      )}
    </div>
  )
}

export default Loader
