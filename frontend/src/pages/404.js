import * as React from "react"
import { Link } from "gatsby"
// import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';

// const pageStyles = {
//   color: "#232129",
//   padding: "96px",
//   fontFamily: "-apple-system, Roboto, sans-serif, serif",
// }
// const headingStyles = {
//   marginTop: 0,
//   marginBottom: 64,
//   maxWidth: 320,
// }

// const paragraphStyles = {
//   marginBottom: 48,
// }

const NotFoundPage = () => {
  return (
    <>
      <section className="empty-page-section s-py-sec">
        <div className="container m-auto px-[15px] pt-10">
          <div className="text-center">
            <h1 className="text-white mb-5">Page not found</h1>
            <p className="text-white mb-10"> Sorry 😔, we couldn’t find what you were looking for.</p>
            <Link to="/" className="m-auto max-w-[200px] flex justify-center text-white bg-primary-clr items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#000] duration-[400ms,700ms]">Go home</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
