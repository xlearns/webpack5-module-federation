import React from 'react'

const Button2 = React.lazy(() => import('app_02/Button2'))
// const Button3 = React.lazy(() => import('app_03/Button3'))

function App() {
  return (
    <>
      <div>app01-home</div>
      <Button2 />
    </>
  )
}

export default App
