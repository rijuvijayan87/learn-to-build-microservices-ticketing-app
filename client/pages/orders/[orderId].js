import { useEffect, useState } from "react";

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const findTimeLeft = () => {
            const millisecondsLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(millisecondsLeft / 1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div>Sorry...Order Expired</div>;
    }
    return <div>Time left to pay: {timeLeft} seconds</div>;
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};
export default OrderShow;