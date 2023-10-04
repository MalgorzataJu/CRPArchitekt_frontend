import {forEach} from "react-bootstrap/ElementChildren";

interface Props {
    countPages: number,
    activeNumber:number,
    totalCount: number,
    handlePageChange: (number: number) => void;
}
export const Pagination = (props:Props) => {

    const renderLiElement = () => {
        const liElement = [];

        for (let i = 1; i <= props.countPages; i++) {
        liElement.push(
            <li className= {props.activeNumber == i?"page-item active":"page-item"}
                key={i}
                >
            <a className="page-link"
               onClick={() => props.handlePageChange(i)}
                >
            {i}
            </a></li>);
        }
    return liElement
    }
    return <>
        {props.countPages > 1 && <nav>
        <ul className="pagination pagination-sm">
            <li className= {props.activeNumber >1?"page-item": "page-item disabled"}>
                <a className="page-link"
                   onClick={() => props.handlePageChange(props.activeNumber -1)}
                >
                    «
                </a></li>
            {renderLiElement()}
            <li className={props.activeNumber < props.countPages?"page-item": "page-item disabled"}>
                <a className="page-link"
                   onClick={() => props.handlePageChange(props.activeNumber +1)}
                >
                    »
                </a></li>
        </ul>
                </nav>}
        </>
}
