import React, { useMemo, cloneElement, Children, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, dayjsLocalizer, Views, Event } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';
import { useColorMode } from '@chakra-ui/react';

// import CustomAgenda from './CustomAgenda';

const localizer = dayjsLocalizer(dayjs);

const coloredDateCellWrapper = ({ children }: any) =>
  cloneElement(Children.only(children), {
    style: {
      background: 'lightblue',
    },
  });

// type for events out the db
type EventWId = {
  id: Number;
  OgId: string;
  allDay?: boolean | undefined;
  title?: React.ReactNode | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  resource?: any;
};

// types for events on calendar
interface CalEvent extends Event {
  id: Number;
  ogId: string;
}

function EventsCalendar({
  events,
  setEventFocus,
}: {
  events: EventWId[];
  setEventFocus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [doubleClickedEventId, setDoubleClickedEventId] = useState(null as Number);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const calButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('rbc-btn-group');
    if (colorMode === 'dark') {
      for (let i = 0; i < calButtons.length; i += 1) {
        calButtons[i].classList.add('dark');
      }
    } else if (colorMode === 'light') {
      for (let i = 0; i < calButtons.length; i += 1) {
        calButtons[i].classList.remove('dark');
      }
    }
  }, [colorMode]);

  const viewsKeys = Object.entries(Views);

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: coloredDateCellWrapper,
      },
      defaultDate: new Date(),
      views: viewsKeys.map((entry) => entry[1]),
    }),
    [viewsKeys],
  );

  function onDoubleClick(...args: [CalEvent, React.SyntheticEvent<HTMLElement, globalThis.Event>]) {
    const [event] = args;
    const { id } = event;

    setDoubleClickedEventId(id);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (doubleClickedEventId) {
      navigate(`/events/${doubleClickedEventId}`);
    }
  }, [doubleClickedEventId, navigate]);

  function onSelect(...args: [CalEvent, React.SyntheticEvent<HTMLElement, globalThis.Event>]) {
    const [event] = args;
    // this is the same as key for event's card
    const { ogId } = event;
    setEventFocus(ogId);
  }

  return (
    <div className="height600">
      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          title: event.title,
          // start and end must be date objects
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          id: event.id,
          ogId: event.OgId,
        }))}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        showMultiDayTimes
        step={60}
        views={['month', 'agenda']}
        // views={{
        //   month: true,
        //   week: false,
        //   agenda: CustomAgenda,
        // }}
        drilldownView="agenda"
        components={components}
        defaultDate={defaultDate}
      />
    </div>
  );
}

export default EventsCalendar;
