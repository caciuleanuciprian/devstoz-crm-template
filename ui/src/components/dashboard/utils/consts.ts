export const numberToMonth = (num: number, dictionary: any) => {
  const months = [
    dictionary.Jan,
    dictionary.Feb,
    dictionary.Mar,
    dictionary.Apr,
    dictionary.May,
    dictionary.Jun,
    dictionary.Jul,
    dictionary.Aug,
    dictionary.Sep,
    dictionary.Oct,
    dictionary.Nov,
    dictionary.Dec,
  ];
  return months[num];
};
