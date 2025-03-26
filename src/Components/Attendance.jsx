import React from "react";
import Statistics from "../Components/attendance/Statistics";
import DailyRecords from "./attendance/DailyRecords";
import AttendanceReport from "./attendance/AttendanceReport";
import AttendanceList from "./attendance/AttendanceList";
import Timesheet from "./attendance/TimeSheet";
import TodayActivity from "./attendance/TodayActivity";
function Attendance() {
  return (
    <div>
      <div className="flex gap-5 mb-5">
        <Timesheet />
        <DailyRecords />
        <Statistics />
      </div>
      <AttendanceList />
      {/* <TodayActivity /> */}
      {/* <AttendanceReport /> */}
    </div>
  );
}

export default Attendance;
