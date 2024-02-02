import {Col, Container, Row, Form, Table} from "react-bootstrap";
import {ListHourCountRes} from "types";
interface Props{
    date: {
        month: number,
        year: number,
    };
    countHoursForDay:ListHourCountRes[];
}
export const Calendar = (props:Props)=> {

    const printDayName = () =>{
        const week = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
       return week.map((e, index)=> {
           return <th key={index}>{e}</th>
       })
    }

    const printWeek = (number: number, firstMonthDay:number, daysInMonth:number)=> (
        Array.from({ length:8 }).map((_, index) => {
                const dayNumber = (number -1) * 7 - firstMonthDay + index +1;

                if (index == 0) return <td>{number}</td>
                if ((number == 1) && (index < firstMonthDay ) || (dayNumber > daysInMonth)) return <td></td>

                const dayCountHours = props.countHoursForDay.find(day => (day.date.split('.')[0] == dayNumber.toString()));
                return <td key={index*number}>
                    <table>
                        <th>
                            {dayNumber}
                        </th>
                        <tr>
                            <td >
                                {typeof dayCountHours == 'object'?dayCountHours.quantity:' '}
                            </td>
                        </tr>
                    </table>

                </td>
            }))

    const printMonth = () => {

        const daysInMonth = new Date(props.date.month, props.date.month+1,0).getDate();
        const tempDate = new Date(props.date.year, props.date.month, 1);
        let firstMonthDay = tempDate.getDay();

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
