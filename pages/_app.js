import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body { background: #ce422b }`}}></style>
      <Component {...pageProps} />
    </>
  )
}

export default Application
