import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event';
import MainPage from '../MainPage';

// ОПИСАНИЕ
// ОТЛИЧИЯ RTL ОТ ENZYME
// - React Testing Library работает напрямую с реальными ДОМ узлами, а Enzyme работает с экземплярами отрендоренных компонентов
// - RTL не опирается на классы, айди или теги элементов, а опираентся на их содержание (эмитирует поведение пользователя)
// - снимки можно делать но по сути они не нужны поскольку мы не опираемся на внутреннюю реализацию компонента (т е при render мы увидим тоже самое что и при снапшоте)
// - используются регулярки для написания более гибких тестов (что бы не проверять точное совпадения по тексту)





// чем отличается fireEvent от userEvents?



//jest.mock("axios");  //  замокали либу аксиос

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

    it("should have title", () => {
       const { getByText } = render(<MainPage/>);   // getByText и другие, это методы объекта screen
       const titleElement = getByText(/Star Wars/i);
       expect(titleElement).toBeInTheDocument();

    //    render(<MainPage/>);
    //    screen.debug()  // покажет разметку страницы как ее увидит пользователь

    // const { asFragment } = render(<MainPage/>);
    // expect(asFragment(<MainPage/>)).toMatchSnapshot()
    });


    // it("fetch new data", async () => {
    //     axios.get.mockImplementationOnce(() => Promise.resolve({data: {goods}}));
    //     // const { getByTestId } = render(<MainPage/>);
    //     // const items = await getByTestId('FiguresList');
    //     // expect(items).toHaveLength(3)


    //     expect(axios.get).toBeCalledTimes(1);
    //     expect(axios.get).toBeCalledWith("https://react-test-starwars.vercel.app/api/products");
    // })
});