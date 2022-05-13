import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import FiguresList from './FiguresList';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// import { Line } from 'react-chartjs-2';


// ChartJS.register(ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
// const data = {
//     labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//     }]
// }


const MainPage = () => {

    const baseUrl = 'https://react-test-starwars.vercel.app/api/products';

    const [figuresData, setFiguresData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (fetching && currentPage < totalPages) {
            let newCurrentPage = currentPage + 1;
            setCurrentPage(newCurrentPage);
            axios.get(`${baseUrl}?page=${newCurrentPage}`)
                .then((response) => {
                    setFiguresData([...figuresData, ...response.data.data])
                    setTotalPages(response.data.meta.totalPages)
                })
                .finally(() => setFetching(false))
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 600) {
            setFetching(true)
        };
    }

    return (
        <div className='wrapper'>
            <h1 className="main-title">Star Wars <br /> Figures</h1>
            <p className="subtitle">Find the latest products for the biggest fans <br /> of the iconic saga.</p>
            {/* <div style={{ width: '300px', margin: '0 auto' }}>
                <Doughnut data={data} />
            </div>
            <Line
                datasetIdKey='id'
                data={{
                    labels: ['Jun', 'Jul', 'Aug'],
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: [5, 6, 7],
                        },
                        {
                            id: 2,
                            label: '',
                            data: [3, 2, 1],
                        },
                    ],
                }}
            /> */}

            {figuresData && (
                <FiguresList data-testid="FiguresList" figuresData={figuresData} />
            )}
        </div>
    );
};

export default MainPage;

