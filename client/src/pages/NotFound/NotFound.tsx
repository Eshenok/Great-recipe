import { FC } from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound: FC = () => {

  const error = useRouteError();
  console.error(error);

  return (
    <section className="not-found">
      <h2 className="not-found__title">Not Found, Error 404</h2>
      <Link to={'/'} className="not-found__link">Main</Link>
    </section>
  )
}

export default NotFound;