import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body { background-image: url("background.png"); background-position: center; background-repeat: no-repeat; background-size: cover;  }`}}></style>
      <Component {...pageProps} />
    </>
  )
}

export default Application
