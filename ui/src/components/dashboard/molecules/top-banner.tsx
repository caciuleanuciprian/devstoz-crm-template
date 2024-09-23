import { MonthlyCards } from "./monthly-cards";
import { YearlyReport } from "./yearly-report";
import { DatePicker } from "@/components/common/date-picker";
import { useState, useContext, useMemo } from "react";
import { LanguageContext } from "@/i18n/language-context";

export const TopBanner = () => {
  const { dictionary } = useContext(LanguageContext);
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const currMonth = useMemo(
    () => (date ? date?.getMonth() + 1 : new Date(Date.now()).getMonth() + 1),
    [date]
  );
  const currYear = useMemo(
    () => (date ? date?.getFullYear() : new Date(Date.now()).getFullYear()),
    [date]
  );

  return (
    <>
      <div className="flex w-full justify-between items-center flex-wrap">
        <p className="font-semibold text-md sm:text-lg">
          {dictionary.MonthlyStats}
        </p>
        <DatePicker
          date={date as Date}
          setDate={
            setDate as React.Dispatch<React.SetStateAction<Date | undefined>>
          }
        />
      </div>
      <div className="flex flex-col w-full justify-between rounded-md bg-background">
        <MonthlyCards currMonth={currMonth} currYear={currYear} />
      </div>
      <p className="font-semibold text-md sm:text-lg">
        {dictionary.YearlyStats}
      </p>
      <div className="flex flex-col gap-4 w-full justify-between rounded-md bg-background">
        <YearlyReport currYear={currYear} />
      </div>
    </>
  );
};
