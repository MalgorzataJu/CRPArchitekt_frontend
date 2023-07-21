import {Col, Container, Row, Form, Table} from "react-bootstrap";
interface Props{
    data: {
        month: number,
        year: number,
    };
}
export const Calendar = (props:Props)=> {

    const printDayName = ()=>{
        const week = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
       return week.map((e, index)=> {
           return <th key={index}>{e}</th>
       })
    }
    const printWeek = (number: number, firstMonthDay:number, daysInMonth:number)=> (
        Array.from({ length:8 })
            .map((_, index) => {
                const dayNumber = (number -1) * 7 - firstMonthDay + index +1;

                if (index == 0) return <td>{number}</td>
                if ((number == 1) && (index < firstMonthDay ) || (dayNumber > daysInMonth)) return <td></td>
                return <td key={index*number}> {dayNumber}</td>
            }))

    const printMonth = () => {

        const daysInMonth = new Date(props.data.month, props.data.month+1,0).getDate();
        const tempDate = new Date(props.data.year, props.data.month, 1);
        let firstMonthDay = tempDate.getDay();
        console.log(tempDate)
        if (firstMonthDay === 0) {
            firstMonthDay = 7;
        }
        const allDay = daysInMonth + firstMonthDay -1;
        return Array.from({ length:allDay / 7 + 1 })
            .map((_, index) => {
                return <tr>{printWeek(index+1, firstMonthDay, daysInMonth)}</tr>
        })

}
    return (<>
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                {
                    printDayName()
                }
            </tr>
            </thead>
            <tbody>
            {
                printMonth()
            }
            </tbody>
        </Table>
            </>
    );
}
