/* WOULD LIKE TO USE THIS CUSTOM AGENDA COMPONENT INSTEAD OF BUILT IN,
  BUT THE TYPE IS MISMATCHED FROM THE CALENDAR EXPECTATION
*/

// import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import addClass from 'dom-helpers/addClass';
import removeClass from 'dom-helpers/removeClass';
import getWidth from 'dom-helpers/width';
import scrollbarSize from 'dom-helpers/scrollbarSize';

// import { navigate } from './utils/constants';
import {
  Event as EventType,
  Navigate as navigate,
  Messages,
  DateLocalizerSpec,
  CalendarProps,
  Culture,
  FormatInput,
  // ViewStatic,
} from 'react-big-calendar';
// import { inRange } from './utils/eventLevels';
// import { inRange } from 'react-big-calendar';
// import { isSelected } from './utils/selection';
import isEqual from 'lodash/isEqual';
// import { /* eq, */ inRange } from 'date-arithmetic/index';

// interface View  {
//   static title(date: Date, { formats: DateFormat[], culture: string?, ...props }): string
//   static navigate(date: Date, action: 'PREV' | 'NEXT' | 'DATE'): Date
// }

function inRange(e: any, start: Date, end: Date, accessors: any, localizer: any) {
  const event = {
    start: accessors.start(e),
    end: accessors.end(e),
  };
  const range = {
    start,
    end,
  };
  return localizer.inEventRange({
    event,
    range,
  });
}

function isSelected(event: EventType, selected: EventType): boolean {
  if (!event || selected == null) return false;
  return isEqual(event, selected);
  // return isEqual$1(event, selected);
}

// type ExtendedFormatInput extends

interface Localizer {
  // startOf: (day: Date, lib: string) => {};
  startOf: DateLocalizerSpec['startOf'];
  // endOf: (day: Date, lib: string) => {};
  endOf: DateLocalizerSpec['endOf'];
  // format: (day: Date, lib: string) => {};
  format: (
    value: FormatInput | { start: Date; end: Date },
    format: string,
    culture?: Culture,
  ) => string;
  // format: DateLocalizerSpec['format'];
  messages: Messages;
  // eq: (date: Date, date2: Date, unit?: Unit) => boolean;
  eq: DateLocalizerSpec['eq'];
  isSameDate: DateLocalizerSpec['isSameDate'];
  gt: DateLocalizerSpec['gt'];
  lt: DateLocalizerSpec['lt'];
  add: DateLocalizerSpec['add'];
  range: DateLocalizerSpec['range'];
}

