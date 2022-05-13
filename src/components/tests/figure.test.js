import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Figure from '../Figure';


describe('Figure component', () => {

    // it("should have name of figure", () => {
    //    const { getByText } = render(<Figure/>); 
    //    const nameOfElement = getByText('Cara Dune');    // не находит потому что эти данные подгружаются 
    //    expect(nameOfElement).toBeInTheDocument();
    // });

    it("renders Figure component", () => {
        render(<Figure/>);
        expect(screen.getByText('Cara Dune')).toBeInTheDocument()
        
    })
});