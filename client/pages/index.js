import axios from "axios";

const LandingPage = ({ currentUser }) => {
    // console.log(currentUser);
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // });
    console.log(currentUser);
    return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
    console.log(req.headers);
    if (typeof window === 'undefined') {
        // we are on server. so the requests needs to be sent to http://SERVICENAME.NAMESPACE.svc.cluster.local
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
            headers: req.headers,
        });
        console.log(`I AM IN NODE SERVER AND USER DATA IS : ${data.currentUser}`);
        return data;
    } else {
        // we are on browser and requests can be made with a base url of ''
        console.log('I AM IN THE BROWSER');
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    }
};

export default LandingPage;