function CustomAgenda({
  accessors,
  components,
  date,
  events,
  getters,
  length,
  localizer,
  onDoubleClickEvent,
  onSelectEvent,
  selected,
}: {
  accessors: {
    title: (event: EventType) => {};
    end: (event: EventType) => Date | undefined;
    start: (event: EventType) => Date | undefined;
    allDay: (event: EventType) => boolean;
  };
  // components: { event: EventType; date: Date; time: any };
  components: { event: any; date: any; time: any };
  date: Date;
  events: EventType[];
  getters: {
    eventProp: (event: EventType, start: object, end: object, isSelected: boolean) => {};
  };
  // eslint-disable-next-line react/require-default-props
  length?: number;
  localizer: Localizer;
  // localizer: {
  //   // startOf: (day: Date, lib: string) => {};
  //   startOf: DateLocalizerSpec['startOf'];
  //   // endOf: (day: Date, lib: string) => {};
  //   endOf: DateLocalizerSpec['endOf'];
  //   // format: (day: Date, lib: string) => {};
  //   // format: (value: FormatInput, format: string, culture?: Culture) => string;
  //   format: DateLocalizerSpec['format'];
  //   messages: Messages;
  //   // eq: (date: Date, date2: Date, unit?: Unit) => boolean;
  //   eq: DateLocalizerSpec['eq'];
  //   isSameDate: DateLocalizerSpec['isSameDate'];
  //   gt: DateLocalizerSpec['gt'];
  //   lt: DateLocalizerSpec['lt'];
  //   add: DateLocalizerSpec['add'];
  //   range: DateLocalizerSpec['range'];
  // };
  // onDoubleClickEvent: () => {};
  onDoubleClickEvent: CalendarProps['onDoubleClickEvent'];
  // onSelectEvent?: ((event: EventType, e: React.SyntheticEvent<HTMLElement>) => void) | undefined;
  // onSelectEvent: () => {};
  onSelectEvent: CalendarProps['onSelectEvent'];
  selected: object;
}) {
  const headerRef = useRef(null);
  const dateColRef = useRef(null);
  const timeColRef = useRef(null);
  const contentRef = useRef(null);
  const tbodyRef = useRef(null);

  // useEffect(() => {
  //   adjustHeader();
  // });

  const timeRangeLabel = (day: Date, event: EventType) => {
    let labelClass = '';
    const TimeComponent = components.time;
    let label = localizer.messages.allDay;

    const end = accessors.end(event);
    const start = accessors.start(event);

    if (!accessors.allDay(event)) {
      if (localizer.eq(start, end)) {
        label = localizer.format(start, 'agendaTimeFormat');
      } else if (localizer.isSameDate(start, end)) {
        // using imported format as type - first argument does not match format's typing
        // below line has not been changing from react-big-calendar source
        label = localizer.format({ start, end }, 'agendaTimeRangeFormat');
      } else if (localizer.isSameDate(day, start)) {
        label = localizer.format(start, 'agendaTimeFormat');
      } else if (localizer.isSameDate(day, end)) {
        label = localizer.format(end, 'agendaTimeFormat');
      }
    }

    if (localizer.gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
    if (localizer.lt(day, end, 'day')) labelClass += ' rbc-continues-after';

    return (
      <span className={labelClass.trim()}>
        {TimeComponent ? <TimeComponent event={event} day={day} label={label} /> : label}
      </span>
    );
  };

  const renderDay = (day: Date, eventsParam: EventType[], dayKey: number) => {
    const { event: Event, date: AgendaDate } = components;

    const eventsRender = eventsParam.filter((e) =>
      inRange(e, localizer.startOf(day, 'day'), localizer.endOf(day, 'day'), accessors, localizer));

    return eventsRender.map((event, idx) => {
      const title = accessors.title(event);
      const end = accessors.end(event);
      const start = accessors.start(event);

      type UserProps = {
        className?: string;
        style?: React.CSSProperties;
      };

      const userProps: UserProps = getters.eventProp(
        event,
        start,
        end,
        isSelected(event, selected),
      );

      const dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat');
      const first =
        idx === 0 ? (
          <td rowSpan={events.length} className="rbc-agenda-date-cell">
            {`${AgendaDate ? <AgendaDate day={day} label={dateLabel} /> : dateLabel}`}
          </td>
        ) : (
          false
        );

      return (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={`${dayKey}_${idx}`} className={userProps.className} style={userProps.style}>
          {first}
          <td className="rbc-agenda-time-cell">{timeRangeLabel(day, event)}</td>
          <td
            className="rbc-agenda-event-cell"
            onClick={(e) => onSelectEvent && onSelectEvent(event, e)}
            onDoubleClick={(e) => onDoubleClickEvent && onDoubleClickEvent(event, e)}
          >
            {`${Event ? <Event event={event} title={title} /> : title}`}
          </td>
        </tr>
      );
    }, []);
  };

  const adjustHeader = () => {
    if (!tbodyRef.current) return;

    const header = headerRef.current;
    const firstRow = tbodyRef.current.firstChild;

    if (!firstRow) return;

    const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;

    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
    let _widths: any[] = [];
    const widths = _widths;

    _widths = [getWidth(firstRow.children[0]), getWidth(firstRow.children[1])];

    if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
      dateColRef.current.style.width = `${_widths[0]}px`;
      timeColRef.current.style.width = `${_widths[1]}px`;
    }

    if (isOverflowing) {
      addClass(header, 'rbc-header-overflowing');
      header.style.marginRight = `${scrollbarSize()}px`;
    } else {
      removeClass(header, 'rbc-header-overflowing');
    }
  };

  useEffect(() => {
    adjustHeader();
  });

  const { messages } = localizer;
  const end = localizer.add(date, length, 'day');

  const range = localizer.range(date, end, 'day');

  const [eventsState, setEvents] = useState(events);

  setEvents(
    events
      .filter((event) =>
        inRange(
          event,
          localizer.startOf(date, 'day'),
          localizer.endOf(end, 'day'),
          accessors,
          localizer,
        ))
      .sort((a, b) => +accessors.start(a) - +accessors.start(b)),
  );
  // events = events.filter((event) =>
  //   inRange(
  //     event,
  //     localizer.startOf(date, 'day'),
  //     localizer.endOf(end, 'day'),
  //     accessors,
  //     localizer,
  //   ));

  // events.sort((a, b) => +accessors.start(a) - +accessors.start(b));

  return (
    <div className="rbc-agenda-view">
      {eventsState.length !== 0 ? (
        // {events.length !== 0 ? (
        <>
          <table ref={headerRef} className="rbc-agenda-table">
            <thead>
              <tr>
                <th className="rbc-header" ref={dateColRef}>
                  {messages.date}
                </th>
                <th className="rbc-header" ref={timeColRef}>
                  {messages.time}
                </th>
                <th className="rbc-header">{messages.event}</th>
              </tr>
            </thead>
          </table>
          <div className="rbc-agenda-content" ref={contentRef}>
            <table className="rbc-agenda-table">
              <tbody ref={tbodyRef}>
                {range.map((day, idx) => renderDay(day, eventsState, idx))}
              </tbody>
              {/* <tbody ref={tbodyRef}>{
              range.map((day, idx) => renderDay(day, events, idx))
              }</tbody> */}
            </table>
          </div>
        </>
      ) : (
        <span className="rbc-agenda-empty">{messages.noEventsInRange}</span>
      )}
    </div>
  );
}

// CustomAgenda.propTypes = {
//   accessors: PropTypes.object.isRequired,
//   components: PropTypes.object.isRequired,
//   date: PropTypes.instanceOf(Date),
//   events: PropTypes.array,
//   getters: PropTypes.object.isRequired,
//   length: PropTypes.number.isRequired,
//   localizer: PropTypes.object.isRequired,
//   onSelectEvent: PropTypes.func,
//   onDoubleClickEvent: PropTypes.func,
//   selected: PropTypes.object,
// };

// CustomAgenda.defaultProps = {
//   length: 30,
// };
// let length = 30;

CustomAgenda.range = (
  start: Date,
  {
    length = 30,
    localizer,
  }: { localizer: Localizer; length: number },
) => {
  const end = localizer.add(start, length, 'day');
  return { start, end };
};

CustomAgenda.navigate = (
  date: Date,
  action: string,
  {
    length = 30,
    localizer,
  }: { localizer: Localizer; length: number },
) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -length, 'day');

    case navigate.NEXT:
      return localizer.add(date, length, 'day');

    default:
      return date;
  }
};

CustomAgenda.title = (
  start: Date,
  {
    length = 30,
    localizer,
  }: { localizer: Localizer; length: number },
) => {
  const end = localizer.add(start, length, 'day');
  return localizer.format({ start, end }, 'agendaHeaderFormat');
};

export default CustomAgenda;
