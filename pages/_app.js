import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body { background-image: url("background.png"); background-repeat: no-repeat, background-position: center; background-size: cover; }`}}></style>
      <Component {...pageProps} />
    </>
  )
}

export default Application
