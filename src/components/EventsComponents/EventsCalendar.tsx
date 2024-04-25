import React, { useMemo, cloneElement, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Event, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const coloredDateCellWrapper = ({ children }: any) => (
  cloneElement(Children.only(children), {
    style: {
      background: 'lightblue',
    },
  }));

function EventsCalendar(props: { events: any[] }) {
  const { events } = props;

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

  function onDoubleClick(...args: [Event, React.SyntheticEvent<HTMLElement, globalThis.Event>]) {
    const [event] = args;
    console.log(event);
    // const navigate = useNavigate();

    // navigate(`/events/${id}`);
  }

  return (
    <div className="height600">
      {/* <Fragment> */}
      <Calendar
        localizer={localizer}
        events={events.map((event) => {
          console.log(typeof event.startDate);
          return {
            title: event.title,
            // start and end must be date objects
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            id: event.id,
          };
        })}
        // eslint-disable-next-line react/jsx-no-bind
        onDoubleClickEvent={onDoubleClick}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        showMultiDayTimes
        step={60}
        views={views}
        components={components}
        defaultDate={defaultDate}
      />
      {/* </Fragment> */}
    </div>
  );
}

export default EventsCalendar;
