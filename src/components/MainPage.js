import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import FiguresList from './FiguresList';

const MainPage = () => {

    const baseUrl = 'https://react-test-starwars.vercel.app/api/products';

    const [figuresData, setFiguresData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () =>{
        let newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage); 
        const response = await axios.get(`${baseUrl}?page=${newCurrentPage}`);
        setFiguresData([...figuresData, ...response.data.data])
        setTotalPages(response.data.meta.totalPages);
        setFetching(false);
    }

    useEffect(() => {
        if (fetching && currentPage < totalPages) {
            fetchData();
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 600 ) {
            setFetching(true)
        };
    }

    return (
        <div className='wrapper'>
            <h1 className="main-title">Star Wars <br /> Figures</h1>
            <p className="subtitle">Find the latest products for the biggest fans <br /> of the iconic saga.</p>
            {figuresData && (
                <FiguresList data-testid="FiguresList" figuresData={figuresData} />
            )}
        </div>
    );
};

export default MainPage;

