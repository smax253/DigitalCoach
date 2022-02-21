import { PropsWithoutRef } from "react";
import {Calendar} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

interface Props
extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> {
events: {start:string, end: string}[];
}


export default function PracticeCalendar(props: PropsWithoutRef<Props>) {
    const {events} = props;
    const parsedEvents = events.map(item => ({...item, display:"background"}))
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={parsedEvents}
            height={"auto"}
        />
    );
}