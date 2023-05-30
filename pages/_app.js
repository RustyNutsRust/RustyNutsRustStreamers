import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body { background-image: url("background.png"); box-shadow: 0 0 8px 8px white inset; background-position: center; background-repeat: no-repeat; background-size: cover;  }`}}></style>
      <Component {...pageProps} />
    </>
  )
}

export default Application
