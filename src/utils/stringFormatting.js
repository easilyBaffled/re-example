import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const time = {
    hhmmss: (s) => dayjs(s).format("HH:mm:ss a"),
    hhmmssSSS: (s) => dayjs(s).format("HH:mm:ss:SSS"),
    stopwatch: (s) => dayjs(s).format("HH:mm:ss:SSS"),
    duration: (n) => dayjs.duration(n).format("HH:mm:ss:SSS")
};
