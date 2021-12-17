import { eachDayOfInterval, format, parseISO } from "date-fns";
import { MarkedDatesType, DayProps } from ".";
import theme from "../../styles/theme";

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDatesType = {};

  eachDayOfInterval({
    start: parseISO(start.dateString),
    end: parseISO(end.dateString)
  }).forEach(( item ) => {
    const date = format(item, 'yyyy-MM-dd');
    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date
        ? theme.colors.main : theme.colors.main_light,
        textColor: start.dateString === date || end.dateString === date
        ? theme.colors.main_light : theme.colors.main
      }
    }
  });
  return interval;
}