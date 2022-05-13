import React from 'react';
import axios from 'axios';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import MainPage from '../MainPage';
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");  //  замокали либу аксиос

const goods = [
    {
        "id": 1,
        "shortDescription": "Veteran of the Galactic Civil War who fought under the banner of the Rebellion.",
        "image": "/star-wars/img-01.jpg",
        "name": "Cara Dune",
        "price": 1599
    },
    {
        "id": 2,
        "shortDescription": "She's a force-sensitive human who became Jedi after years of living as scavenger.",
        "image": "/star-wars/img-02.jpg",
        "name": "Rey Skywalker",
        "price": 1599
    },
    {
        "id": 3,
        "shortDescription": "Imperial service. Gideon is a human who serves as an officer in the Imperial Security",
        "image": "/star-wars/img-03.jpg",
        "name": "Moff Gideon",
        "price": 1599
    },
];

const meta = {
    totalPages: 2
}

const mockServerRequest = async () =>{
    axios.get.mockReturnValue({data: {data: [...goods], meta: {...meta}}}); 
}

const renderComponentWithAllMocks = () => {
    mockServerRequest();
    render(
        <MemoryRouter>
            <MainPage />
        </MemoryRouter>
        );
}

describe('MainPage', () => {
    afterEach(cleanup);
    it("should fetch new data and render child components", async () => {
        renderComponentWithAllMocks();

            // FIND // ASYNC

            // GET // fail test 

            // QUERY // return null 

        const items = await screen.findAllByTestId(/figure/i);

        expect(items).toHaveLength(3);        
    });

    it('should fetch data from defined url', () =>{ 
        renderComponentWithAllMocks();
        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith("https://react-test-starwars.vercel.app/api/products?page=1");
    })
});