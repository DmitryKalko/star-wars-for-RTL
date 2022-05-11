import React from "react";
import Figure from './Figure';

const FiguresList = (props) => {
    const { figuresData } = props;

    const allFigures = figuresData.map(figure => (
        <Figure key={figure.id} {...figure}/>
    ));

    return (
        <div className="figuresContainer">
            {allFigures}
        </div>
    );
};

export default FiguresList;