import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Product from '../Product';


describe('Product component', () => {

    it("should have input", () => {
        const {getByPlaceholderText}  = render(<Product/>);
        const placeholder = getByPlaceholderText('Email');
        expect(placeholder).toBeInTheDocument(); 
    })
});

// fireevent - машинное поведение, если мы берем клик то будет эмитироваться только click
// userevent - полная имитация поведения пользователя (если мы берем клик то будет эмитироваться mousedown, click, mouseup)


// !!! если мы работаем например с react router и не мокам его никак а реально проверяем переходы по роутам - это уже интеграционные тесты
