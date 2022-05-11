import React from 'react';
import axios from 'axios';
import { render, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import MainPage from '../MainPage';

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


describe('MainPage', () => {
    it("fetch new data", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: {goods}}));
        // const { getByTestId } = render(<MainPage/>);
        // const items = await getByTestId('FiguresList');
        // expect(items).toHaveLength(3)


        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith("https://react-test-starwars.vercel.app/api/products");
    })
});