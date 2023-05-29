import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body { background-image: url("background.png"); }`}}></style>
      <Component {...pageProps} />
    </>
  )
}

export default Application
