import 'bootstrap/dist/css/bootstrap.css';
//https://medium.com/nextjs/how-to-add-bootstrap-in-next-js-de997371fd9c -- this page explains why next.js needs to have global-css wired into server this way
export default ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};