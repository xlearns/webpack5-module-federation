import React, { Suspense } from 'react'

const Button2 = React.lazy(() => import('app_02/Button'))
const Button3 = React.lazy(() => import('app_03/Button'))

function App() {
  return (
    <>
      <div>app01-home</div>
      <Suspense fallback={'loading...'}>
        <Button2 />
      </Suspense>
      <Button3 />
    </>
  )
}

export default App
