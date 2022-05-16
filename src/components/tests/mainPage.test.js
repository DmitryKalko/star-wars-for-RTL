import React from 'react';
import axios from 'axios';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import MainPage from '../MainPage';

jest.mock("axios");  //  замокали либу аксиос

const goods = [    // замокали данные
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

const meta = {   // замокали данные
    totalPages: 2
}

const mockServerRequest = async () =>{   // мокаем ответ от сервера
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
    afterEach(cleanup);  // очищаем предыдущие моки что бы не было никаких накладок 
    it("should fetch new data and render child components", async () => {
        renderComponentWithAllMocks();

            // FIND // используется когда элемента еще нет на странице но он там ожидается (подгружается асинхронно или появится при клике)

            // GET // используется когда нужно найти статический элемент (он точно есть на странице)

            // QUERY // используется когда нужно убедиться что такого элемента нет на странице (возвращает null если нет совпадений)

        const items = await screen.findAllByTestId(/figure/i);

        expect(items).toHaveLength(3);        
    });

    it('should fetch data from defined url', () =>{ 
        renderComponentWithAllMocks(); 
        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith("https://react-test-starwars.vercel.app/api/products?page=1");
    })


    it("should render title", () => {
        const { getByText } = render(<MainPage />);
        const title = getByText(/Star Wars/i);
        expect(title).toBeInTheDocument();
    });

    // как добраться до другого роута?
    
    // it('should render input', () =>{ 
    //     renderComponentWithAllMocks();
    //     const placeholder = screen.getByPlaceholderText('Email');
    //     expect(placeholder).toBeInTheDocument(); 
    // })
});


describe("roiting testing", () => {
    it("check route to Cara Dune", () => {
        renderComponentWithAllMocks(); 
        const history = createMemoryHistory();
        const { container, getByText } = render(
            <Router history={history}>
                <RouterComponent />
            </Router>
        );

        fireEvent.click(getByText(/Buy/i));   // там используется компонент Link из react-router-dom . как эмитировать клик по нему?
        expect(container.innerHTML).toMatch('Cara Dune')
    })
})




// СПОСОБЫ ПОИСКА ЭЛЕМЕНТОВ
// - FIND - используется когда элемента еще нет на странице но он там ожидается (подгружается асинхронно или появится при клике)
// - GET - используется когда нужно найти статический элемент (он точно есть на странице)
// - QUERY - используется когда нужно убедиться что такого элемента нет на странице (возвращает null если нет совпадений)


// чем отличается fireEvent от userEvents?
// fireevent - машинное поведение, если мы берем клик то будет эмитироваться только click
// userevent - полная имитация поведения пользователя (если мы берем клик то будет эмитироваться mousedown, click, mouseup)


// !!! если мы работаем например с react router и не мокам его никак а реально проверяем переходы по роутам - это уже интеграционные тесты


// ОПИСАНИЕ
// ОТЛИЧИЯ RTL ОТ ENZYME
// - React Testing Library работает напрямую с реальными ДОМ узлами, а Enzyme работает с экземплярами отрендоренных компонентов
// - RTL не опирается на классы, айди или теги элементов, а опираентся на их содержание (эмитирует поведение пользователя)
// - снимки можно делать но по сути они не нужны поскольку мы не опираемся на внутреннюю реализацию компонента (т е при render мы увидим тоже самое что и при снапшоте)
// - используются регулярки для написания более гибких тестов (что бы не проверять точное совпадения по тексту)



// const { getByText } = render(<MainPage/>);   // getByText и другие, это методы объекта screen

// render(<MainPage/>);
// screen.debug()  // покажет разметку страницы как ее увидит пользователь

// const { asFragment } = render(<MainPage/>);
// expect(asFragment(<MainPage/>)).toMatchSnapshot()   // сделает снимок