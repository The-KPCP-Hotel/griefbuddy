import React, { useMemo, cloneElement, Children, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, dayjsLocalizer, Views, Event } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
  eventRef,
  setEventFocus,
}: {
  events: EventWId[];
  eventRef: React.MutableRefObject<any>;
  setEventFocus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [doubleClickedEventId, setDoubleClickedEventId] = useState(null as Number);

  const viewsKeys = Object.entries(Views);

  const { components, defaultDate, views } = useMemo(
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
    console.log(eventRef);

    const [event] = args;
    // this is the same as key for event's card
    const { ogId } = event;
    console.log(ogId);
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
        views={views}
        components={components}
        defaultDate={defaultDate}
      />
    </div>
  );
}

export default EventsCalendar;
