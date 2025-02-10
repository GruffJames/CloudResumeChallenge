import { useEffect, useState } from "react";
import MetricConnector from "../connectors/MetricConnector";

const Footer = () => {

    const [viewCount, setViewCount] = useState([]);

    useEffect(() => {
        const MetricConn = new MetricConnector();
        MetricConn.GetViewCount()
            .then(response => {
                setViewCount(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // setError('Failed to get view count');
            });
    }, []); // Add an empty dependency array

    return (
        <footer>

            <div className="ss-copyright">

                <span>{viewCount.view_counter || ''}</span>
                <span>Design by <a href="https://www.styleshout.com/">StyleShout</a> Distributed By <a href="https://themewagon.com">ThemeWagon</a></span>
            </div>

            <div className="ss-go-top">
                <a className="smoothscroll" title="Back to Top" href="#top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z"></path></svg>
                </a>
            </div>
        </footer>
    );
}

export default Footer;