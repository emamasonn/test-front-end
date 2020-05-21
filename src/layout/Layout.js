import Head from 'next/head';
import Navbar from '../components/NavBar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Expenses Account</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;